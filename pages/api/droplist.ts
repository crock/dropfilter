import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { service, filename } = req.query
    res.setHeader('Access-Control-Allow-Origin', '*')

    if (service && filename) {
        const gcsUrl = `https://lists.dropfilter.app/lists/${service}/${filename}`
        const response = await axios.get(gcsUrl)
        if (response.status === 200) {
            res.status(200).send(response.data)
        } else {
            res.status(404).send('')
        }
    }
}