import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import DomainFilter, { IFilterConfig } from "../../utils/DomainFilter";
import axios from 'axios'
import moment from 'moment'
import { shuffle } from 'lodash'

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

    const filterConfig: IFilterConfig = {
        domainLength: [1,4],
        excludeHyphens: true,
        excludeNumbers: true,
        includeHacks: false,
        extensions: [".com"],
        keywords: ["a", "e", "i", "o", "u"],
    }

    const df = new DomainFilter(filterConfig);

    const tomorrow = moment().add(1, 'days')
    const dropDate = tomorrow.format('M-DD-YYYY');

    const [m, d, y] = dropDate.split('-')

    const response = await axios({
        method: 'POST',
        url: `https://dropfilter.app/api/filter`,
        data: {
            service: "namejet",
            config: {},
            filename: `${dropDate}.txt`
        }
    })

    const { count, domains } = response.data;

    const filtered = df.filter(domains);

    const pasteTitle = `${tomorrow.format('YYYYMMDD')}-namejet`;

    const externalUrl = `https://archive.dropfilter.app/?y=${y}&m=${m}&d=${d}&bs=namejet`

    const pasteResponse = await axios({
        method: 'POST',
        url: `https://api.omg.lol/address/og/pastebin/`,
        headers: {
            Authorization: `Bearer ${process.env.OMG_API_KEY}`
        },
        data: {
            title: pasteTitle,
            content: filtered.join('\n'),  
        }
    })

    const tootContent = `

Found ${count} total domains expiring tomorrow. You can backorder on NameJet.com.

Filtering the list for 4L Liquid Domains with at least one vowel yields ${filtered.length} results.

${filtered.length > 30 ? shuffle(filtered).slice(0, 30).join('\n') : filtered.join('\n')}

${filtered.length > 30 && pasteResponse.data.request.success ? `...and ${filtered.length - 30} more can be found at https://expired.paste.lol/${pasteTitle}` : ''}

View the full, unfiltered list at
${externalUrl}
`;
    

    const res = await axios({
        method: 'POST',
        url: `https://api.omg.lol/address/og/statuses/`,
        headers: {
            Authorization: `Bearer ${process.env.OMG_API_KEY}`
        },
        data: {
            emoji: "💧",
            title: pasteTitle,
            content: tootContent,  
        }
    })

    if (res.status !== 200) {
        return {
            statusCode: res.status,
            body: JSON.stringify({}),
        };
    }

    if (res.data.request.success === true) {
        return {
            statusCode: 200,
            body: JSON.stringify(res.data),
        };
    }
};


export { handler };
