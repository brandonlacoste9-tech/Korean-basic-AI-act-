import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Stub endpoint for Korean AI Act compliance check
    res.status(200).json({
      compliance_score: 72,
      issues: [
        { 
          id: 'A-120', 
          severity: 'medium', 
          message: 'Dataset provenance incomplete',
          message_ko: '데이터셋 출처 정보 불완전'
        },
        { 
          id: 'B-032', 
          severity: 'low', 
          message: 'Missing documentation link',
          message_ko: '문서 링크 누락'
        }
      ],
      status: 'ok',
      timestamp: new Date().toISOString()
    });
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
