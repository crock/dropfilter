import { createContext } from "react"
import { IAction } from "../actions/DFActions"
import initialState from "../initialState"
import { IFilterConfig } from "domainfilter"

export interface IFavorite {
	fqdn: string
	drop_date_str: string
	backorder_service: string
}

export interface IPreset {
	created_at: Date
	config: IFilterConfig
}

export interface IDropfilter {
	favorites: IFavorite[],
	presets: IPreset[],
	config: IFilterConfig
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
