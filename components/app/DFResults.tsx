import React, { useContext, useEffect, useState } from "react"
import { DFContext, FilterActionTypes } from "../../store/"
import LoadingSpinner from "../LoadingSpinner"
import { debounce } from "lodash"
import { formattedDate } from '../../utils/helpers'
import classNames from "classnames"
import axios from 'axios'

const DFResults = () => {
	const { state, dispatch } = useContext(DFContext)
	const [filtered, setFiltered] = useState([])
	const [loading, setLoading] = useState(true)

	const downloadUrl = () => {
		const searchParams = new URLSearchParams()
		searchParams.set('service', "snapnames")
		searchParams.set('filename', formattedDate("today") + ".txt")
		const qs = searchParams.toString()

		return `/api/droplist?${qs}`
	}

	const doRealtimeFilter = () => {
		setLoading(true)

		const filterConfig = {
			domainLength: state.config.domainLength,
			domainHacks: state.config.domainHacks,
			hyphens: state.config.hyphens,
			numbers: state.config.numbers,
			keywords: state.config.keywords.length ? state.config.keywords
				.filter((kw) => kw.selected) : [],
			extensions: state.config.extensions.length ? state.config.extensions
				.filter((ext) => ext.selected) : [],
		}


		axios({
			url: '/api/filter',
			method: 'POST',
			data: {
				config: filterConfig,
				service: "snapnames",
				filename: formattedDate("today") + ".txt"
			},
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		})
			.then(response => {
				setFiltered(response.data.domains)
				setLoading(false)
			})
			.catch(e => {
				console.error(e)
				setLoading(false)
			})


	}

	const isFavorite = (fqdn: string) => {
		return !!state.favorites.find((f) => f.fqdn === fqdn)
	}

	useEffect(debounce(doRealtimeFilter, 250), [
		state.config.domainLength,
		state.config.hyphens,
		state.config.numbers,
		state.config.domainHacks,
		state.config.keywords,
		state.config.extensions,
	])

	return (
		<div className="bg-white dark:bg-gray-800 shadow rounded-lg w-full h-auto flex p-4">
			{loading ? (
				<LoadingSpinner />
			) : (
				<div className="flex flex-col">

					<label className="block text-gray-700 dark:text-white text-xl font-bold mb-2">
						Results
						<span className="font-light text-base text-primary ml-2">
							{filtered.length}
							{` `}
							results
						</span>
					</label>
					<small className="block text-gray-500 dark:text-white text-xs font-light mb-2">
						These are your personalized results. To view the
						original, unfiltered list,{" "}
						<a href={downloadUrl()} target={`_blank`}>
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
										"bg-primary text-white bg-none border-none p-2 flex flex-row flex-nowrap items-center focus:outline-none flex-1"
									}
									title={`toggle ${d} as favorite`}
									onClick={() => dispatch({ type: FilterActionTypes.addFavorite, payload: { fqdn: d, drop_date_str: formattedDate("today") } })}
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
