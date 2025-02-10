import React, { useContext } from "react"
import classNames from "classnames"
import { DFContext, FilterActionTypes } from "../../store"

const DomainHacks = () => {
	const { state, dispatch } = useContext(DFContext)

	const changeAction = (_event: any) => {
		dispatch({ type: FilterActionTypes.toggleHacks, payload: null })
	}
	return (
		<div className="my-2 flex flex-row flex-no-wrap justify-between items-center">
			<div>
				<label className="block text-gray-700 dark:text-gray-200 text-xl font-bold mb-2">
					Domain Hacks
				</label>
				<small className="block text-gray-500 dark:text-gray-400 text-xs font-light mb-2">
					Include the extension when matching keywords. Note this
					option returns regular matching domains as well since domain
					hacks are rare.
				</small>
			</div>
			<span
				role="checkbox"
				tabIndex={0}
				onClick={changeAction}
				aria-checked={state.config.domainHacks}
				className={classNames(
					`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline`,
					{
						"bg-primary": state.config.domainHacks,
						"bg-gray-200 dark:bg-gray-700": !state.config.domainHacks,
					}
				)}
			>
				<span
					aria-hidden="true"
					className={classNames(
						`translate-x-0 inline-block h-5 w-5 rounded-full bg-white dark:bg-gray-200 shadow transform transition ease-in-out duration-200`,
						{
							"translate-x-5": state.config.domainHacks,
							"translate-x-0": !state.config.domainHacks,
						}
					)}
				></span>
			</span>
		</div>
	)
}

export default DomainHacks
