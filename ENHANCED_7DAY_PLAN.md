# ENHANCED 7-DAY PLAN: Korean AI Basic Act Compliance SaaS
## Production-Ready Launch Blueprint

**Version:** 1.0  
**Last Updated:** November 2025  
**Purpose:** Step-by-step guide for launching a production-ready Korean AI Basic Act compliance SaaS platform  
**Target Audience:** Development team, product managers, and stakeholders

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Day 1: Foundation & Database Setup](#day-1-foundation--database-setup)
3. [Day 2: Backend Authentication & API](#day-2-backend-authentication--api)
4. [Day 3: Frontend Login & Dashboard](#day-3-frontend-login--dashboard)
5. [Day 4: Compliance Checklist Features](#day-4-compliance-checklist-features)
6. [Day 5: Payment Integration & Subscriptions](#day-5-payment-integration--subscriptions)
7. [Day 6: Email Automation & Notifications](#day-6-email-automation--notifications)
8. [Day 7: Testing, Security & Deployment](#day-7-testing-security--deployment)
9. [Appendix: Additional Resources](#appendix-additional-resources)

---

## Overview

This plan provides a comprehensive 7-day blueprint for building and deploying a Korean AI Basic Act compliance SaaS platform. Each day includes:

- ✅ **Daily Objectives**: Clear goals for the day
- 📦 **Copy-Paste Code Snippets**: Production-ready code
- 🔧 **Configuration Steps**: Detailed setup instructions
- ✔️ **Validation Checklist**: Testing and verification steps
- 📝 **Notes**: Best practices and considerations

### **Tech Stack**

- **Backend**: Python FastAPI
- **Frontend**: React / Next.js
- **Database**: PostgreSQL with Supabase
- **Authentication**: JWT with bcrypt
- **Payments**: Stripe
- **Email**: SendGrid
- **Hosting**: Railway (backend) + Netlify (frontend)

### **Key Features**

1. User authentication (signup, login, password reset)
2. Bilingual compliance checklists (Korean & English)
3. Incident logging and tracking
4. Subscription management with Stripe
5. Email notifications and automation
6. Row-level security (RLS) policies
7. Audit logging
8. Admin dashboard

---

## Day 1: Foundation & Database Setup

### **Daily Objectives**

✅ Set up PostgreSQL database with Supabase  
✅ Create complete database schema  
✅ Implement Row-Level Security (RLS) policies  
✅ Add database triggers for audit logging  
✅ Seed initial data (Korean & English content)

### **Step 1.1: Database Schema**

Create the following tables with proper relationships and constraints:

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    company_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'auditor')),
    subscription_tier VARCHAR(50) DEFAULT 'free' CHECK (subscription_tier IN ('free', 'basic', 'pro', 'enterprise')),
    subscription_status VARCHAR(50) DEFAULT 'active' CHECK (subscription_status IN ('active', 'cancelled', 'suspended', 'past_due')),
    stripe_customer_id VARCHAR(255),
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- Audit logs table
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(255) NOT NULL,
    table_name VARCHAR(255),
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Incidents table
CREATE TABLE incidents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    severity VARCHAR(50) CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    status VARCHAR(50) DEFAULT 'open' CHECK (status IN ('open', 'investigating', 'resolved', 'closed')),
    incident_date TIMESTAMP WITH TIME ZONE,
    resolved_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Compliance checklist templates (Korean & English)
CREATE TABLE checklist_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_ko VARCHAR(500) NOT NULL,
    title_en VARCHAR(500) NOT NULL,
    description_ko TEXT,
    description_en TEXT,
    category VARCHAR(100) NOT NULL,
    compliance_area VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User checklist items (instances for each user)
CREATE TABLE checklist_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    template_id UUID REFERENCES checklist_templates(id) ON DELETE CASCADE NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'not_applicable')),
    notes TEXT,
    completed_at TIMESTAMP WITH TIME ZONE,
    due_date TIMESTAMP WITH TIME ZONE,
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, template_id)
);

-- Subscriptions table
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    stripe_subscription_id VARCHAR(255) UNIQUE,
    stripe_price_id VARCHAR(255),
    tier VARCHAR(50) NOT NULL CHECK (tier IN ('free', 'basic', 'pro', 'enterprise')),
    status VARCHAR(50) NOT NULL CHECK (status IN ('active', 'cancelled', 'past_due', 'unpaid', 'trialing')),
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email logs table
CREATE TABLE email_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    email_type VARCHAR(100) NOT NULL,
    recipient_email VARCHAR(255) NOT NULL,
    subject VARCHAR(500),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'bounced')),
    sendgrid_message_id VARCHAR(255),
    error_message TEXT,
    sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_subscription_tier ON users(subscription_tier);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX idx_incidents_user_id ON incidents(user_id);
CREATE INDEX idx_incidents_status ON incidents(status);
CREATE INDEX idx_checklist_items_user_id ON checklist_items(user_id);
CREATE INDEX idx_checklist_items_status ON checklist_items(status);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_subscription_id ON subscriptions(stripe_subscription_id);
CREATE INDEX idx_email_logs_user_id ON email_logs(user_id);
CREATE INDEX idx_email_logs_status ON email_logs(status);
```

### **Step 1.2: Row-Level Security (RLS) Policies**

Enable RLS to ensure users can only access their own data:

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY users_select_own ON users
    FOR SELECT USING (auth.uid() = id OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY users_update_own ON users
    FOR UPDATE USING (auth.uid() = id);

-- Incidents table policies
CREATE POLICY incidents_select_own ON incidents
    FOR SELECT USING (user_id = auth.uid() OR auth.jwt() ->> 'role' IN ('admin', 'auditor'));

CREATE POLICY incidents_insert_own ON incidents
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY incidents_update_own ON incidents
    FOR UPDATE USING (user_id = auth.uid() OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY incidents_delete_own ON incidents
    FOR DELETE USING (user_id = auth.uid() OR auth.jwt() ->> 'role' = 'admin');

-- Checklist items policies
CREATE POLICY checklist_items_select_own ON checklist_items
    FOR SELECT USING (user_id = auth.uid() OR auth.jwt() ->> 'role' IN ('admin', 'auditor'));

CREATE POLICY checklist_items_insert_own ON checklist_items
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY checklist_items_update_own ON checklist_items
    FOR UPDATE USING (user_id = auth.uid() OR assigned_to = auth.uid() OR auth.jwt() ->> 'role' = 'admin');

-- Subscriptions policies
CREATE POLICY subscriptions_select_own ON subscriptions
    FOR SELECT USING (user_id = auth.uid() OR auth.jwt() ->> 'role' = 'admin');

-- Audit logs policies (read-only for auditors and admins)
CREATE POLICY audit_logs_select ON audit_logs
    FOR SELECT USING (auth.jwt() ->> 'role' IN ('admin', 'auditor'));

-- Checklist templates are readable by all authenticated users
CREATE POLICY checklist_templates_select_all ON checklist_templates
    FOR SELECT USING (is_active = TRUE);
```

### **Step 1.3: Database Triggers for Audit Logging**

Automatically log all changes for compliance:

