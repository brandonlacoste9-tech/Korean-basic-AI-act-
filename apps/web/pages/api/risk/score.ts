import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Stub endpoint for risk score assessment
    res.status(200).json({
      risk_level: 'moderate',
      confidence: 0.62,
      factors: [
        'model transparency',
        'training dataset clarity'
      ],
      factors_ko: [
        '모델 투명성',
        '학습 데이터셋 명확성'
      ],
      timestamp: new Date().toISOString()
    });
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
