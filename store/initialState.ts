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
		],
		keywords: defaultKeywords,
	}
}

export default initialState
