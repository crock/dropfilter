import React, { useContext } from "react"
import { DFContext, FilterActionTypes } from "../../store/"
import classNames from 'classnames'

const Extensions = () => {
	const { state, dispatch } = useContext(DFContext)

	const ModalLabel = () => {
		const selected = state.config.extensions.filter((ext) => ext.selected === true)

		return (
			<>
				{selected.length
					? `${selected.length} selected`
					: `None Selected`}
			</>
		)
	}

	return (
		<div className="flex flex-col my-2">
			<div className="flex flex-row flex-no-wrap justify-between items-center">
				<div className="w-full">
					<label className="block text-gray-700 dark:text-white text-xl font-bold font-heading mb-2">
						Extensions
						<span className="font-light text-base text-primary ml-2">
							<ModalLabel />
						</span>
					</label>
					<small className="block text-gray-500 dark:text-white text-xs font-normal font-body mb-2">
						Select specific extensions to filter. This does not
						apply when Domain Hacks is enabled.
					</small>
				</div>
			</div>

			<div className="w-full">
				<div style={{ maxHeight: 150, overflowY: "scroll" }} className="inline-flex flex-row flex-wrap justify-start items-start">
					{state.config.extensions.map((ext, index) => (
						<button
						key={ext.value}
						title={`${
							ext.selected ? "deselect" : "select"
						} ${ext.value} extension`}
						onClick={() => dispatch({ type: FilterActionTypes.toggleExtension, payload: index })}
						className={classNames(
							"text-xs rounded-sm shadow-sm m-1 cursor-pointer text-center focus:outline-none p-2",
							{
								"dark:bg-gray-700 bg-white dark:text-gray-400 text-black": !ext.selected,
								"bg-blue-600 text-white": ext.selected,
							}
						)}
					>
						{ext.value}
					</button>
					))}
				</div>
			</div>
		</div>
	)
}

export default Extensions