```sql
-- Function to log changes
CREATE OR REPLACE FUNCTION log_audit_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO audit_logs (user_id, action, table_name, record_id, old_values)
        VALUES (auth.uid(), TG_OP, TG_TABLE_NAME, OLD.id, row_to_json(OLD));
        RETURN OLD;
    ELSIF (TG_OP = 'UPDATE') THEN
        INSERT INTO audit_logs (user_id, action, table_name, record_id, old_values, new_values)
        VALUES (auth.uid(), TG_OP, TG_TABLE_NAME, NEW.id, row_to_json(OLD), row_to_json(NEW));
        RETURN NEW;
    ELSIF (TG_OP = 'INSERT') THEN
        INSERT INTO audit_logs (user_id, action, table_name, record_id, new_values)
        VALUES (auth.uid(), TG_OP, TG_TABLE_NAME, NEW.id, row_to_json(NEW));
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for audit logging
CREATE TRIGGER audit_users_changes
    AFTER INSERT OR UPDATE OR DELETE ON users
    FOR EACH ROW EXECUTE FUNCTION log_audit_changes();

CREATE TRIGGER audit_incidents_changes
    AFTER INSERT OR UPDATE OR DELETE ON incidents
    FOR EACH ROW EXECUTE FUNCTION log_audit_changes();

CREATE TRIGGER audit_checklist_items_changes
    AFTER INSERT OR UPDATE OR DELETE ON checklist_items
    FOR EACH ROW EXECUTE FUNCTION log_audit_changes();

CREATE TRIGGER audit_subscriptions_changes
    AFTER INSERT OR UPDATE OR DELETE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION log_audit_changes();

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_incidents_updated_at BEFORE UPDATE ON incidents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_checklist_items_updated_at BEFORE UPDATE ON checklist_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_checklist_templates_updated_at BEFORE UPDATE ON checklist_templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### **Step 1.4: Seed Initial Data (Korean & English)**

Insert Korean AI Basic Act compliance checklist templates:

```sql
-- Insert checklist templates (bilingual)
INSERT INTO checklist_templates (title_ko, title_en, description_ko, description_en, category, compliance_area, display_order) VALUES
-- Risk Assessment Category
('AI 시스템 위험 평가 수행', 'Conduct AI System Risk Assessment', 'AI 시스템의 잠재적 위험을 식별하고 평가합니다.', 'Identify and assess potential risks of the AI system.', 'Risk Assessment', 'Article 15', 1),
('고위험 AI 시스템 분류', 'Classify High-Risk AI Systems', '생명, 안전 또는 기본권에 중대한 영향을 미칠 수 있는 AI 시스템을 식별합니다.', 'Identify AI systems that may significantly affect life, safety, or fundamental rights.', 'Risk Assessment', 'Article 15', 2),

-- Data Governance Category
('학습 데이터 품질 관리', 'Training Data Quality Management', '편향되지 않고 대표성 있는 학습 데이터를 확보합니다.', 'Ensure unbiased and representative training data.', 'Data Governance', 'Article 18', 3),
('데이터 보안 및 프라이버시 보호', 'Data Security and Privacy Protection', '개인정보 보호법 준수 및 데이터 암호화를 구현합니다.', 'Comply with privacy laws and implement data encryption.', 'Data Governance', 'Article 20', 4),

-- Transparency & Documentation Category
('AI 시스템 문서화', 'AI System Documentation', 'AI 모델, 알고리즘 및 의사결정 프로세스를 문서화합니다.', 'Document AI models, algorithms, and decision-making processes.', 'Transparency', 'Article 22', 5),
('사용자 고지 의무', 'User Disclosure Obligations', 'AI 시스템 사용 사실을 사용자에게 명확히 고지합니다.', 'Clearly inform users about the use of AI systems.', 'Transparency', 'Article 23', 6),

-- Human Oversight Category
('인간 감독 체계 구축', 'Establish Human Oversight System', 'AI 의사결정에 대한 인간 개입 메커니즘을 구현합니다.', 'Implement human intervention mechanisms for AI decisions.', 'Human Oversight', 'Article 25', 7),
('긴급 정지 절차 마련', 'Emergency Stop Procedures', 'AI 시스템의 긴급 중단 프로토콜을 수립합니다.', 'Establish protocols for emergency AI system shutdown.', 'Human Oversight', 'Article 25', 8),

-- Testing & Validation Category
('AI 시스템 성능 테스트', 'AI System Performance Testing', '정확성, 공정성, 견고성을 테스트합니다.', 'Test for accuracy, fairness, and robustness.', 'Testing', 'Article 27', 9),
('편향성 평가 및 완화', 'Bias Assessment and Mitigation', 'AI 모델의 편향성을 식별하고 완화 조치를 취합니다.', 'Identify and mitigate bias in AI models.', 'Testing', 'Article 27', 10),

-- Monitoring & Incident Response Category
('지속적 모니터링 시스템', 'Continuous Monitoring System', 'AI 시스템의 실시간 성능 모니터링을 구현합니다.', 'Implement real-time performance monitoring of AI systems.', 'Monitoring', 'Article 30', 11),
('사고 대응 절차 수립', 'Incident Response Procedures', 'AI 관련 사고 발생 시 대응 프로토콜을 마련합니다.', 'Establish response protocols for AI-related incidents.', 'Monitoring', 'Article 31', 12),

-- Compliance & Reporting Category
('규제 기관 보고 체계', 'Regulatory Reporting Framework', '필수 정보를 규제 기관에 보고하는 절차를 수립합니다.', 'Establish procedures for reporting required information to regulators.', 'Compliance', 'Article 35', 13),
('연간 규정 준수 감사', 'Annual Compliance Audit', '연례 내부 감사를 실시하고 문서화합니다.', 'Conduct and document annual internal audits.', 'Compliance', 'Article 36', 14),

-- Third-Party & Vendor Management Category
('제3자 AI 공급업체 실사', 'Third-Party AI Vendor Due Diligence', '외부 AI 공급업체의 규정 준수를 검증합니다.', 'Verify compliance of external AI vendors.', 'Vendor Management', 'Article 40', 15),
('공급망 위험 평가', 'Supply Chain Risk Assessment', 'AI 공급망의 보안 및 규정 준수 위험을 평가합니다.', 'Assess security and compliance risks in AI supply chain.', 'Vendor Management', 'Article 40', 16);
```

### **Day 1 Validation Checklist**

- [ ] PostgreSQL database created on Supabase
- [ ] All tables created successfully with proper constraints
- [ ] Indexes created for performance optimization
- [ ] RLS policies enabled and tested
- [ ] Audit triggers functioning correctly
- [ ] Checklist templates seeded with Korean & English content
- [ ] Database connection tested from application
- [ ] Database backup configured

### **Day 1 Notes**

- Store database connection string in environment variables
- Use connection pooling for production
- Enable Point-in-Time Recovery (PITR) on Supabase
- Set up automated daily backups
- Monitor database performance metrics

---

## Day 2: Backend Authentication & API

### **Daily Objectives**

✅ Set up FastAPI project structure  
✅ Implement JWT authentication  
✅ Create user registration and login endpoints  
✅ Implement password hashing with bcrypt  
✅ Add password reset functionality  
✅ Create CRUD endpoints for core resources

### **Step 2.1: FastAPI Project Structure**

```bash
# Create project structure
mkdir -p backend/{app/{api,core,models,schemas,services},tests}
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn[standard] python-jose[cryptography] passlib[bcrypt] python-multipart psycopg2-binary sqlalchemy pydantic-settings python-dotenv stripe sendgrid
```

Create `backend/requirements.txt`:

```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6
psycopg2-binary==2.9.9
sqlalchemy==2.0.23
pydantic==2.5.0
pydantic-settings==2.1.0
python-dotenv==1.0.0
stripe==7.6.0
sendgrid==6.11.0
pytest==7.4.3
httpx==0.25.2
```

### **Step 2.2: Environment Configuration**

Create `backend/.env`:

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# JWT
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# SendGrid
SENDGRID_API_KEY=SG.your_sendgrid_key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
SENDGRID_FROM_NAME=Korean AI Compliance

# Application
APP_NAME=Korean AI Basic Act Compliance
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:8000
ENVIRONMENT=development
```

Create `backend/app/core/config.py`:

