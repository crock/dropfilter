import React, { useContext, useEffect, useState } from "react"
import Head from 'next/head'
import { DFContext, FilterActionTypes } from "../store"
import {
	Results,
	Extensions,
	Keywords,
	DomainHacks,
	LengthSlider,
	HyphenToggle,
	NumberToggle,
} from '../components/app/'
import { IFavorite, IPreset } from "../store/context/DFContext"
import DomainQualityMeter from '../components/DomainQuaityMeter'
import { DFProvider } from '../store/'
import Header from '../components/Header'

const DropfilterPage = () => {
	const { state, dispatch } = useContext(DFContext)
	const [ domain, setDomain ] = useState('')

	const getListString = (list: any) => {
		if (list && list.length) {
			return list
				.map((l) => {
					if (l.selected) {
						return l.value
					}
				})
				.filter(Boolean)
				.join(", ")
		}
	}

	useEffect(() => {
		const data = window.localStorage.getItem('df_data')
		if (data) {
			const json = JSON.parse(data)
			dispatch({ type: FilterActionTypes.restoreConfiguration, payload: json })
		}
	}, [])

	useEffect(() => {
		window.localStorage.setItem('df_data', JSON.stringify(state))
	}, [state])

	return (
		<>
			<Head>
				<title>Dropfilter</title>
				<meta name="description" content="Filter expiring domain names easily" />
			</Head>
			<div className="container mx-auto px-4 py-24 w-full">
				<div className="grid grid-cols-1 md:grid-cols-12 gap-4">
					<div className="col-span-12 lg:col-span-8">
						<main>
						<div className="flex flex-col justify-start items-start w-full">
				<div className="flex flex-row justify-between items-center w-full">
					<div className="flex flex-col">
						<h1 className="block text-black dark:text-white text-5xl font-bold mb-2">
							Dropfilter
						</h1>
						<p className="block text-block dark:text-white text-base font-light">
							Filter Expiring Domain Names
						</p>
					</div>
					<button className="bg-primary hover:bg-primary-dark text-white font-semibold text-sm rounded shadow py-2 px-3" onClick={() => dispatch({type: FilterActionTypes.addPreset, payload: { config: state.config }})}>Save Preset</button>
				</div>


				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
					<div className="bg-white dark:bg-gray-800 rounded shadow p-4">
						<h4 className="font-bold text-lg mt-0 text-black dark:text-white">
							About Dropfilter
						</h4>
						<p className="leading-6 font-normal text-black dark:text-white">
							Dropfilter is the tool every domain name investor
							needs. You can filter lists of hundreds of thousands
							of domain names expiring every single day from all
							the most popular backorder services. Makes it super
							simple to find what exactly you want the moment you
							need it!
						</p>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded shadow p-4">
						<h4 className="font-bold text-lg mt-0 text-black dark:text-white">
							What is drop-catching?
						</h4>
						<p className="leading-6 font-normal text-black dark:text-white">
							Domain drop catching, also known as domain sniping,
							is the practice of registering a domain name once
							registration has lapsed, immediately after expiry.
						</p>
					</div>
				</div>

				<div className="flex flex-col mb-4">
					<Results />
					<div className="bg-white dark:bg-gray-800 p-4 rounded shadow my-4">
						<input type="text" className="form-input w-full text-black" placeholder={'example.com'} onChange={e => setDomain(e.target.value)} />
						<DomainQualityMeter domainName={domain} />
					</div>
				</div>

				<div className="flex flex-col lg:flex-row flex-nowrap justify-between items-start w-full">
					<div className="w-full">
						<div className="mb-2">
							<h2 className="block text-black dark:text-white text-3xl font-bold mb-2">
								Favorites
							</h2>
							<p className="block text-block dark:text-white text-base font-light mb-4">
								Your personal collection of expiring domains that you like.
							</p>
							<div className="flex flex-col w-full">
							{state.favorites.length
						? state.favorites.map((fav: IFavorite, index: number) => (
							<div key={index} className="block bg-white dark:bg-gray-800 p-1 shadow-sm rounded-sm relative my-1 w-full">
									<strong className="font-mono">{fav.fqdn}</strong>
									<div className="text-xs block">
										<span className="mr-2">{fav.drop_date_str}</span>
										<a href={`https://domainr.com/${fav.fqdn}`} target={`_blank`}>
											Check Availability
										</a>
									</div>
									<button
										onClick={(e) =>
											dispatch({type: FilterActionTypes.removeFavorite, payload: fav})
										}
										title="Remove from favorites"
										className="absolute top-4 right-4 text-red-500"
									>
										<svg
											style={{
												width: 16,
												height: "auto",
											}}
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
											/>
										</svg>
									</button>
							</div>
						  ))
						: null }
							</div>
						</div>
						<div>

						</div>
					</div>
					<div className="w-full lg:ml-4">
							<h2 className="block text-black dark:text-white text-3xl font-bold mb-2">
								Presets / Saved Searches
							</h2>
							<p className="block text-block dark:text-white text-base font-light mb-4">
								Your personal collection of saved configuration presets
							</p>
						<div className="flex flex-col w-full">
						{ state.presets.length
						? state.presets.map((pre: IPreset, index: number) => (
								<div
									key={index}
									className="block bg-white dark:bg-gray-800 p-2 shadow rounded relative my-1 w-full"
								>
									<div>
										<div>
											<strong>Domain Hacks:</strong>{" "}
											{pre.config?.domainHacks?.toString()}
										</div>
										<div>
											<strong>Hyphens:</strong>{" "}
											{pre.config?.hyphens?.toString()}
										</div>
										<div>
											<strong>Numeric:</strong>{" "}
											{pre.config?.numbers?.toString()}
										</div>
										<div>
											<strong>Min. Domain Length:</strong>{" "}
											{pre.config?.domainLength[0]}
										</div>
										<div>
											<strong>Max. Domain Length:</strong>{" "}
											{pre.config?.domainLength[1]}
										</div>
										<div>
											<strong>Extensions:</strong>{" "}
											{getListString(
												pre.config?.extensions
											)}
										</div>
										<div>
											<strong>Keywords:</strong>{" "}
											{getListString(
												pre.config?.keywords
											)}
										</div>
									</div>
									<button
										onClick={(e) => dispatch({type: FilterActionTypes.loadPreset, payload: pre})}
										title="Activate and run this preset now"
										className="block mt-3 py-2 px-4 bg-primary hover:bg-primary-dark text-white rounded"
									>
										Load Preset
									</button>
									<button
										onClick={(e) => dispatch({type: FilterActionTypes.removePreset, payload: pre})}
										title="Delete preset"
										className="absolute top-4 right-4 text-red-500"
									>
										<svg
											style={{
												width: 24,
												height: "auto",
											}}
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
											/>
										</svg>
									</button>
								</div>
						  ))
						: null}
						</div>
					</div>

				</div>
			</div>
						</main>
					</div>
					<div className="col-span-12 lg:col-span-4">
						<aside className="w-full h-full">
							<h2 className="font-bold text-3xl text-black dark:text-white mb-2">
								Filters
							</h2>
							<p className="block text-block dark:text-white text-base font-light">
								Try these custom filters to help you find the results
								you want.
							</p>
							<Keywords />
							<Extensions />
							<DomainHacks />
							<HyphenToggle />
							<NumberToggle />
							<LengthSlider />
						</aside>
					</div>
				</div>
			</div>
		</>
	)
}

DropfilterPage.getLayout = function getLayout(page) {
	return (
		<DFProvider>
			<Header />
			{page}
		</DFProvider>
	)
  }

export default DropfilterPage
