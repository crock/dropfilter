import { createContext } from "react"
import { IAction } from "../actions/DFActions"
import initialState from "../initialState"
import { IExtension, IKeyword } from "../../utils/DomainFilter"

export interface IFilters {
	outputType: string
	backorderService: string
	dropDate: string
	domainLength: number[]
	includeHacks: boolean
	excludeHyphens: boolean
	excludeNumbers: boolean
	extensions: IExtension[]
	keywords: IKeyword[]
}
export interface IFavorite {
	fqdn: string
	drop_date_str: string
	backorder_service: string
}

export interface IPreset {
	created_at: Date
	config: IFilters
}
export interface IDropfilter {
	favorites: IFavorite[],
	presets: IPreset[],
	config: IFilters
}

type DispatchFunction = (action: IAction) => void

interface IContext {
	state: IDropfilter
	dispatch: DispatchFunction
}

const defaultContext: IContext = {
	state: initialState,
	dispatch: (action: IAction) => null,
}

const context = createContext(defaultContext)

export default context
