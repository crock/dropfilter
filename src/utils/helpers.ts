import { allAlphanumericCharacters  } from './constants';
import { IKeyword } from "domainfilter"
import moment from 'moment'

export const compareStrings = (a: string, b: string) => {
	// Assuming you want case-insensitive comparison
	a = a.toLowerCase()
	b = b.toLowerCase()

	return a < b ? -1 : a > b ? 1 : 0
}

export const sortKeywords = (keywords: IKeyword[]) => {
	keywords.sort((a, b) => compareStrings(a.value, b.value))
	keywords.sort((a, b) =>
		!a.selected && b.selected ? 1 : a.selected === b.selected ? 0 : -1
	)
}

export const formattedDate = (dropDate: string) => {
	const now = moment()
	switch (dropDate) {
		case "yesterday":
			return now.subtract(1, "days").format("M-DD-YYYY")
		case "today":
			return now.format("M-DD-YYYY")
		case "tomorrow":
			return now.add(1, "days").format("M-DD-YYYY")
		case "in_2_days":
			return now.add(2, "days").format("M-DD-YYYY")
		case "in_3_days":
			return now.add(3, "days").format("M-DD-YYYY")
		default:
			return dropDate
	}
}


export function getSerpPageNumber(index: number, perPage: number = 10) {
    return Math.ceil((index + 1) / perPage);
}

export function getSerpStartIndex(pageNumber: number, perPage: number = 10) {
    return ((pageNumber - 1) * perPage) + 1;
}

export function generateShortSlug(length: number = 5) {
    let slug = "";
    for (let i = 0; i < length; i++) {
        slug += allAlphanumericCharacters.charAt(Math.floor(Math.random() * allAlphanumericCharacters.length));
    }
    return slug;
}

export const generateApiKey = () => {
    //create a base-36 string that contains 30 chars in a-z,0-9
    return [...Array(30)]
        .map((e) => ((Math.random() * 36) | 0).toString(36))
        .join('');
};

export const getDomainParts = (fqdn: string) => {
    const reversedDomain = fqdn.split('').reverse().join('')

    const dotCount = fqdn.split('.').length - 1;

    const domainParts = reversedDomain.split('.')

    const tld = dotCount === 2
        ? `${domainParts[0]}.${domainParts[1]}.`.split('').reverse().join('')
        : `${domainParts[0]}.`.split('').reverse().join('')

    const sld = (dotCount === 2 ? domainParts[2] : domainParts[1]).split('').reverse().join('')

    return {
        sld,
        tld,
        domainLength: fqdn.length,
        fqdn: fqdn
    }
}
