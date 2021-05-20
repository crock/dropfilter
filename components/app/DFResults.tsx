import React, { useContext, useEffect, useState } from "react"
import { DFContext, FilterActionTypes } from "../../store/"
import DomainFilter from "../../utils/DomainFilter"
import LoadingSpinner from "../LoadingSpinner"
import { debounce } from "lodash"
import { formattedDate } from '../../utils/helpers'
import classNames from "classnames"
import useSWR from "swr"

const DFResults = () => {
	const { state, dispatch } = useContext(DFContext)
	const [numFiltered, setNumFiltered] = useState(0)
	const [filtered, setFiltered] = useState([])
	const [loading, setLoading] = useState(true)
	const [unfiltered, setUnfiltered] = useState([])

	const downloadUrl = process.env.NODE_ENV === 'production' 
		? `/lists/${state.config.backorderService}/${formattedDate(state.config.dropDate)}.txt`
		: `/api/droplist/${state.config.backorderService}/${formattedDate(state.config.dropDate)}.txt`

	const fetcher = url => fetch(url).then(res => res.text())
	const { data, error } = useSWR(downloadUrl, fetcher)

	const getFilteredData = () => {
		if (!state.config.keywords.length || !state.config.extensions.length) {
			setFiltered([])
			setNumFiltered(0)
			return
		}
		if (error) {
			console.error('Could not fetch drop list')
			return
		}

		const df = new DomainFilter({
			domainLength: state.config.domainLength,
			includeHacks: state.config.includeHacks,
			excludeHyphens: state.config.excludeHyphens,
			excludeNumbers: state.config.excludeNumbers,
			keywords: state.config.keywords.length ? state.config.keywords
				.filter((kw) => kw.selected)
				.map((kw) => kw.value) : [],
			extensions: state.config.extensions.length ? state.config.extensions
				.filter((ext) => ext.selected)
				.map((ext) => ext.value) : [],
		})

		if (!loading) {
			const list = df.filter(unfiltered)
			setNumFiltered(list.length)
			setFiltered(list)
		}
	}

	const isFavorite = (fqdn: string) => {
		return !!state.favorites.find((f) => f.fqdn === fqdn)
	}

	useEffect(debounce(getFilteredData, 100), [
		loading,
		downloadUrl,
		state.config.backorderService,
		state.config.dropDate,
		state.config.domainLength,
		state.config.excludeHyphens,
		state.config.excludeNumbers,
		state.config.includeHacks,
		state.config.keywords,
		state.config.extensions,
	])

	useEffect(() => {
		if (data) {
			const unfiltered = data.split("\n").filter(Boolean)
			setUnfiltered(unfiltered)
			setLoading(false)
		}
	},[data])

	return (
		<div className="bg-white dark:bg-gray-800 shadow rounded-lg w-full h-auto flex p-4">
			{loading ? (
				<LoadingSpinner />
			) : (
				<div className="flex flex-col">
					
					<label className="block text-gray-700 dark:text-white text-xl font-bold font-heading mb-2">
						Results
						<span className="font-light text-base text-primary ml-2">
							{numFiltered}
							{` `}
							results
						</span>
					</label>
					<small className="block text-gray-500 dark:text-white text-xs font-normal font-body mb-2">
						These are your personalized results. To view the
						original, unfiltered list,{" "}
						<a href={downloadUrl} target={`_blank`}>
							click here
						</a>
						.
					</small>
					<div
						style={{ maxHeight: 400, overflowY: "scroll" }}
						className="flex flex-row flex-wrap items-start"
					>
						{filtered.map((d, index) => (
							<div
								key={d}
								className={
									"dark:bg-gray-700 bg-white m-1 cursor-pointer flex flex-row flex-no-wrap items-center w-auto justify-between"
								}
							>
								<button
									className={
										"bg-blue-600 text-white bg-none border-none p-2 flex flex-row flex-nowrap items-center focus:outline-none flex-1"
									}
									title={`toggle ${d} as favorite`}
									onClick={() => dispatch({type: FilterActionTypes.addFavorite, payload: { fqdn: d, drop_date_str: formattedDate(state.config.dropDate) }})}
								>
									<span>{d}</span>

									<svg
										className={
											classNames("ml-2", {
												"opacity-30": !isFavorite(d)
											})
										}
										style={{ width: 16, height: 16 }}
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill={
											isFavorite(d)
												? "yellow"
												: "currentColor"
										}
									>
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
									</svg>
								</button>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default DFResults