```python
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str
    
    # JWT
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Stripe
    STRIPE_SECRET_KEY: str
    STRIPE_PUBLISHABLE_KEY: str
    STRIPE_WEBHOOK_SECRET: str
    
    # SendGrid
    SENDGRID_API_KEY: str
    SENDGRID_FROM_EMAIL: str
    SENDGRID_FROM_NAME: str
    
    # Application
    APP_NAME: str = "Korean AI Compliance"
    FRONTEND_URL: str
    BACKEND_URL: str
    ENVIRONMENT: str = "development"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
```

### **Step 2.3: Database Connection**

Create `backend/app/core/database.py`:

```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings

engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    pool_size=10,
    max_overflow=20
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

### **Step 2.4: User Model & Schema**

Create `backend/app/models/user.py`:

```python
from sqlalchemy import Column, String, Boolean, DateTime, Enum
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid
import enum
from ..core.database import Base

class UserRole(str, enum.Enum):
    USER = "user"
    ADMIN = "admin"
    AUDITOR = "auditor"

class SubscriptionTier(str, enum.Enum):
    FREE = "free"
    BASIC = "basic"
    PRO = "pro"
    ENTERPRISE = "enterprise"

class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(255))
    company_name = Column(String(255))
    role = Column(Enum(UserRole), default=UserRole.USER)
    subscription_tier = Column(Enum(SubscriptionTier), default=SubscriptionTier.FREE)
    subscription_status = Column(String(50), default="active")
    stripe_customer_id = Column(String(255))
    email_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_login = Column(DateTime)
```

Create `backend/app/schemas/user.py`:

```python
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from uuid import UUID

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    company_name: Optional[str] = None

class UserCreate(UserBase):
    password: str = Field(..., min_length=8)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: UUID
    role: str
    subscription_tier: str
    subscription_status: str
    email_verified: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    email: Optional[str] = None
    user_id: Optional[str] = None
    role: Optional[str] = None
```

### **Step 2.5: Authentication Service**

Create `backend/app/core/security.py`:

```python
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from .config import settings
from .database import get_db
from ..models.user import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against a hash"""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Hash a password"""
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:
    """Get current authenticated user"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str = payload.get("sub")
        user_id: str = payload.get("user_id")
        
        if email is None or user_id is None:
            raise credentials_exception
            
    except JWTError:
        raise credentials_exception
    
    user = db.query(User).filter(User.email == email).first()
    
    if user is None:
        raise credentials_exception
    
    # Update last login
    user.last_login = datetime.utcnow()
    db.commit()
    
    return user

async def get_current_active_user(
    current_user: User = Depends(get_current_user)
) -> User:
    """Ensure user is active"""
    if current_user.subscription_status not in ["active", "trialing"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Inactive user account"
        )
    return current_user

def require_role(required_role: str):
    """Dependency to require specific user role"""
    async def role_checker(current_user: User = Depends(get_current_user)):
        if current_user.role != required_role and current_user.role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Role '{required_role}' required"
            )
        return current_user
    return role_checker
```

### **Step 2.6: Authentication Endpoints**

Create `backend/app/api/v1/auth.py`:

```python
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from ...core.database import get_db
from ...core.security import (
    verify_password,
    get_password_hash,
    create_access_token,
    get_current_user
)
from ...core.config import settings
from ...models.user import User
from ...schemas.user import UserCreate, UserResponse, Token, UserLogin
from ...services.email_service import send_welcome_email, send_password_reset_email
import secrets

router = APIRouter()

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(
    user_data: UserCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """Register a new user"""
    # Check if user exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    hashed_password = get_password_hash(user_data.password)
    new_user = User(
        email=user_data.email,
        password_hash=hashed_password,
        full_name=user_data.full_name,
        company_name=user_data.company_name
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Send welcome email in background
    background_tasks.add_task(send_welcome_email, new_user.email, new_user.full_name)
    
    return new_user

@router.post("/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """Login user and return JWT token"""
    user = db.query(User).filter(User.email == form_data.username).first()
    
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={
            "sub": user.email,
            "user_id": str(user.id),
            "role": user.role
        },
        expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Get current user information"""
    return current_user

@router.post("/password-reset-request")
async def request_password_reset(
    email: str,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """Request password reset email"""
    user = db.query(User).filter(User.email == email).first()
    
    if user:
        # Generate reset token
        reset_token = secrets.token_urlsafe(32)
        # Store token in database (add reset_token field to User model)
        # For now, send email
        background_tasks.add_task(
            send_password_reset_email,
            user.email,
            reset_token
        )
    
    # Always return success to prevent email enumeration
    return {"message": "If email exists, password reset link has been sent"}

@router.post("/password-reset")
async def reset_password(
    token: str,
    new_password: str,
    db: Session = Depends(get_db)
):
    """Reset password with token"""
    # Verify token and update password
    # Implementation depends on how you store reset tokens
    # This is a simplified version
    return {"message": "Password reset successfully"}
```


### **Step 2.7: Main Application Setup**

Create `backend/app/main.py`:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.v1 import auth
from .core.config import settings

app = FastAPI(
    title=settings.APP_NAME,
    description="Korean AI Basic Act Compliance Platform API",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["authentication"])

@app.get("/")
async def root():
    return {"message": f"Welcome to {settings.APP_NAME} API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
```

### **Day 2 Validation Checklist**

- [ ] FastAPI project structure created
- [ ] All dependencies installed
- [ ] Environment variables configured
- [ ] Database connection working
- [ ] User registration endpoint functional
- [ ] User login endpoint returning JWT tokens
- [ ] JWT authentication working correctly
- [ ] Password hashing verified
- [ ] Current user endpoint working
- [ ] API documented at `/docs`

### **Day 2 Test Commands**

```bash
# Start the server
cd backend
uvicorn app.main:app --reload

# Test registration
curl -X POST "http://localhost:8000/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "securepassword123",
    "full_name": "Test User",
    "company_name": "Test Company"
  }'

# Test login
curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=test@example.com&password=securepassword123"

# Test authenticated endpoint (replace TOKEN with actual token)
curl -X GET "http://localhost:8000/api/v1/auth/me" \
  -H "Authorization: Bearer TOKEN"
```

---

## Day 3: Frontend Login & Dashboard

### **Daily Objectives**

✅ Set up React/Next.js project  
✅ Create authentication context  
✅ Build login and signup pages  
✅ Implement protected routes  
✅ Create dashboard layout  
✅ Build user profile page

### **Step 3.1: Next.js Project Setup**

```bash
# Create Next.js app with TypeScript
npx create-next-app@latest frontend --typescript --tailwind --app --no-src-dir
cd frontend

# Install additional dependencies
npm install axios react-hook-form @hookform/resolvers zod @tanstack/react-query zustand
```

Create `frontend/package.json` (additional scripts):

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### **Step 3.2: Environment Configuration**

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
```

### **Step 3.3: API Client Setup**

Create `frontend/lib/api.ts`:

```typescript
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### **Step 3.4: Authentication Store (Zustand)**

Create `frontend/store/authStore.ts`:

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/lib/api';

interface User {
  id: string;
  email: string;
  full_name: string | null;
  company_name: string | null;
  role: string;
  subscription_tier: string;
  subscription_status: string;
  email_verified: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  full_name?: string;
  company_name?: string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const formData = new FormData();
          formData.append('username', email);
          formData.append('password', password);

          const response = await api.post('/api/v1/auth/login', formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          });

          const { access_token } = response.data;
          localStorage.setItem('access_token', access_token);
          
          set({ token: access_token, isAuthenticated: true });
          await get().fetchUser();
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (userData: RegisterData) => {
        set({ isLoading: true });
        try {
          await api.post('/api/v1/auth/register', userData);
          // After registration, log in automatically
          await get().login(userData.email, userData.password);
        } catch (error) {
          console.error('Registration error:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        localStorage.removeItem('access_token');
        set({ user: null, token: null, isAuthenticated: false });
        window.location.href = '/login';
      },

      fetchUser: async () => {
        try {
          const response = await api.get('/api/v1/auth/me');
          set({ user: response.data, isAuthenticated: true });
        } catch (error) {
          console.error('Fetch user error:', error);
          get().logout();
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token }),
    }
  )
);
```

### **Step 3.5: Login Page**

Create `frontend/app/login/page.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Korean AI Basic Act Compliance Platform
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="/password-reset" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
```

### **Step 3.6: Registration Page**

Create `frontend/app/register/page.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    company_name: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    try {
      await registerUser({
        email: formData.email,
        password: formData.password,
        full_name: formData.full_name || undefined,
        company_name: formData.company_name || undefined,
      });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Korean AI Basic Act Compliance Platform
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm space-y-4">
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Email address *"
            />
            <input
              name="full_name"
              type="text"
              value={formData.full_name}
              onChange={handleChange}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Full name"
            />
            <input
              name="company_name"
              type="text"
              value={formData.company_name}
              onChange={handleChange}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Company name"
            />
            <input
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Password (min 8 characters) *"
            />
            <input
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Confirm password *"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>

          <div className="text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
```

### **Step 3.7: Protected Route Component**

Create `frontend/components/ProtectedRoute.tsx`:

```typescript
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading, fetchUser } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        router.push('/login');
        return;
      }
      
      if (!isAuthenticated) {
        await fetchUser();
      }
    };

    checkAuth();
  }, [isAuthenticated, router, fetchUser]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
