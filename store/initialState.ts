export const defaultKeywords = ["apple", "beach", "tech"]

export default {
	favorites: [],
	presets: [],
	config: {
		outputType: "web", // web, bot, cli, raw, raw_legacy
		backorderService: "namejet",
		dropDate: "today", // yesterday, today, tomorrow, in_2_days, in_3_days
		domainLength: [7, 15], // [min, max]
		includeHacks: false,
		excludeHyphens: true,
		excludeNumbers: true,
		extensions: [
			{
				value: ".com",
				selected: true,
			},
			{
				value: ".net",
				selected: true,
			},
			{
				value: ".org",
				selected: true,
			},
			{
				value: ".io",
				selected: false,
			},
			{
				value: ".co",
				selected: false,
			},
			{
				value: ".app",
				selected: false,
			},
			{
				value: ".page",
				selected: false,
			},
			{
				value: ".dev",
				selected: false,
			},
			{
				value: ".xyz",
				selected: false,
			},
			{
				value: ".pw",
				selected: false,
			},
			{
				value: ".co.uk",
				selected: false,
			},
			{
				value: ".uk",
				selected: false,
			},
			{
				value: ".us",
				selected: false,
			},
			{
				value: ".info",
				selected: false,
			},
			{
				value: ".cc",
				selected: false,
			},
			{
				value: ".biz",
				selected: false,
			},
			{
				value: ".tv",
				selected: false,
			},
		],
		keywords: [
			{
				value: "apple",
				selected: true,
			},
			{
				value: "beach",
				selected: true,
			},
			{
				value: "tech",
				selected: false,
			},
		],
	}
}
