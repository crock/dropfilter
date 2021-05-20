import React, { useEffect, useState, useContext } from "react"
import { Slider, Handles, Tracks, Rail, Ticks } from "react-compound-slider"
import { SliderRail, Handle, Track, Tick } from "../form/"
import { DFContext, FilterActionTypes } from "../../store"

const sliderStyle = {
	position: "relative",
	width: "100%",
}

const domain = [1, 63]

const LengthSlider = () => {
	const { state, dispatch } = useContext(DFContext)
	const [values, setValues] = useState([7, 15])
	const [kVals, setkVals] = useState([0, 0])

	const onUpdate = (update: ReadonlyArray<number>) => {
		const [min, max] = update
		const kmin =
			state.config.keywords.length > 0
				? state.config.keywords
						.map((k) => k.value.length)
						.reduce((l, m) => Math.min(l, m), 63)
				: 0
		const kmax =
			state.config.keywords.length > 0
				? state.config.keywords
						.map((k) => k.value.length)
						.reduce((l, m) => Math.max(l, m), 1)
				: 0
		setkVals([kmin, kmax])
		setValues([min <= kmin ? kmin + 1 : min, max < kmax ? kmax + 1 : max])
	}

	const onChange = (vals: ReadonlyArray<number>) => {
		dispatch({ type: FilterActionTypes.domainLength, payload: vals })
	}

	const restoreLengthValues = () => {
		const [min, max] = state.config.domainLength
		const kmin =
			state.config.keywords.length > 0
				? state.config.keywords
						.map((k) => k.value.length)
						.reduce((l, m) => Math.min(l, m), 63)
				: 0
		const kmax =
			state.config.keywords.length > 0
				? state.config.keywords
						.map((k) => k.value.length)
						.reduce((l, m) => Math.max(l, m), 1)
				: 0
		setkVals([kmin, kmax])
		setValues([min <= kmin ? kmin + 1 : min, max < kmax ? kmax + 1 : max])
	}

	useEffect(restoreLengthValues, [state.config.domainLength])

	return (
		<div className="mt-2 mb-20">
			<label className="block text-gray-700 dark:text-white text-xl font-bold font-heading mb-2">
				Length
				<span className="p-3">
					<span className="text-sm mr-3">
						<span className="text-black dark:text-white font-bold font-body">
							Min:{" "}
						</span>
						<span className="text-primary">{values[0]}</span>
					</span>
					<span className="text-sm mr-3">
						<span className="text-black dark:text-white font-bold font-body">
							Max:{" "}
						</span>
						<span className="text-primary">{values[1]}</span>
					</span>
				</span>
			</label>
			<p>
				<span className="text-sm mr-3">
					<span className="text-black dark:text-white font-bold font-body">
						Smallest Keyword:{" "}
					</span>
					<span className="text-primary">{kVals[0]}</span>
				</span>
				<span className="text-sm mr-3">
					<span className="text-black dark:text-white font-bold font-body">
						Largest Keyword:{" "}
					</span>
					<span className="text-primary">{kVals[1]}</span>
				</span>
			</p>
			<small className="block text-gray-500 dark:text-white text-xs font-normal font-body mb-2">
				Does not include extension or dots in length calculation.
			</small>
			<Slider
				className="mt-6"
				mode={2}
				step={1}
				domain={domain}
				rootStyle={sliderStyle}
				onUpdate={onUpdate}
				onChange={onChange}
				values={state.config.domainLength}
			>
				<Rail>
					{({ getRailProps }) => (
						<SliderRail getRailProps={getRailProps} />
					)}
				</Rail>
				<Handles>
					{({ handles, getHandleProps }) => (
						<div className="slider-handles">
							{handles.map((handle) => (
								<Handle
									key={handle.id}
									handle={handle}
									domain={domain}
									getHandleProps={getHandleProps}
								/>
							))}
						</div>
					)}
				</Handles>
				<Tracks left={false} right={false}>
					{({ tracks, getTrackProps }) => (
						<div className="slider-tracks">
							{tracks.map(({ id, source, target }) => (
								<Track
									key={id}
									source={source}
									target={target}
									getTrackProps={getTrackProps}
								/>
							))}
						</div>
					)}
				</Tracks>
				<Ticks count={10}>
					{({ ticks }) => (
						<div className="slider-ticks dark:bg-white dark:text-white">
							{ticks.map((tick) => (
								<Tick
									key={tick.id}
									tick={tick}
									count={ticks.length}
								/>
							))}
						</div>
					)}
				</Ticks>
			</Slider>
		</div>
	)
}

export default LengthSlider
