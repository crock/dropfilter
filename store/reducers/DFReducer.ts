import { Reducer } from "react"
import { IDropfilter } from "../context/DFContext"
import actions, { IAction } from "../actions/DFActions"

const reducer: Reducer<IDropfilter, IAction> = (state, action) => {
	const newState = actions[action.type](state, action.payload)
	return newState
}

export default reducer
