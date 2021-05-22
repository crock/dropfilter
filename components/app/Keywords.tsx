import React, { useState, useContext } from "react"
import { DFContext, FilterActionTypes } from "../../store/"
import classNames from "classnames"

const Keywords = () => {
	const { state, dispatch } = useContext(DFContext)
	const [keyword, setKeyword] = useState("")

	const onTyping = (event: any) => {
		const keywordEntered: string = event.target.value
			? event.target.value.trim().toLowerCase()
			: ""
		return keywordEntered !== "" ? setKeyword(keywordEntered) : false
	}

	const addKeyword = (_event: any) => {
		if (keyword !== "") {
			dispatch({ type: FilterActionTypes.addKeyword, payload: keyword })
			setKeyword("")
		}
	}

	const handleKeyPress = (event: any) => {
		if (event.key === "Enter") {
			addKeyword(event)
		}
	}

	const ModalLabel = () => {
		const selected = state.config.keywords.filter((kw) => kw.selected === true)

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
						Keywords
						<span className="font-light text-base text-primary ml-2">
							<ModalLabel />
						</span>
					</label>
					<small className="block text-gray-500 dark:text-white text-xs font-normal font-body mb-2">
						If you don&apos;t select any keywords, you will not get
						results. Do not enter full domains.
					</small>
				</div>
			</div>
			<div className="w-full">
				<div className="flex flex-row flex-no-wrap justify-between items-center">
					<div className="flex-1">
						<label htmlFor="new_keyword" className="sr-only">
							New Keyword
						</label>
						<div className="relative rounded-md shadow-sm">
							<input
								id="new_keyword"
								onChange={onTyping}
								onKeyPress={handleKeyPress}
								value={keyword}
								className="form-input text-black block w-full h-8 p-2 rounded-sm border border-gray-500 sm:text-sm sm:leading-5"
								placeholder="Enter a new keyword..."
							/>
						</div>
					</div>
					<button
						onClick={addKeyword}
						className="border-none bg-none focus:outline-none p-3 text-lg"
						title="Add new keyword"
					>
						<svg
							style={{ width: 16, height: 16 }}
							className="text-primary"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</button>
				</div>
				<button
					className="bg-none border-none text-primary text-xs focus:outline-none inline-block mr-2"
					onClick={() => dispatch({ type: FilterActionTypes.removeDefaultKeywords, payload: null })}
					title="Remove default keywords"
				>
					Remove Defaults
				</button>
				<button
					className="bg-none border-none text-primary text-xs focus:outline-none inline-block"
					onClick={() => dispatch({ type: FilterActionTypes.restoreDefaultKeywords, payload: null })}
					title="Restore default keywords"
				>
					Restore Defaults
				</button>
				<div
					style={{ maxHeight: 150, overflowY: "scroll" }}
					className="flex flex-row flex-wrap items-start"
				>
					{state.config.keywords.length ? state.config.keywords.map((kw, index) => (
						<div
							key={kw.value}
							className={classNames(
								"text-xs rounded-sm shadow-sm m-1 cursor-pointer text-center focus:outline-none p-2 flex flex-row flex-no-wrap items-center w-auto justify-between",
								{
									"dark:bg-gray-700 bg-white": !kw.selected,
									"bg-primary": kw.selected,
								}
							)}
						>
							<button
								className={classNames(
									"bg-none border-none items-center focus:outline-none flex-1",
									{
										"dark:text-gray-400 text-black": !kw.selected,
										"text-white": kw.selected
									}
								)}
								title={`${
									kw.selected ? "deselect" : "select"
								} ${kw.value} keyword`}
								onClick={() => dispatch({ type: FilterActionTypes.toggleKeyword, payload: index })}
							>
								{kw.value}
							</button>
							<button
								className="bg-none border-none ml-2"
								onClick={() => dispatch({ type: FilterActionTypes.removeKeyword, payload: index })}
								title={`remove ${kw.value} keyword`}
							>
								<svg
									style={{ width: 16, height: 16 }}
									className="text-red-500"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
					)) : <p className="my-2 text-center font-light text-black dark:text-white">No keywords selected.</p> }
				</div>
			</div>
		</div>
	)
}

export default Keywords
