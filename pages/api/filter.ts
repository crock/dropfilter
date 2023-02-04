import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import DomainFilter from '../../utils/DomainFilter'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { config, service, filename } = req.body

	if (req.method !== "POST") {
		res.status(400).send('Bad Request')
	}

	const gcsUrl = `https://lists.dropfilter.app/lists/${service}/${filename}`
	const response = await axios.get(gcsUrl)

	const domainList: string[] = response.data ? response.data.split(/\s/).filter(Boolean) : []

	res.setHeader('Access-Control-Allow-Origin', '*')

	const df = new DomainFilter(config)
	const filtered = df.filter(domainList)

	res.status(200).json({ count: filtered.length, domains: filtered })
}