import { IFilters, IDropfilter, IFavorite, IPreset } from "../context/DFContext"
import initialState, { defaultKeywords } from "../initialState"
import { IKeyword } from "../../utils/DomainFilter"
import { sortKeywords } from "../../utils/helpers"

export enum FilterActionTypes {
	toggleKeyword = "toggleKeyword",
	addKeyword = "addKeyword",
	removeKeyword = "removeKeyword",
	removeDefaultKeywords = "removeDefaultKeywords",
	restoreDefaultKeywords = "restoreDefaultKeywords",
	toggleExtension = "toggleExtension",
	outputType = "outputType",
	backorderService = "backorderService",
	dropDate = "dropDate",
	domainLength = "domainLength",
	toggleHacks = "toggleHacks",
	toggleHyphens = "toggleHyphens",
	toggleNumbers = "toggleNumbers",
	reset = "reset",
	restoreConfiguration = "restoreConfiguration",
	addFavorite = "addFavorite",
	removeFavorite = "removeFavorite",
	addPreset = "addPreset",
	removePreset = "removePreset",
	loadPreset = "loadPreset",
}

export interface IAction {
	type: FilterActionTypes
	payload?: any
}

export type IActionHandler = (state: IDropfilter, payload?: any) => IDropfilter

const actions: Record<FilterActionTypes, IActionHandler> = {
	loadPreset: (state: IDropfilter, payload: IPreset) => ({
		...state,
		config: payload.config
	}),
	addFavorite: (state: IDropfilter, payload: IFavorite) => {
		const favorite: IFavorite | undefined = state.favorites.find(
			(f: IFavorite) => f.fqdn === payload.fqdn
		)
		if (!favorite) {
			const favorites = state.favorites.slice()
			favorites.push(payload)
			return { ...state, favorites }
		} else {
			return state
		}
	},
	removeFavorite: (state: IDropfilter, payload: IFavorite) => {
		const favorite: IFavorite | undefined = state.favorites.find(
			(f: IFavorite) => f.fqdn === payload.fqdn
		)
		if (favorite) {
			const favorites = state.favorites.slice()
			const index = favorites.indexOf(payload)
			favorites.splice(index, 1)
			return { ...state, favorites }
		} else {
			return state
		}
	},
	addPreset: (state: IDropfilter, payload: IPreset) => {
		const preset: IPreset | undefined = state.presets.find(
			(p: IPreset) => p.config === payload.config
		)
		if (!preset) {
			const presets = state.presets.slice()
			presets.push(payload)
			return { ...state, presets }
		} else {
			return state
		}
	},
	removePreset: (state: IDropfilter, payload: IPreset) => {
		const preset: IPreset | undefined = state.presets.find(
			(f: IPreset) => f.config === payload.config
		)
		if (preset) {
			const presets = state.presets.slice()
			const index = presets.indexOf(payload)
			presets.splice(index, 1)
			return { ...state, presets }
		} else {
			return state
		}
	},
	toggleKeyword: (state: IDropfilter, index: number) => {
		const keywords = state.config.keywords.slice()
		const keyword = keywords[index]
		keywords.splice(index, 1, {
			value: keyword.value,
			selected: !keyword.selected,
		})
		sortKeywords(keywords)
		return { ...state, config: { ...state.config, keywords } }
	},
	addKeyword: (state: IDropfilter, payload: string) => {
		const keyword: IKeyword | undefined = state.config.keywords.find(
			(k: IKeyword) => k.value === payload
		)
		if (!keyword) {
			const keywords = state.config.keywords.slice()
			keywords.push({ value: payload, selected: true })
			sortKeywords(keywords)
			return { ...state, config: { ...state.config, keywords } }
		} else {
			// log error
			return state
		}
	},
	removeKeyword: (state: IDropfilter, index: number) => {
		const keywords = state.config.keywords.slice()
		keywords.splice(index, 1)
		return { ...state, config: { ...state.config, keywords } }
	},
	removeDefaultKeywords: (state: IDropfilter) => {
		const keywords = state.config.keywords.slice()
		const defaultsRemoved = keywords.filter(
			(kw) => !defaultKeywords.includes(kw.value)
		)
		return { ...state, config: { ...state.config, keywords: defaultsRemoved } }
	},
	restoreDefaultKeywords: (state: IDropfilter) => {
		let keywords = state.config.keywords
			.slice()
			.concat(defaultKeywords.map((value) => ({ value, selected: true })))
		keywords = keywords.reduce((acc, curr) => {
			if (acc.findIndex((k) => k.value === curr.value) === -1)
				acc.push(curr)
			return acc
		}, [] as IKeyword[])
		sortKeywords(keywords)
		return { ...state, config: { ...state.config, keywords } }
	},
	toggleExtension: (state: IDropfilter, index: number) => {
		const extensions = state.config.extensions.slice()
		const extension = extensions[index]
		extensions.splice(index, 1, {
			value: extension.value,
			selected: !extension.selected,
		})
		return { ...state, config: { ...state.config, extensions } }
	},
	outputType: (state: IDropfilter, payload: string) => ({
		...state,
		config: { ...state.config, outputType: payload },
	}),
	backorderService: (state: IDropfilter, payload: string) => ({
		...state,
		config: { ...state.config, backorderService: payload },
	}),
	dropDate: (state: IDropfilter, payload: string) => ({
		...state,
		config: { ...state.config, dropDate: payload },
	}),
	domainLength: (state: IDropfilter, payload: [number, number]) => ({
		...state,
		config: { ...state.config, domainLength: payload },
	}),
	toggleHacks: (state: IDropfilter) => ({
		...state,
		config: { ...state.config, includeHacks: !state.config.includeHacks },
	}),
	toggleHyphens: (state: IDropfilter) => ({
		...state,
		config: { ...state.config, excludeHyphens: !state.config.excludeHyphens },
	}),
	toggleNumbers: (state: IDropfilter) => ({
		...state,
		config: { ...state.config, excludeNumbers: !state.config.excludeNumbers },
	}),
	reset: () => initialState,
	restoreConfiguration: (state: IDropfilter, payload: IDropfilter) => ({
		...state,
		favorites: [...state.favorites, ...payload.favorites],
		presets: [...state.presets, ...payload.presets],
		config: { ...state.config, ...payload.config }
	}),
}

export default actions
