import React, { useContext } from "react"
import { DFContext, FilterActionTypes } from "../../store"

const DropDate = () => {
	const { state, dispatch } = useContext(DFContext)

	const changeAction = (event: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch({
			type: FilterActionTypes.dropDate,
			payload: event.target.value,
		})
	}

	return (
		<div className="my-2">
			<label className="block text-gray-700 dark:text-white text-xl font-bold font-semibold mb-2">
				Drop Date
			</label>
			<small className="block text-gray-500 dark:text-white text-xs font-normal font-normal mb-2">
				Choose the target expiration date you want to filter domains
				for.
			</small>
			<select
				className="w-full text-black"
				value={state.config.dropDate}
				defaultValue="today"
				onChange={changeAction}
			>
				<option value="yesterday">Yesterday</option>
				<option value="today">Today</option>
				<option value="tomorrow">Tomorrow</option>
			</select>
		</div>
	)
}

export default DropDate
