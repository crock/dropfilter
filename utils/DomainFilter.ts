export interface IExtension {
	value: string
	selected: boolean
}

export interface IKeyword {
	value: string
	selected: boolean
}

export interface IFilterConfig {
	domainLength: number[]
	excludeHyphens: boolean
	excludeNumbers: boolean
	includeHacks: boolean
	extensions: string[]
	keywords: string[]
}

export const defaultConfig: IFilterConfig = {
	domainLength: [1, 63],
	excludeHyphens: true,
	excludeNumbers: true,
	extensions: [],
	includeHacks: false,
	keywords: [],
}

class DomainFilter {
	config: IFilterConfig = { ...defaultConfig }

	constructor(partialConfig?: Partial<IFilterConfig>) {
		if (partialConfig) this.updateConfig(partialConfig)
	}

	updateConfig(partialConfig: Partial<IFilterConfig>) {
		Object.assign(this.config, partialConfig)
	}

	resetConfig() {
		this.config = { ...defaultConfig }
	}

	is_select_tld(domain: string) {
		if (!this.config.extensions.length || this.config.includeHacks)
			return true
		return (
			this.config.extensions.filter((ext) =>
				domain.toLowerCase().includes(ext)
			).length > 0
		)
	}

	is_proper_length(domain: string) {
		const domainLength = domain.split(".")[0].length
		const lessThanCheck = domainLength <= this.config.domainLength[1]
		const greaterThanCheck = domainLength >= this.config.domainLength[0]
		return lessThanCheck && greaterThanCheck
	}

	contains_hyphens(domain: string) {
		return this.config.excludeHyphens ? !domain.includes("-") : true
	}

	contains_numbers(domain: string) {
		return this.config.excludeNumbers
			? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((num) => {
					return domain.includes(num.toString())
			  }).length === 0
			: true
	}

	contains_keywords(domain: string) {
		if (!this.config.keywords.length) return true
		let name = domain.toLowerCase().split(".")[0]
		if (this.config.includeHacks) name = domain.replace(/\./g, "")
		return (
			this.config.keywords.filter((keyword) =>
				name.includes(keyword.toLowerCase())
			).length > 0
		)
	}

	filter(domains: string[]) {
		return domains
			.filter(this.is_proper_length, this)
			.filter(this.contains_hyphens, this)
			.filter(this.contains_numbers, this)
			.filter(this.is_select_tld, this)
			.filter(this.contains_keywords, this)

	}
}

export default DomainFilter