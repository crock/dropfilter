import React, { useContext } from "react"
import { DFContext, FilterActionTypes } from "../../store"

const OutputType = () => {
	const { state, dispatch } = useContext(DFContext)

	const changeAction = (event: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch({
			type: FilterActionTypes.outputType,
			payload: event.target.value,
		})
	}

	return (
		<div className="p-4">
			<label className="block text-gray-700 dark:text-white text-xl font-bold font-heading mb-2">
				Output Type
			</label>
			<small className="block text-gray-500 dark:text-white text-xs font-normal font-body mb-2">
				You can either run the tool right on the web or generate a
				configuration for our Discord bot command or Python CLI.
			</small>
			<select
				className="w-full"
				value={state.config.outputType}
				defaultValue="web"
				onChange={changeAction}
			>
				<option value="web">Web App</option>
				<option value="bot" disabled>
					Discord Bot (Being re-worked)
				</option>
				<option value="cli" disabled>
					Python CLI (Coming Soon)
				</option>
				<option value="raw" disabled>
					RAW Config
				</option>
				<option value="raw_legacy" disabled>
					Legacy Config
				</option>
			</select>
		</div>
	)
}

export default OutputType
