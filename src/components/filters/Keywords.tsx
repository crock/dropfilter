import { useState, useContext } from "react"
import { DFContext, FilterActionTypes } from "../../store/"

const Keywords = () => {
	const { state, dispatch } = useContext(DFContext)
	const [keyword, setKeyword] = useState("")

	const onTyping = (event) => {
		const keywordEntered: string = event.target.value
			? event.target.value.trim().toLowerCase()
			: ""
		return keywordEntered !== "" ? setKeyword(keywordEntered) : false
	}

	const addKeyword = (event) => {
		if (keyword !== "") {
			dispatch({ type: FilterActionTypes.addKeyword, payload: keyword })
			setKeyword("")
		}
	}

	const handleKeyPress = (event) => {
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
					<label className="block text-gray-700 dark:text-gray-200 text-xl font-bold font-semibold mb-2">
						Keywords
						<span className="font-light text-base text-primary ml-2">
							<ModalLabel />
						</span>
					</label>
					<small className="block text-gray-500 dark:text-gray-400 text-xs font-normal font-normal mb-2">
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
								onKeyDown={handleKeyPress}
								value={keyword}
								className="form-input block w-full h-8 p-2 rounded-sm border border-gray-500 dark:border-gray-600 text-black dark:text-white dark:bg-gray-700 sm:text-sm sm:leading-5"
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
					className="bg-none border-none text-primary hover:text-primary/80 dark:text-primary/90 dark:hover:text-primary text-xs focus:outline-none inline-block mr-2"
					onClick={() => dispatch({ type: FilterActionTypes.removeDefaultKeywords, payload: null })}
					title="Remove default keywords"
				>
					Remove Defaults
				</button>
				<button
					className="bg-none border-none text-primary hover:text-primary/80 dark:text-primary/90 dark:hover:text-primary text-xs focus:outline-none inline-block"
					onClick={() => dispatch({ type: FilterActionTypes.restoreDefaultKeywords, payload: null })}
					title="Restore default keywords"
				>
					Restore Defaults
				</button>
				<div
					style={{ maxHeight: 150, overflowY: "scroll" }}
					className="flex flex-row flex-wrap items-start scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
				>
					<div className="flex flex-col justify-start items-center gap-2 my-4 w-full">
					{state.config.keywords.length ? state.config.keywords.map((kw, index) => (
						
						<div className="flex flex-row flex-nowrap justify-between items-center w-full">
							<div className="flex flex-row flex-nowrap justify-start items-center">
								<input onChange={() => dispatch({ type: FilterActionTypes.toggleKeyword, payload: index })} checked={kw.selected} type="checkbox" name="keyword-selected" id="keyword-selected" />
								<span>{kw.value}</span>
							</div>
							<div className="flex flex-row flex-nowrap justify-between items-center">
								<select value={kw.position} onChange={(e) => dispatch({ type: FilterActionTypes.setKeywordPosition, payload: { index, position: e.target.value } })} className="form-select block w-32 h-10 p-2 rounded-sm border border-gray-500 dark:border-gray-600 text-black dark:text-white dark:bg-gray-700 sm:text-sm sm:leading-5">
									<option value="start">Start</option>
									<option value="end">End</option>
									<option value="anywhere">Anywhere</option>
								</select>
								<button
									className="bg-none border-none ml-2 hover:opacity-80"
									onClick={() => dispatch({ type: FilterActionTypes.removeKeyword, payload: index })}
									title={`remove ${kw.value} keyword`}
								>
									<svg
										style={{ width: 16, height: 16 }}
										className="text-red-500 dark:text-red-400"
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
						</div>
					
					)) : null }
					</div>
				</div>
			</div>
		</div>
	)
}

export default Keywords
