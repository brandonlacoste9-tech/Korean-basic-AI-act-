import type { NextApiRequest, NextApiResponse } from 'next';
import roadmap, { sampleRoadmapItems } from '../../../data/roadmap';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json({
      success: true,
      data: {
        quarters: {
          'Q3-2025': sampleRoadmapItems.filter(item => item.quarter === 'Q3-2025'),
          'Q4-2025': sampleRoadmapItems.filter(item => item.quarter === 'Q4-2025'),
          'Q1-2026': sampleRoadmapItems.filter(item => item.quarter === 'Q1-2026'),
          'Q2-2026': sampleRoadmapItems.filter(item => item.quarter === 'Q2-2026'),
          'Future': sampleRoadmapItems.filter(item => item.quarter === 'Future')
        },
        workstreams: roadmap.workstreams,
        statuses: roadmap.statuses,
        totalItems: sampleRoadmapItems.length
      }
    });
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
