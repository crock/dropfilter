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
