import {IDropfilter} from "./context/DFContext";
import {KeywordPosition} from "domainfilter";

export const defaultKeywords  = [
	{
		value: "apple",
		selected: true,
		position: "start" as KeywordPosition,
	},
	{
		value: "beach",
		selected: true,
		position: "end" as KeywordPosition,
	},
	{
		value: "tech",
		selected: false,
		position: "anywhere" as KeywordPosition,
	},
]

// @ts-ignore
const initialState: IDropfilter = {
	unfilteredDomains: [],
	filteredDomains: [],
	favorites: [],
	presets: [],
	config: {
		idn: false,
		adult: false,
		domainLength: [7, 15], // [min, max]
		domainHacks: false,
		hyphens: false,
		numbers: false,
		extensions: [
			{
				value: ".com",
				selected: true,
			},
			{
				value: ".net",
				selected: false,
			},
			{
				value: ".org",
				selected: false,
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
				value: ".info",
				selected: false,
			},
			{
				value: ".us",
				selected: false,
			},
			{
				value: ".biz",
				selected: false,
			},
			{
				value: ".pro",
				selected: false,
			},
			{
				value: ".app",
				selected: false,
			},
			{
				value: ".co.uk",
				selected: false,
			},
			{
				value: ".tech",
				selected: false,
			},
			{
				value: ".uk",
				selected: false,
			},
			{
				value: ".ca",
				selected: false,
			},
		],
		keywords: defaultKeywords,
	}
}

export default initialState