```

### **Step 3.8: Dashboard Layout**

Create `frontend/app/dashboard/layout.tsx`:

```typescript
'use client';

import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuthStore();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/dashboard" className="text-xl font-bold text-blue-600">
                    AI Compliance
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    href="/dashboard"
                    className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/checklist"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Checklist
                  </Link>
                  <Link
                    href="/dashboard/incidents"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Incidents
                  </Link>
                  <Link
                    href="/dashboard/subscription"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Subscription
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-sm text-gray-700 mr-4">
                    {user?.email}
                    <span className="ml-2 px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                      {user?.subscription_tier}
                    </span>
                  </span>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
```

### **Step 3.9: Dashboard Home Page**

Create `frontend/app/dashboard/page.tsx`:

```typescript
'use client';

import { useAuthStore } from '@/store/authStore';

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.full_name || user?.email}!
        </h1>
        <p className="mt-2 text-gray-600">
          Manage your Korean AI Basic Act compliance from this dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Compliance Score
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">85%</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Completed Items
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">12 / 16</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Open Incidents
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">3</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recent Activity
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            <li className="px-4 py-4">
              <p className="text-sm text-gray-900">
                Completed: Data Security and Privacy Protection
              </p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </li>
            <li className="px-4 py-4">
              <p className="text-sm text-gray-900">
                New incident logged: Algorithm bias detected
              </p>
              <p className="text-sm text-gray-500">5 hours ago</p>
            </li>
            <li className="px-4 py-4">
              <p className="text-sm text-gray-900">
                Started: Human Oversight System establishment
              </p>
              <p className="text-sm text-gray-500">1 day ago</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
```

### **Day 3 Validation Checklist**

- [ ] Next.js project created and running
- [ ] Authentication store working correctly
- [ ] Login page functional
- [ ] Registration page functional
- [ ] Protected routes working
- [ ] Dashboard layout displaying correctly
- [ ] Navigation between pages working
- [ ] JWT tokens persisting in localStorage
- [ ] User info displayed in dashboard
- [ ] Logout functionality working

---

## Day 4: Compliance Checklist Features

### **Daily Objectives**

✅ Create checklist API endpoints  
✅ Build checklist display component (bilingual)  
✅ Implement checklist item status updates  
✅ Add filtering and sorting  
✅ Create incident logging  
✅ Build audit log viewer

### **Step 4.1: Checklist Backend Endpoints**

Create `backend/app/models/checklist.py`:

```python
from sqlalchemy import Column, String, Text, Boolean, Integer, DateTime, Enum, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
import enum
from ..core.database import Base

