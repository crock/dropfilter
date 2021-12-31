import { NextApiRequest, NextApiResponse } from 'next'
import data from '../../data/backorderServices.json'

export default (req: NextApiRequest, res: NextApiResponse) => {

    const filtered = data.filter(s => s.active)

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200).json(filtered)
}
