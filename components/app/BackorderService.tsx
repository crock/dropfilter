import React, { useContext } from "react"
import { DFContext, FilterActionTypes } from "../../store"
import useSWR from "swr"

const BackorderService = () => {
	const { state, dispatch } = useContext(DFContext)

	const fetcher = url => fetch(url).then(res => res.json())
	const { data: services, error } = useSWR(`/api/backorderServices`, fetcher)

	const changeAction = (event: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch({
			type: FilterActionTypes.backorderService,
			payload: event.target.value,
		})
	}

	return (
		<div className="my-2">
			<label className="block text-gray-700 dark:text-white text-xl font-bold font-semibold mb-2">
				Backorder Service
			</label>
			<small className="block text-gray-500 dark:text-white text-xs font-normal font-normal mb-2">
				Choose which backorder service&apos;s drop list to filter.
			</small>
			<select
				className="w-full text-black"
				value={state.config.backorderService}
				defaultValue="namejet"
				onChange={changeAction}
			>
				{ services && services.length ? (
					services.map((s) => (
						<option key={s.slug} value={s.slug}>
							{s.displayName}
						</option>
					))
				) : null }
			</select>
		</div>
	)
}

export default BackorderService