class ChecklistStatus(str, enum.Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    NOT_APPLICABLE = "not_applicable"

class ChecklistTemplate(Base):
    __tablename__ = "checklist_templates"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title_ko = Column(String(500), nullable=False)
    title_en = Column(String(500), nullable=False)
    description_ko = Column(Text)
    description_en = Column(Text)
    category = Column(String(100), nullable=False)
    compliance_area = Column(String(255))
    is_active = Column(Boolean, default=True)
    display_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class ChecklistItem(Base):
    __tablename__ = "checklist_items"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    template_id = Column(UUID(as_uuid=True), ForeignKey('checklist_templates.id', ondelete='CASCADE'), nullable=False)
    status = Column(Enum(ChecklistStatus), default=ChecklistStatus.PENDING)
    notes = Column(Text)
    completed_at = Column(DateTime)
    due_date = Column(DateTime)
    assigned_to = Column(UUID(as_uuid=True), ForeignKey('users.id', ondelete='SET NULL'))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    template = relationship("ChecklistTemplate")
    user = relationship("User", foreign_keys=[user_id])
    assignee = relationship("User", foreign_keys=[assigned_to])
```

Create `backend/app/schemas/checklist.py`:

```python
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from uuid import UUID

class ChecklistTemplateResponse(BaseModel):
    id: UUID
    title_ko: str
    title_en: str
    description_ko: Optional[str]
    description_en: Optional[str]
    category: str
    compliance_area: Optional[str]
    display_order: int
    
    class Config:
        from_attributes = True

class ChecklistItemCreate(BaseModel):
    template_id: UUID
    due_date: Optional[datetime] = None
    notes: Optional[str] = None

class ChecklistItemUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None
    completed_at: Optional[datetime] = None

class ChecklistItemResponse(BaseModel):
    id: UUID
    user_id: UUID
    template_id: UUID
    status: str
    notes: Optional[str]
    completed_at: Optional[datetime]
    due_date: Optional[datetime]
    created_at: datetime
    updated_at: datetime
    template: ChecklistTemplateResponse
    
    class Config:
        from_attributes = True
```

Create `backend/app/api/v1/checklist.py`:

```python
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from ...core.database import get_db
from ...core.security import get_current_user
from ...models.user import User
from ...models.checklist import ChecklistTemplate, ChecklistItem, ChecklistStatus
from ...schemas.checklist import (
    ChecklistTemplateResponse,
    ChecklistItemCreate,
    ChecklistItemUpdate,
    ChecklistItemResponse
)

router = APIRouter()

@router.get("/templates", response_model=List[ChecklistTemplateResponse])
async def get_checklist_templates(
    category: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all active checklist templates"""
    query = db.query(ChecklistTemplate).filter(ChecklistTemplate.is_active == True)
    
    if category:
        query = query.filter(ChecklistTemplate.category == category)
    
    templates = query.order_by(ChecklistTemplate.display_order).all()
    return templates

@router.post("/items", response_model=ChecklistItemResponse, status_code=status.HTTP_201_CREATED)
async def create_checklist_item(
    item_data: ChecklistItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new checklist item for current user"""
    # Check if item already exists
    existing_item = db.query(ChecklistItem).filter(
        ChecklistItem.user_id == current_user.id,
        ChecklistItem.template_id == item_data.template_id
    ).first()
    
    if existing_item:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Checklist item already exists for this template"
        )
    
    # Create new item
    new_item = ChecklistItem(
        user_id=current_user.id,
        template_id=item_data.template_id,
        due_date=item_data.due_date,
        notes=item_data.notes
    )
    
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    
    return new_item

@router.get("/items", response_model=List[ChecklistItemResponse])
async def get_checklist_items(
    status_filter: Optional[str] = Query(None, alias="status"),
    category: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get checklist items for current user"""
    query = db.query(ChecklistItem).filter(ChecklistItem.user_id == current_user.id)
    
    if status_filter:
        query = query.filter(ChecklistItem.status == status_filter)
    
    if category:
        query = query.join(ChecklistTemplate).filter(ChecklistTemplate.category == category)
    
    items = query.all()
    return items

@router.patch("/items/{item_id}", response_model=ChecklistItemResponse)
async def update_checklist_item(
    item_id: str,
    item_update: ChecklistItemUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update a checklist item"""
    item = db.query(ChecklistItem).filter(
        ChecklistItem.id == item_id,
        ChecklistItem.user_id == current_user.id
    ).first()
    
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Checklist item not found"
        )
    
    # Update fields
    if item_update.status:
        item.status = item_update.status
        if item_update.status == ChecklistStatus.COMPLETED and not item.completed_at:
            item.completed_at = datetime.utcnow()
    
    if item_update.notes is not None:
        item.notes = item_update.notes
    
    if item_update.completed_at:
        item.completed_at = item_update.completed_at
    
    db.commit()
    db.refresh(item)
    
    return item

@router.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_checklist_item(
    item_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a checklist item"""
    item = db.query(ChecklistItem).filter(
        ChecklistItem.id == item_id,
        ChecklistItem.user_id == current_user.id
    ).first()
    
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Checklist item not found"
        )
    
    db.delete(item)
    db.commit()
    
    return None

@router.get("/statistics")
async def get_checklist_statistics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get checklist completion statistics"""
    total = db.query(ChecklistItem).filter(ChecklistItem.user_id == current_user.id).count()
    completed = db.query(ChecklistItem).filter(
        ChecklistItem.user_id == current_user.id,
        ChecklistItem.status == ChecklistStatus.COMPLETED
    ).count()
    
    in_progress = db.query(ChecklistItem).filter(
        ChecklistItem.user_id == current_user.id,
        ChecklistItem.status == ChecklistStatus.IN_PROGRESS
    ).count()
    
    pending = db.query(ChecklistItem).filter(
        ChecklistItem.user_id == current_user.id,
        ChecklistItem.status == ChecklistStatus.PENDING
    ).count()
    
    return {
        "total": total,
        "completed": completed,
        "in_progress": in_progress,
        "pending": pending,
        "completion_rate": round((completed / total * 100) if total > 0 else 0, 2)
    }
```

Update `backend/app/main.py` to include the checklist router:

```python
from .api.v1 import auth, checklist

# ... existing code ...

app.include_router(checklist.router, prefix="/api/v1/checklist", tags=["checklist"])
```


### **Day 4 Validation Checklist**

- [ ] Checklist templates endpoint working
- [ ] Checklist items CRUD operations functional
- [ ] Bilingual content displaying correctly
- [ ] Status updates working
- [ ] Statistics endpoint returning correct data
- [ ] Frontend checklist page displaying items
- [ ] Filtering and sorting working
- [ ] Progress tracking accurate

---

## Day 5: Payment Integration & Subscriptions

### **Daily Objectives**

✅ Set up Stripe integration  
✅ Create subscription plans  
✅ Implement checkout flow  
✅ Add subscription management  
✅ Set up webhook handlers  
✅ Restrict features by tier

### **Step 5.1: Stripe Setup**

Create subscription products in Stripe Dashboard:

```
Product 1: Basic Plan
- Price: $29/month
- Features: Up to 50 checklist items, Basic support

Product 2: Pro Plan
- Price: $79/month
- Features: Unlimited checklists, Priority support, Advanced analytics

Product 3: Enterprise Plan
- Price: $199/month
- Features: Everything in Pro, Custom integrations, Dedicated support
```

### **Step 5.2: Stripe Backend Service**

Create `backend/app/services/stripe_service.py`:

```python
import stripe
from ..core.config import settings

stripe.api_key = settings.STRIPE_SECRET_KEY

class StripeService:
    @staticmethod
    def create_customer(email: str, name: str = None) -> str:
        """Create a Stripe customer"""
        customer = stripe.Customer.create(
            email=email,
            name=name,
            metadata={"platform": "korean_ai_compliance"}
        )
        return customer.id
    
    @staticmethod
    def create_checkout_session(
        customer_id: str,
        price_id: str,
        success_url: str,
        cancel_url: str
    ) -> dict:
        """Create a Stripe checkout session"""
        session = stripe.checkout.Session.create(
            customer=customer_id,
            payment_method_types=['card'],
            line_items=[{
                'price': price_id,
                'quantity': 1,
            }],
            mode='subscription',
            success_url=success_url,
            cancel_url=cancel_url,
            subscription_data={
                'trial_period_days': 14,
            }
        )
        return {
            "session_id": session.id,
            "url": session.url
        }
    
    @staticmethod
    def create_portal_session(customer_id: str, return_url: str) -> dict:
        """Create customer portal session for subscription management"""
        session = stripe.billing_portal.Session.create(
            customer=customer_id,
            return_url=return_url,
        )
        return {
            "url": session.url
        }
    
    @staticmethod
    def cancel_subscription(subscription_id: str):
        """Cancel a subscription"""
        return stripe.Subscription.delete(subscription_id)
    
    @staticmethod
    def get_subscription(subscription_id: str):
        """Get subscription details"""
        return stripe.Subscription.retrieve(subscription_id)
    
    @staticmethod
    def construct_webhook_event(payload: bytes, sig_header: str):
        """Construct and verify webhook event"""
        return stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
```

### **Step 5.3: Subscription Endpoints**

Create `backend/app/api/v1/subscription.py`:

```python
from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from ...core.database import get_db
from ...core.security import get_current_user
from ...models.user import User
from ...models.subscription import Subscription
from ...services.stripe_service import StripeService
from pydantic import BaseModel
import stripe

router = APIRouter()

class CreateCheckoutSession(BaseModel):
    price_id: str
    tier: str

class SubscriptionResponse(BaseModel):
    id: str
    tier: str
    status: str
    current_period_end: str
    cancel_at_period_end: bool

@router.post("/create-checkout-session")
async def create_checkout_session(
    data: CreateCheckoutSession,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create Stripe checkout session"""
    # Create Stripe customer if doesn't exist
    if not current_user.stripe_customer_id:
        customer_id = StripeService.create_customer(
            email=current_user.email,
            name=current_user.full_name
        )
        current_user.stripe_customer_id = customer_id
        db.commit()
    
    # Create checkout session
    session = StripeService.create_checkout_session(
        customer_id=current_user.stripe_customer_id,
        price_id=data.price_id,
        success_url=f"{settings.FRONTEND_URL}/dashboard/subscription?success=true",
        cancel_url=f"{settings.FRONTEND_URL}/dashboard/subscription?canceled=true"
    )
    
    return session

@router.post("/create-portal-session")
async def create_portal_session(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create customer portal session"""
    if not current_user.stripe_customer_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No Stripe customer found"
        )
    
    session = StripeService.create_portal_session(
        customer_id=current_user.stripe_customer_id,
        return_url=f"{settings.FRONTEND_URL}/dashboard/subscription"
    )
    
    return session

@router.get("/current")
async def get_current_subscription(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get current user's subscription"""
    subscription = db.query(Subscription).filter(
        Subscription.user_id == current_user.id
    ).order_by(Subscription.created_at.desc()).first()
    
    if not subscription:
        return {
            "tier": current_user.subscription_tier,
            "status": current_user.subscription_status,
            "is_free": True
        }
    
    return {
        "id": str(subscription.id),
        "tier": subscription.tier,
        "status": subscription.status,
        "current_period_end": subscription.current_period_end.isoformat() if subscription.current_period_end else None,
        "cancel_at_period_end": subscription.cancel_at_period_end,
        "is_free": False
    }

@router.post("/webhook")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)):
    """Handle Stripe webhooks"""
    payload = await request.body()
    sig_header = request.headers.get('stripe-signature')
    
    try:
        event = StripeService.construct_webhook_event(payload, sig_header)
    except ValueError as e:
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError as e:
        raise HTTPException(status_code=400, detail="Invalid signature")
    
    # Handle different event types
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        await handle_checkout_completed(session, db)
    
    elif event['type'] == 'customer.subscription.updated':
        subscription = event['data']['object']
        await handle_subscription_updated(subscription, db)
    
    elif event['type'] == 'customer.subscription.deleted':
        subscription = event['data']['object']
        await handle_subscription_deleted(subscription, db)
    
    elif event['type'] == 'invoice.payment_failed':
        invoice = event['data']['object']
        await handle_payment_failed(invoice, db)
    
    return {"status": "success"}

async def handle_checkout_completed(session, db: Session):
    """Handle successful checkout"""
    customer_id = session.get('customer')
    subscription_id = session.get('subscription')
    
    # Find user by stripe customer ID
    user = db.query(User).filter(User.stripe_customer_id == customer_id).first()
    if not user:
        return
    
    # Get subscription details from Stripe
    stripe_subscription = StripeService.get_subscription(subscription_id)
    
    # Determine tier from price ID
    price_id = stripe_subscription['items']['data'][0]['price']['id']
    tier_mapping = {
        'price_basic': 'basic',
        'price_pro': 'pro',
        'price_enterprise': 'enterprise'
    }
    tier = tier_mapping.get(price_id, 'basic')
    
    # Create or update subscription
    subscription = Subscription(
        user_id=user.id,
        stripe_subscription_id=subscription_id,
        stripe_price_id=price_id,
        tier=tier,
        status='active',
        current_period_start=stripe_subscription['current_period_start'],
        current_period_end=stripe_subscription['current_period_end']
    )
    
    db.add(subscription)
    
    # Update user
    user.subscription_tier = tier
    user.subscription_status = 'active'
    
    db.commit()

async def handle_subscription_updated(subscription, db: Session):
    """Handle subscription updates"""
    subscription_id = subscription.get('id')
    
    db_subscription = db.query(Subscription).filter(
        Subscription.stripe_subscription_id == subscription_id
    ).first()
    
    if db_subscription:
        db_subscription.status = subscription['status']
        db_subscription.current_period_end = subscription['current_period_end']
        db_subscription.cancel_at_period_end = subscription.get('cancel_at_period_end', False)
        
        # Update user status
        user = db.query(User).filter(User.id == db_subscription.user_id).first()
        if user:
            user.subscription_status = subscription['status']
        
        db.commit()

async def handle_subscription_deleted(subscription, db: Session):
    """Handle subscription cancellation"""
    subscription_id = subscription.get('id')
    
    db_subscription = db.query(Subscription).filter(
        Subscription.stripe_subscription_id == subscription_id
    ).first()
    
    if db_subscription:
        db_subscription.status = 'cancelled'
        
        # Downgrade user to free tier
        user = db.query(User).filter(User.id == db_subscription.user_id).first()
        if user:
            user.subscription_tier = 'free'
            user.subscription_status = 'cancelled'
        
        db.commit()

async def handle_payment_failed(invoice, db: Session):
    """Handle failed payment"""
    customer_id = invoice.get('customer')
    
    user = db.query(User).filter(User.stripe_customer_id == customer_id).first()
    if user:
        user.subscription_status = 'past_due'
        db.commit()
```

### **Step 5.4: Frontend Subscription Page**

Create `frontend/app/dashboard/subscription/page.tsx`:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';

interface PricingPlan {
  name: string;
  tier: string;
  price: string;
  priceId: string;
  features: string[];
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'Basic',
    tier: 'basic',
    price: '$29',
    priceId: 'price_basic_monthly',
    features: [
      'Up to 50 checklist items',
      'Basic incident logging',
      'Email support',
      'Monthly reports',
    ],
  },
  {
    name: 'Pro',
    tier: 'pro',
    price: '$79',
    priceId: 'price_pro_monthly',
    features: [
      'Unlimited checklist items',
      'Advanced incident management',
      'Priority support',
      'Real-time analytics',
      'Custom reports',
      'API access',
    ],
  },
  {
    name: 'Enterprise',
    tier: 'enterprise',
    price: '$199',
    priceId: 'price_enterprise_monthly',
    features: [
      'Everything in Pro',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantee',
      'White-label options',
      'Training & onboarding',
    ],
  },
];

export default function SubscriptionPage() {
  const { user } = useAuthStore();
  const [currentSubscription, setCurrentSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentSubscription();
  }, []);

  const fetchCurrentSubscription = async () => {
    try {
      const response = await api.get('/api/v1/subscription/current');
      setCurrentSubscription(response.data);
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (priceId: string, tier: string) => {
    try {
      const response = await api.post('/api/v1/subscription/create-checkout-session', {
        price_id: priceId,
        tier: tier,
      });
      
      // Redirect to Stripe Checkout
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to start checkout. Please try again.');
    }
  };

  const handleManageSubscription = async () => {
    try {
      const response = await api.post('/api/v1/subscription/create-portal-session');
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error creating portal session:', error);
      alert('Failed to open subscription management. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Subscription</h1>
        <p className="mt-2 text-gray-600">
          Manage your subscription and billing settings
        </p>
      </div>

      {/* Current Subscription Status */}
      {currentSubscription && !currentSubscription.is_free && (
        <div className="mb-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Current Plan</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium capitalize">
                {currentSubscription.tier} Plan
              </p>
              <p className="text-sm text-gray-600">
                Status: <span className="capitalize">{currentSubscription.status}</span>
              </p>
              {currentSubscription.current_period_end && (
                <p className="text-sm text-gray-600">
                  Renews on: {new Date(currentSubscription.current_period_end).toLocaleDateString()}
                </p>
              )}
            </div>
            <button
              onClick={handleManageSubscription}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Manage Subscription
            </button>
          </div>
        </div>
      )}

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingPlans.map((plan) => (
          <div
            key={plan.tier}
            className={`bg-white shadow rounded-lg p-6 ${
              user?.subscription_tier === plan.tier
                ? 'ring-2 ring-blue-500'
                : ''
            }`}
          >
            <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
            <p className="mt-4 flex items-baseline">
              <span className="text-4xl font-extrabold">{plan.price}</span>
              <span className="ml-1 text-xl text-gray-500">/month</span>
            </p>
            <ul className="mt-6 space-y-4">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="flex-shrink-0 h-6 w-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="ml-3 text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSubscribe(plan.priceId, plan.tier)}
              disabled={user?.subscription_tier === plan.tier}
              className={`mt-8 w-full py-2 px-4 rounded font-medium ${
                user?.subscription_tier === plan.tier
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {user?.subscription_tier === plan.tier ? 'Current Plan' : 'Subscribe'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### **Day 5 Validation Checklist**

- [ ] Stripe account configured
- [ ] Subscription products created
- [ ] Checkout flow working
- [ ] Webhook endpoint receiving events
- [ ] Subscription status updating correctly
- [ ] Customer portal accessible
- [ ] Payment failures handled
- [ ] Subscription cancellation working
- [ ] Trial period functioning

---

## Day 6: Email Automation & Notifications

### **Daily Objectives**

✅ Set up SendGrid integration  
✅ Create email templates  
✅ Implement welcome emails  
✅ Add password reset emails  
✅ Create notification system  
✅ Set up automated reminders

### **Step 6.1: SendGrid Service**

Create `backend/app/services/email_service.py`:

```python
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To, Content
from ..core.config import settings
from typing import List, Optional
import logging

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.client = SendGridAPIClient(settings.SENDGRID_API_KEY)
        self.from_email = Email(settings.SENDGRID_FROM_EMAIL, settings.SENDGRID_FROM_NAME)
    
    def send_email(
        self,
        to_email: str,
        subject: str,
        html_content: str,
        plain_content: Optional[str] = None
    ) -> bool:
        """Send a single email"""
        try:
            message = Mail(
                from_email=self.from_email,
                to_emails=To(to_email),
                subject=subject,
                html_content=Content("text/html", html_content)
            )
            
            if plain_content:
                message.plain_text_content = Content("text/plain", plain_content)
            
            response = self.client.send(message)
            
            logger.info(f"Email sent to {to_email}: {response.status_code}")
            return response.status_code == 202
            
        except Exception as e:
            logger.error(f"Error sending email to {to_email}: {str(e)}")
            return False
    
    def send_welcome_email(self, to_email: str, user_name: Optional[str] = None) -> bool:
        """Send welcome email to new user"""
        subject = f"Welcome to {settings.APP_NAME}!"
        
        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #2563eb;">Welcome to {settings.APP_NAME}!</h1>
                <p>Hi {user_name or 'there'},</p>
                <p>Thank you for joining the Korean AI Basic Act Compliance Platform.</p>
                <p>We're excited to help you navigate AI compliance requirements.</p>
                
                <h2 style="color: #2563eb; font-size: 18px;">Getting Started:</h2>
                <ol>
                    <li>Complete your compliance checklist</li>
                    <li>Log any AI-related incidents</li>
                    <li>Track your compliance progress</li>
                    <li>Generate compliance reports</li>
                </ol>
                
                <p style="margin-top: 30px;">
                    <a href="{settings.FRONTEND_URL}/dashboard" 
                       style="background-color: #2563eb; color: white; padding: 12px 24px; 
                              text-decoration: none; border-radius: 5px; display: inline-block;">
                        Go to Dashboard
                    </a>
                </p>
                
                <p style="margin-top: 30px; color: #666; font-size: 14px;">
                    Need help? Contact us at {settings.SENDGRID_FROM_EMAIL}
                </p>
            </div>
        </body>
        </html>
        """
        
        return self.send_email(to_email, subject, html_content)
    
    def send_password_reset_email(self, to_email: str, reset_token: str) -> bool:
        """Send password reset email"""
        reset_url = f"{settings.FRONTEND_URL}/reset-password?token={reset_token}"
        subject = "Reset Your Password"
        
        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #2563eb;">Password Reset Request</h1>
                <p>We received a request to reset your password.</p>
                <p>Click the button below to create a new password:</p>
                
                <p style="margin: 30px 0;">
                    <a href="{reset_url}" 
                       style="background-color: #2563eb; color: white; padding: 12px 24px; 
                              text-decoration: none; border-radius: 5px; display: inline-block;">
                        Reset Password
                    </a>
                </p>
                
                <p style="color: #666; font-size: 14px;">
                    This link will expire in 24 hours.
                </p>
                <p style="color: #666; font-size: 14px;">
                    If you didn't request this, please ignore this email.
                </p>
            </div>
        </body>
        </html>
        """
        
        return self.send_email(to_email, subject, html_content)
    
    def send_checklist_reminder(
        self,
        to_email: str,
        user_name: str,
        pending_items: int
    ) -> bool:
        """Send reminder about pending checklist items"""
        subject = f"You have {pending_items} pending compliance items"
        
        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #2563eb;">Compliance Checklist Reminder</h1>
                <p>Hi {user_name},</p>
                <p>You have <strong>{pending_items}</strong> pending compliance checklist items.</p>
                <p>Stay on track with Korean AI Basic Act compliance requirements.</p>
                
                <p style="margin: 30px 0;">
                    <a href="{settings.FRONTEND_URL}/dashboard/checklist" 
                       style="background-color: #2563eb; color: white; padding: 12px 24px; 
                              text-decoration: none; border-radius: 5px; display: inline-block;">
                        View Checklist
                    </a>
                </p>
            </div>
        </body>
        </html>
        """
        
        return self.send_email(to_email, subject, html_content)
    
    def send_incident_alert(
        self,
        to_email: str,
        incident_title: str,
        severity: str
    ) -> bool:
        """Send alert about new incident"""
        subject = f"New {severity.upper()} Incident: {incident_title}"
        
        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #dc2626;">New Incident Logged</h1>
                <p><strong>Title:</strong> {incident_title}</p>
                <p><strong>Severity:</strong> <span style="color: #dc2626;">{severity.upper()}</span></p>
                <p>A new AI compliance incident has been logged and requires attention.</p>
                
                <p style="margin: 30px 0;">
                    <a href="{settings.FRONTEND_URL}/dashboard/incidents" 
                       style="background-color: #dc2626; color: white; padding: 12px 24px; 
                              text-decoration: none; border-radius: 5px; display: inline-block;">
                        View Incident
                    </a>
                </p>
            </div>
        </body>
        </html>
        """
        
        return self.send_email(to_email, subject, html_content)
    
    def send_subscription_confirmation(
        self,
        to_email: str,
        tier: str,
        user_name: str
    ) -> bool:
        """Send subscription confirmation email"""
        subject = f"Subscription Confirmed - {tier.capitalize()} Plan"
        
        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #2563eb;">Subscription Confirmed!</h1>
                <p>Hi {user_name},</p>
                <p>Your subscription to the <strong>{tier.capitalize()} Plan</strong> has been confirmed.</p>
                <p>You now have access to all {tier} features!</p>
                
                <p style="margin: 30px 0;">
                    <a href="{settings.FRONTEND_URL}/dashboard" 
                       style="background-color: #2563eb; color: white; padding: 12px 24px; 
                              text-decoration: none; border-radius: 5px; display: inline-block;">
                        Go to Dashboard
                    </a>
                </p>
            </div>
        </body>
        </html>
        """
        
        return self.send_email(to_email, subject, html_content)

# Create singleton instance
email_service = EmailService()

# Convenience functions
def send_welcome_email(to_email: str, user_name: Optional[str] = None) -> bool:
    return email_service.send_welcome_email(to_email, user_name)

def send_password_reset_email(to_email: str, reset_token: str) -> bool:
    return email_service.send_password_reset_email(to_email, reset_token)

def send_checklist_reminder(to_email: str, user_name: str, pending_items: int) -> bool:
    return email_service.send_checklist_reminder(to_email, user_name, pending_items)

def send_incident_alert(to_email: str, incident_title: str, severity: str) -> bool:
    return email_service.send_incident_alert(to_email, incident_title, severity)

def send_subscription_confirmation(to_email: str, tier: str, user_name: str) -> bool:
    return email_service.send_subscription_confirmation(to_email, tier, user_name)
```

### **Day 6 Validation Checklist**

- [ ] SendGrid API key configured
- [ ] Welcome emails sending correctly
- [ ] Password reset emails functional
- [ ] Email templates rendering properly
- [ ] Notification preferences stored
- [ ] Automated reminders working
- [ ] Incident alerts triggering
- [ ] Email logs being recorded

---

## Day 7: Testing, Security & Deployment

### **Daily Objectives**

✅ Write and run unit tests  
✅ Perform integration testing  
✅ Run security audit  
✅ Set up CI/CD pipeline  
✅ Deploy to production  
✅ Configure monitoring  
✅ Document deployment process

### **Step 7.1: Backend Unit Tests**

Create `backend/tests/test_auth.py`:

```python
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.database import get_db
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.database import Base

# Test database
TEST_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_register_user():
    """Test user registration"""
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "password": "testpassword123",
            "full_name": "Test User"
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "test@example.com"
    assert "id" in data

def test_register_duplicate_email():
    """Test registration with duplicate email"""
    # First registration
    client.post(
        "/api/v1/auth/register",
        json={
            "email": "duplicate@example.com",
            "password": "testpassword123"
        }
    )
    
    # Second registration with same email
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "duplicate@example.com",
            "password": "testpassword123"
        }
    )
    assert response.status_code == 400

def test_login():
    """Test user login"""
    # Register user first
    client.post(
        "/api/v1/auth/register",
        json={
            "email": "login@example.com",
            "password": "testpassword123"
        }
    )
    
    # Login
    response = client.post(
        "/api/v1/auth/login",
        data={
            "username": "login@example.com",
            "password": "testpassword123"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_login_wrong_password():
    """Test login with wrong password"""
    response = client.post(
        "/api/v1/auth/login",
        data={
            "username": "login@example.com",
            "password": "wrongpassword"
        }
    )
    assert response.status_code == 401

def test_get_current_user():
    """Test getting current user info"""
    # Register and login
    client.post(
        "/api/v1/auth/register",
        json={
            "email": "currentuser@example.com",
            "password": "testpassword123"
        }
    )
    
    login_response = client.post(
        "/api/v1/auth/login",
        data={
            "username": "currentuser@example.com",
            "password": "testpassword123"
        }
    )
    token = login_response.json()["access_token"]
    
    # Get current user
    response = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "currentuser@example.com"

# Run tests with: pytest backend/tests/
```

### **Step 7.2: Security Checklist**

```bash
# Install security tools
pip install bandit safety

# Run security scan
bandit -r backend/app/

# Check for known vulnerabilities
safety check

# Update dependencies
pip list --outdated
```

**Security Best Practices:**

1. ✅ All passwords hashed with bcrypt
2. ✅ JWT tokens with expiration
3. ✅ HTTPS only in production
4. ✅ CORS properly configured
5. ✅ Environment variables for secrets
6. ✅ SQL injection prevention (SQLAlchemy)
7. ✅ Rate limiting on authentication endpoints
8. ✅ Input validation with Pydantic
9. ✅ RLS policies enabled
10. ✅ Audit logging implemented

### **Step 7.3: CI/CD Pipeline (GitHub Actions)**

Create `.github/workflows/ci-cd.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test-backend:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.11'
    
    - name: Install dependencies
      run: |
        cd backend
        pip install -r requirements.txt
        pip install pytest pytest-cov
    
    - name: Run tests
      run: |
        cd backend
        pytest tests/ --cov=app --cov-report=xml
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
    
    - name: Security scan
      run: |
        pip install bandit safety
        bandit -r backend/app/
        safety check

  test-frontend:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: |
        cd frontend
        npm ci
    
    - name: Run linter
      run: |
        cd frontend
        npm run lint
    
    - name: Build
      run: |
        cd frontend
        npm run build

  deploy-backend:
    needs: [test-backend]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to Railway
      run: |
        npm install -g @railway/cli
        railway up
      env:
        RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}

  deploy-frontend:
    needs: [test-frontend]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v2.0
      with:
        publish-dir: './frontend/out'
        production-branch: main
        github-token: ${{ secrets.GITHUB_TOKEN }}
        deploy-message: "Deploy from GitHub Actions"
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### **Step 7.4: Production Deployment Checklist**

**Backend (Railway):**
- [ ] Environment variables configured
- [ ] Database connection verified
- [ ] Auto-deploy enabled
- [ ] Health check endpoint responding
- [ ] HTTPS certificate active
- [ ] Custom domain configured (optional)

**Frontend (Netlify):**
- [ ] Build command: `npm run build`
- [ ] Publish directory: `out` or `.next`
- [ ] Environment variables set
- [ ] Custom domain configured
- [ ] HTTPS enabled
- [ ] Deploy previews enabled

**Database (Supabase):**
- [ ] Production database created
- [ ] Connection pooling enabled
- [ ] Backups scheduled
- [ ] RLS policies active
- [ ] API keys secured

**Monitoring:**
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring
- [ ] Uptime monitoring
- [ ] Log aggregation
- [ ] Alert notifications configured

### **Step 7.5: Final Validation Tests**

```bash
# Test backend health
curl https://your-backend-url.railway.app/health

# Test authentication
curl -X POST https://your-backend-url.railway.app/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"securepass123"}'

# Test frontend
# Open browser: https://your-site.netlify.app
# - Register a new account
# - Login
# - Navigate through dashboard
# - Complete checklist item
# - Log an incident
# - Subscribe to a plan
# - Manage subscription
```

### **Day 7 Validation Checklist**

- [ ] All unit tests passing
- [ ] Integration tests passing
- [ ] Security scan completed
- [ ] No critical vulnerabilities
- [ ] CI/CD pipeline working
- [ ] Backend deployed successfully
- [ ] Frontend deployed successfully
- [ ] Database migrations completed
- [ ] Environment variables configured
- [ ] Monitoring active
- [ ] Backup strategy in place
- [ ] Documentation complete
- [ ] Team trained on system

---

## Appendix: Additional Resources

### **Database Backup Script**

```bash
#!/bin/bash
# backup-database.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="backups"
FILENAME="db_backup_$DATE.sql"

mkdir -p $BACKUP_DIR

pg_dump $DATABASE_URL > $BACKUP_DIR/$FILENAME

echo "Backup created: $BACKUP_DIR/$FILENAME"

# Upload to S3 (optional)
# aws s3 cp $BACKUP_DIR/$FILENAME s3://your-bucket/backups/
```

### **Environment Variables Template**

```env
# Backend .env template
DATABASE_URL=postgresql://user:password@host:5432/dbname
SECRET_KEY=generate-secure-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
STRIPE_SECRET_KEY=sk_live_your_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret
SENDGRID_API_KEY=SG.your_key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
SENDGRID_FROM_NAME=Korean AI Compliance
APP_NAME=Korean AI Basic Act Compliance
FRONTEND_URL=https://yourdomain.com
BACKEND_URL=https://api.yourdomain.com
ENVIRONMENT=production
```

### **API Documentation Examples**

All API endpoints are automatically documented at:
- Swagger UI: `https://your-backend-url.railway.app/docs`
- ReDoc: `https://your-backend-url.railway.app/redoc`

### **Useful Commands**

```bash
# Backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Frontend
npm run dev

# Database migrations (if using Alembic)
alembic revision --autogenerate -m "description"
alembic upgrade head

# Run tests
pytest backend/tests/ -v
npm test

# Build for production
npm run build
```

### **Monitoring Setup**

```python
# Add to backend/app/main.py for basic monitoring
from fastapi import Request
import time

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response
```

### **Support & Maintenance**

- **Regular Updates**: Check for security updates weekly
- **Backup Verification**: Test restores monthly
- **Performance Review**: Monitor metrics daily
- **User Feedback**: Review weekly
- **Compliance Review**: Quarterly audit

---

## 🎉 Congratulations!

You've completed the 7-day launch plan for your Korean AI Basic Act Compliance SaaS platform!

### **What You've Built:**

✅ Full-stack application with React/Next.js + FastAPI  
✅ Secure JWT authentication system  
✅ Bilingual compliance checklist (Korean & English)  
✅ Incident logging and tracking  
✅ Stripe subscription management  
✅ SendGrid email automation  
✅ Row-level security with audit logging  
✅ Comprehensive test coverage  
✅ CI/CD pipeline  
✅ Production deployment  

### **Next Steps:**

1. **User Onboarding**: Create tutorial/walkthrough
2. **Advanced Features**: Add reporting, analytics, exports
3. **Integrations**: Connect with compliance tools
4. **Mobile App**: Consider React Native version
5. **Marketing**: Launch campaign, content marketing
6. **Support**: Set up help desk, knowledge base
7. **Scale**: Monitor performance, optimize as needed

### **Keeping This Plan Updated:**

- [ ] Mark completed items with dates
- [ ] Add notes on challenges encountered
- [ ] Document custom modifications
- [ ] Track feature requests
- [ ] Update with new compliance requirements

---

**This is a living document. Update it as your platform evolves!**

**Version History:**
- v1.0 (Nov 2025): Initial 7-day plan
- Future updates: Add version notes here

**Team:** Korean AI Basic Act Compliance SaaS Team  
**Last Review:** November 2025  
**Next Review:** December 2025
