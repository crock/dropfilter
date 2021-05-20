import React, { useReducer } from "react"
import IProvider from "./IProvider"
import reducer from "../reducers/DFReducer"
import initialState from "../initialState"
import DFContext from "../context/DFContext"

const init = (initial: any) => {
	return initial
}

const DFProvider = ({ children }: IProvider) => {
	const [state, dispatch] = useReducer(reducer, initialState, init)

	return (
		<DFContext.Provider value={{ state, dispatch }}>
			{children}
		</DFContext.Provider>
	)
}

export default DFProvider
