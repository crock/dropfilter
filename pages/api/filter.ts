import { NextApiRequest, NextApiResponse } from 'next'
import { fetchDropList, formattedDate } from '../../utils/helpers'
import DomainFilter from '../../utils/DomainFilter'

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') {
        res.status(405).send('')
    }

    const { filters } = req.body
    const { backorderService, dropDate, preset } = req.query

    if (!filters || !backorderService || !dropDate || !preset) {
        res.status(400).send('')
    }

    const df = new DomainFilter(filters)
    const domains = await fetchDropList(backorderService, dropDate)
    
    const filtered = df.filter(domains)

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Cache-Control', 'public, max-age=86400')
    
}
