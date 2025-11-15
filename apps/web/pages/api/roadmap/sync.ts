import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Stub endpoint - GitHub sync disabled in initial release
    res.status(200).json({
      synced: false,
      message: 'GitHub sync disabled in initial release.',
      timestamp: new Date().toISOString()
    });
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
