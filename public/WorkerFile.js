function filterDomains(domains) {
    return domains
        .filter(that.is_proper_length, this)
        .filter(that.contains_hyphens, this)
        .filter(that.contains_numbers, this)
        .filter(that.is_select_tld, this)
        .filter(that.contains_keywords, this)
}

this.onmessage = (message) => {
    if (message.data.action == "FILTER") {
        that.config = message.data.config;
        this.postMessage(filterDomains(message.data.data))
    }
}

var that = {
    config: false,
    is_select_tld(domain) {
        if (!that.config.extensions.length || that.config.includeHacks)
            return true
        return (
            that.config.extensions.filter((ext) =>
                domain.toLowerCase().includes(ext)
            ).length > 0
        )
    },

    is_proper_length(domain) {
        const domainLength = domain.split(".")[0].length
        const lessThanCheck = domainLength <= that.config.domainLength[1]
        const greaterThanCheck = domainLength >= that.config.domainLength[0]
        return lessThanCheck && greaterThanCheck
    },

    contains_hyphens(domain) {
        return that.config.excludeHyphens ? !domain.includes("-") : true
    },

    contains_numbers(domain) {
        return that.config.excludeNumbers
            ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((num) => {
                return domain.includes(num.toString())
            }).length === 0
            : true
    },

    contains_keywords(domain) {
        if (!that.config.keywords.length) return true
        let name = domain.toLowerCase().split(".")[0]
        if (that.config.includeHacks) name = domain.replace(/\./g, "")
        return (
            that.config.keywords.filter((keyword) =>
                name.includes(keyword.toLowerCase())
            ).length > 0
        )
    }
}