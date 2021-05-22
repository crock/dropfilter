import React, { useState, useEffect } from "react"
import styled from "styled-components"

/**
 * Domain Quality Criteria
 *
 * - domain length
 * - if the domain has hyphens or not
 * - if the domain has numbers or not
 * - if the domain is using a common tld/extension
 * - if the domain has special characters/punycode/idn
 * - if the domain has any dictionary words in it
 */
interface IDomainQualityMeter {
	domainName: string
}

const DomainQualityMeter = ({ domainName }: IDomainQualityMeter) => {
	const [quality, setQuality] = useState<
		undefined | { score: number; color: string }
	>(undefined)

	const calculateQuality = () => {
		let points = 0

		if (!domainName) return setQuality(undefined)
		let parts = domainName.split(".")
		if (!parts.length) return setQuality(undefined)
		if (parts && parts.length > 2) parts = [parts[0], parts[1]]

		const [name, tld] = parts
		const hasHyphens = domainName.includes("-")
		const hasNumbers = !!domainName.match(/\d/)
		const hasCommonTld = !!domainName.match(/\.(com|net|org|io)/)

		if (name) {
			if (name.length <= 3) {
				points += 15
			} else if (name.length <= 5) {
				points += 10
			} else if (name.length <= 10) {
				points += 5
			} else if (name.length <= 15) {
				points += 2
			} else if (name.length <= 20) {
				points += 1
			} else if (name.length <= 25) {
				points -= 25
			} else {
				// any name that is over 25 characters
				points -= 50
			}
		}

		if (tld) {
			if (tld.length <= 3) {
				points += 10
			} else {
				points += 5
			}
		}

		if (hasHyphens) {
			points += 15
		} else {
			points += 25
		}

		if (hasNumbers) {
			points += 5
		} else {
			points += 25
		}

		if (hasCommonTld) {
			points += 25
		} else {
			points += 5
		}

		const score = Math.round(points) / 100
		let color = ""

		if (score < 0.3) {
			color = "poor"
		} else if (score < 0.6) {
			color = "fair"
		} else if (score < 0.9) {
			color = "average"
		} else if (score < 1) {
			color = "good"
		} else {
			color = "excellent"
		}

		setQuality({ score, color })
	}
	useEffect(calculateQuality, [domainName])

	const InnerBar = styled.div`
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
	`

	const bgColorLookup = {
		poor: "bg-range-poor",
		fair: "bg-range-fair",
		average: "bg-range-average",
		good: "bg-range-good",
		excellent: "bg-range-excellent",
	}

	const textColorLookup = {
		poor: "text-range-poor",
		fair: "text-range-fair",
		average: "text-range-average",
		good: "text-range-good",
		excellent: "text-range-excellent",
	}

	return (
		<div className="flex flex-col">
			<h3 className="font-bold text-black dark:text-white text-lg my-2">
				Domain Analysis
			</h3>
			<div className="text-black dark:text-white">
				<strong>
					Score:{" "}
					<span
						className={
							quality ? textColorLookup[quality.color] : ""
						}
					>
						{quality
							? `${Math.round(quality.score * 100)}%`
							: "N/A"}
					</span>
				</strong>
			</div>
			<p className="w-3/4 font-light text-black dark:text-white text-base leading-6">
				This is not a precise measure of monetary domain value, but more
				or less, domain quality. We don&apos;t provide an actual
				monetary value as we feel automated appraisals generally fall
				short or miss the mark completely.
			</p>
			<div className="w-3/4 h-6 bg-gray-300 mt-4 relative">
				<InnerBar
					className={`transition-width transition-colors ease-in duration-1000 ${
						quality ? bgColorLookup[quality.color] : "transparent"
					}`}
					style={{
						width: `${
							quality ? Math.round(quality.score * 100) : 0
						}%`,
					}}
				/>
			</div>
		</div>
	)
}

export default DomainQualityMeter
