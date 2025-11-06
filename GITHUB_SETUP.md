# GitHub Setup Guide

This guide provides complete step-by-step instructions for creating a GitHub repository, pushing your code, and configuring automated deployments to Railway and Netlify.

## Table of Contents
- [Creating Your GitHub Repository](#creating-your-github-repository)
- [Initial Git Setup](#initial-git-setup)
- [Pushing Code to GitHub](#pushing-code-to-github)
- [GitHub Settings Configuration](#github-settings-configuration)
- [Automated Deployment Setup](#automated-deployment-setup)
  - [Railway Deployment](#railway-deployment)
  - [Netlify Deployment](#netlify-deployment)
- [Branch Strategy Best Practices](#branch-strategy-best-practices)

## Creating Your GitHub Repository

### Step 1: Create a New Repository on GitHub

1. Log in to your GitHub account at [github.com](https://github.com)
2. Click the **+** icon in the upper-right corner
3. Select **New repository**
4. Fill in the repository details:
   - **Repository name**: Choose a descriptive name (e.g., `Korean-basic-AI-act-`)
   - **Description**: Add a brief description of your project
   - **Visibility**: Choose **Public** or **Private**
   - **Initialize repository**: Leave unchecked if you already have code locally
5. Click **Create repository**

### Step 2: Note Your Repository URL

After creating the repository, GitHub will show you the repository URL. It will look like:
```
https://github.com/YOUR-USERNAME/YOUR-REPOSITORY-NAME.git
```

## Initial Git Setup

### Step 1: Initialize Git in Your Local Project

If you haven't already initialized Git in your project directory, run:

```bash
cd /path/to/your/project
git init
```

### Step 2: Configure Git User Information

Set your name and email (if not already configured globally):

```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### Step 3: Add Your Files

Add all your project files to Git:

```bash
git add .
```

### Step 4: Create Your First Commit

Commit your files with a descriptive message:

```bash
git commit -m "Initial commit"
```

## Pushing Code to GitHub

### Step 1: Add the Remote Repository

Link your local repository to GitHub:

```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY-NAME.git
```

### Step 2: Verify the Remote

Check that the remote was added correctly:

```bash
git remote -v
```

You should see:
```
origin  https://github.com/YOUR-USERNAME/YOUR-REPOSITORY-NAME.git (fetch)
origin  https://github.com/YOUR-USERNAME/YOUR-REPOSITORY-NAME.git (push)
```

### Step 3: Push Your Code

Push your code to the main branch:

```bash
git branch -M main
git push -u origin main
```

**Explanation:**
- `git branch -M main`: Renames your current branch to 'main'
- `git push -u origin main`: Pushes your code and sets 'origin/main' as the upstream branch

### Subsequent Pushes

After the initial setup, you can push changes with:

```bash
git add .
git commit -m "Your commit message"
git push
```

## GitHub Settings Configuration

### Repository Settings

Navigate to your repository on GitHub and click **Settings** to configure:

#### 1. General Settings
- **Features**: Enable Issues, Wiki, Discussions as needed
- **Pull Requests**: 
  - ✅ Allow merge commits
  - ✅ Allow squash merging
  - ✅ Allow rebase merging
  - ✅ Automatically delete head branches

#### 2. Branches
- Set **main** as the default branch
- Add branch protection rules:
  1. Click **Add rule**
  2. Branch name pattern: `main`
  3. Recommended protections:
     - ✅ Require a pull request before merging
     - ✅ Require approvals (at least 1)
     - ✅ Dismiss stale pull request approvals when new commits are pushed
     - ✅ Require status checks to pass before merging
     - ✅ Require branches to be up to date before merging

#### 3. Secrets and Variables
For deployment automation, add repository secrets:
1. Go to **Settings** > **Secrets and variables** > **Actions**
2. Click **New repository secret**
3. Add necessary secrets (see deployment sections below)

#### 4. Actions
- Go to **Settings** > **Actions** > **General**
- Set **Workflow permissions**:
  - ✅ Read and write permissions
  - ✅ Allow GitHub Actions to create and approve pull requests

## Automated Deployment Setup

### Railway Deployment

Railway provides automated backend deployments directly from GitHub.

#### Step 1: Create a Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up using your GitHub account

#### Step 2: Create a New Project
1. Click **New Project**
2. Select **Deploy from GitHub repo**
3. Choose your repository from the list

#### Step 3: Configure Your Service
1. Railway will auto-detect your project type
2. Configure environment variables:
   - Click **Variables** tab
   - Add your environment variables (API keys, database URLs, etc.)

#### Step 4: Set Up Custom Domain (Optional)
1. Click **Settings** tab
2. Scroll to **Domains**
3. Click **Generate Domain** for a Railway subdomain
4. Or add your custom domain

#### Step 5: Configure Automatic Deployments
Railway automatically deploys on every push to your default branch. To customize:

1. Go to **Settings** > **Deployment**
2. Configure:
   - **Root Directory**: Set if your app is in a subdirectory
   - **Build Command**: Override if needed (e.g., `npm run build`)
   - **Start Command**: Override if needed (e.g., `npm start`)
   - **Watch Paths**: Specify which file changes should trigger deployments

#### Railway Environment Variables in GitHub
To use Railway in GitHub Actions, add these secrets:
```
RAILWAY_TOKEN - Your Railway API token (get from Railway dashboard > Account Settings > Tokens)
```

### Netlify Deployment

Netlify is ideal for deploying static sites and frontend applications.

#### Step 1: Create a Netlify Account
1. Go to [netlify.com](https://www.netlify.com)
2. Sign up using your GitHub account

#### Step 2: Create a New Site
1. Click **Add new site** > **Import an existing project**
2. Choose **GitHub**
3. Authorize Netlify to access your repositories
4. Select your repository

#### Step 3: Configure Build Settings
1. **Branch to deploy**: `main` (or your default branch)
2. **Build command**: 
   - For static sites: `npm run build` or leave empty
   - For React/Vue/etc: `npm run build`
3. **Publish directory**: 
   - `dist` for Vite projects
   - `build` for Create React App
   - `public` for static sites
   - `out` for Next.js static export

#### Step 4: Configure Environment Variables
1. Go to **Site settings** > **Build & deploy** > **Environment**
2. Click **Edit variables**
3. Add your environment variables:
   ```
   NODE_VERSION=18
   API_URL=https://your-api-url.com
   ```

#### Step 5: Set Up Custom Domain (Optional)
1. Go to **Site settings** > **Domain management**
2. Click **Add custom domain**
3. Follow instructions to configure DNS

#### Step 6: Configure Deploy Notifications
1. Go to **Site settings** > **Build & deploy** > **Deploy notifications**
2. Add notifications for:
   - Deploy started
   - Deploy succeeded
   - Deploy failed

#### Netlify Deployment Options

**Branch Deploys**: Netlify can create preview deployments for branches
1. Go to **Site settings** > **Build & deploy** > **Continuous Deployment**
2. Configure **Branch deploys** to deploy all branches or specific ones

**Deploy Previews**: Automatic deployments for pull requests
1. Enable **Deploy Previews** in the same section
2. Choose to deploy all PRs or only from your team

#### Netlify Environment Variables in GitHub
To use Netlify in GitHub Actions, add these secrets:
```
NETLIFY_AUTH_TOKEN - Your Netlify personal access token
NETLIFY_SITE_ID - Your site's API ID (found in Site settings > General)
```

### GitHub Actions for Automated Deployments

Create `.github/workflows/deploy.yml` for automated deployments:

```yaml
name: Deploy to Railway and Netlify

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy-railway:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Railway
        run: |
          npm install -g @railway/cli
          railway deploy
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}

  deploy-netlify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Netlify
        uses: netlify/actions/cli@v1
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
        with:
          args: deploy --prod
```

## Branch Strategy Best Practices

### 🌟 Pro Tip: Use Feature Branches for Safe Development

Never commit directly to the `main` branch! Instead, use this workflow:

#### 1. Create a Feature Branch

For each new feature or bug fix, create a dedicated branch:

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

#### 2. Make Changes and Commit

Work on your feature and commit regularly:

```bash
git add .
git commit -m "Add descriptive commit message"
```

#### 3. Push Your Feature Branch

Push your branch to GitHub:

```bash
git push -u origin feature/your-feature-name
```

#### 4. Create a Pull Request

1. Go to your repository on GitHub
2. Click **Pull requests** > **New pull request**
3. Select your feature branch to merge into `main`
4. Add a description of your changes
5. Click **Create pull request**

#### 5. Review and Merge

1. Review the changes (or have teammates review)
2. Wait for automated checks to pass
3. Merge the pull request
4. Delete the feature branch

#### 6. Update Your Local Main Branch

After merging, update your local repository:

```bash
git checkout main
git pull origin main
```

### Branch Naming Conventions

Use clear, descriptive branch names:

- **Features**: `feature/add-user-authentication`
- **Bug fixes**: `fix/login-validation-error`
- **Hotfixes**: `hotfix/critical-security-patch`
- **Documentation**: `docs/update-readme`
- **Refactoring**: `refactor/optimize-database-queries`

### Why This Strategy Works

✅ **Safety**: Main branch stays stable and deployable  
✅ **Review**: All changes go through pull request review  
✅ **Testing**: Automated tests run on every PR  
✅ **Collaboration**: Team members can review code before merge  
✅ **History**: Clear git history shows what was changed and why  
✅ **Rollback**: Easy to revert changes if something breaks  

### Additional Git Commands

#### Check Current Branch
```bash
git branch
```

#### Switch Between Branches
```bash
git checkout branch-name
```

#### Delete a Local Branch
```bash
git branch -d branch-name
```

#### Delete a Remote Branch
```bash
git push origin --delete branch-name
```

#### View Commit History
```bash
git log --oneline --graph --all
```

#### Discard Local Changes
```bash
git checkout -- filename    # Discard changes to a specific file
git reset --hard           # Discard all local changes (use carefully!)
```

#### Sync Fork with Original Repository
```bash
# Replace ORIGINAL-OWNER and REPO with the original repository details
git remote add upstream https://github.com/ORIGINAL-OWNER/REPO.git
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

## Troubleshooting

### Authentication Issues

If you encounter authentication errors when pushing:

1. **Use Personal Access Token (PAT)**: 
   - Go to GitHub Settings > Developer settings > Personal access tokens
   - Generate new token with `repo` scope
   - Use token as password when prompted

2. **Set up SSH keys** (recommended):
   ```bash
   ssh-keygen -t ed25519 -C "your.email@example.com"
   cat ~/.ssh/id_ed25519.pub  # Copy this key
   ```
   - Add the key to GitHub: Settings > SSH and GPG keys > New SSH key
   - Change remote URL (replace USERNAME and REPO with your details): 
     ```bash
     git remote set-url origin git@github.com:USERNAME/REPO.git
     ```

### Merge Conflicts

If you encounter merge conflicts:

1. Pull the latest changes: `git pull origin main`
2. Open conflicted files and resolve conflicts (look for `<<<<<<<`, `=======`, `>>>>>>>`)
3. Stage resolved files: `git add .`
4. Complete the merge: `git commit -m "Resolve merge conflicts"`
5. Push changes: `git push`

### Deployment Failures

If deployments fail:

1. Check deployment logs in Railway/Netlify dashboard
2. Verify environment variables are set correctly
3. Ensure build commands are correct
4. Check that all dependencies are listed in `package.json`
5. Review GitHub Actions logs for detailed error messages

## Summary

You now have a complete setup with:

✅ GitHub repository created and code pushed  
✅ Repository settings configured for team collaboration  
✅ Railway connected for backend deployments  
✅ Netlify connected for frontend deployments  
✅ Automated deployments via GitHub Actions  
✅ Safe development workflow with feature branches  

Every push to `main` will automatically deploy to both Railway and Netlify, while feature branches can be developed and tested safely before merging!

---

**Need Help?**
- GitHub Docs: https://docs.github.com
- Railway Docs: https://docs.railway.app
- Netlify Docs: https://docs.netlify.com
- Git Documentation: https://git-scm.com/doc
