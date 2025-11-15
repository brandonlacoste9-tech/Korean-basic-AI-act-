import type { NextApiRequest, NextApiResponse } from 'next';
import { sampleRoadmapItems } from '../../../data/roadmap';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { quarter } = req.query;

  if (req.method === 'GET') {
    const validQuarters = ['Q3-2025', 'Q4-2025', 'Q1-2026', 'Q2-2026', 'Future'];
    
    if (!quarter || typeof quarter !== 'string' || !validQuarters.includes(quarter)) {
      res.status(400).json({ 
        success: false, 
        error: 'Invalid quarter parameter. Valid values: Q3-2025, Q4-2025, Q1-2026, Q2-2026, Future' 
      });
      return;
    }

    const items = sampleRoadmapItems.filter(item => item.quarter === quarter);

    res.status(200).json({
      success: true,
      quarter,
      data: items,
      count: items.length
    });
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
