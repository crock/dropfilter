import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { query: { list } } = req

    res.setHeader('Access-Control-Allow-Origin', '*')

    
}
 