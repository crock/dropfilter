import React, { useReducer, useEffect } from "react"
import IProvider from "./IProvider"
import { DFReducer, initialState, DFContext } from "@/store/"

const STORAGE_KEY = 'dfData'

const init = () => {
	// Try to load state from localStorage
	const savedState = localStorage.getItem(STORAGE_KEY)
	if (savedState) {
		const json = JSON.parse(savedState)
    return json
	}
	return initialState
}

const DFProvider = ({ children }: IProvider) => {
	const [state, dispatch] = useReducer(DFReducer, initialState, init)

  	// Save state to localStorage whenever it changes
	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
	}, [state])

	return (
		<DFContext.Provider value={{ state, dispatch }}>
			{children}
		</DFContext.Provider>
	)
}

export default DFProvider
