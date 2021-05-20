import React, { useContext } from "react"
import classNames from "classnames"
import { DFContext, FilterActionTypes } from "../../store"

const HyphenToggle = () => {
	const { state, dispatch } = useContext(DFContext)

	const changeAction = (_event: any) => {
		dispatch({ type: FilterActionTypes.toggleHyphens, payload: null })
	}
	return (
		<div className="my-2 flex flex-row flex-no-wrap justify-between items-center">
			<div>
				<label className="block text-gray-700 dark:text-white text-xl font-bold font-heading mb-2">
					Exclude Hyphens
				</label>
				<small className="block text-gray-500 dark:text-white text-xs font-normal font-body mb-2">
					Remove domain names that contain hyphens from the results.
				</small>
			</div>
			{/* On: "bg-indigo-600", Off: "bg-gray-200" */}
			<span
				role="checkbox"
				tabIndex={0}
				onClick={changeAction}
				aria-checked={state.config.excludeHyphens}
				className={classNames(
					`bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline`,
					{
						"bg-blue-600": state.config.excludeHyphens,
						"bg-gray-200  dark:bg-gray-400": !state.config.excludeHyphens,
					}
				)}
			>
				{/* On: "translate-x-5", Off: "translate-x-0" */}
				<span
					aria-hidden="true"
					className={classNames(
						`translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200`,
						{
							"translate-x-5": state.config.excludeHyphens,
							"translate-x-0": !state.config.excludeHyphens,
						}
					)}
				></span>
			</span>
		</div>
	)
}

export default HyphenToggle
