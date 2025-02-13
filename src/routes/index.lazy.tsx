import { useState, useContext } from 'react'
import {
  Extensions,
  Keywords,
  DomainHacks,
  LengthSlider,
  HyphenToggle,
  NumberToggle,
} from '@/components/filters/'
import DomainQualityMeter from '@/components/DomainQuaityMeter'
import Results from '@/components/DFResults'
import { createLazyFileRoute } from '@tanstack/react-router'
import DomainListInput from '@/components/DomainListInput'
import { DFContext, FilterActionTypes } from '@/store/'

export const Route = createLazyFileRoute('/')({
  component: Page,
})

function Page() {
  const { state, dispatch } = useContext(DFContext)
  const [domain, setDomain] = useState('')

  const handleDomainsAdded = (domains: string[], count: number) => {
    dispatch({ type: FilterActionTypes.addUnfilteredDomains, payload: domains })
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-4">
          <div className="w-full h-full bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-700 border-solid p-4 rounded">
            <h2 className="font-bold text-3xl text-black dark:text-white mb-2">
              Filters
            </h2>
            <p className="block text-gray-600 dark:text-gray-300 text-base font-light mb-4">
              Try these custom filters to help you find the results you want.
            </p>
            <Keywords />
            <Extensions />
            <DomainHacks />
            <HyphenToggle />
            <NumberToggle />
            <LengthSlider />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-8">
          <div className="flex flex-col justify-start items-start w-full">
            <div className="flex flex-col mb-4 w-full">
              <section className="w-full">
                <h2 className="font-bold text-3xl text-black dark:text-white mb-2">Domain List Input</h2>
                <p className="block text-gray-600 dark:text-gray-300 text-base font-light mb-4">
                  Paste a plain text list of domains, CSV, JSON, or even HTML into the text area below and we'll extract the domains for you and allow you to filter them.
                </p>
                <h3 className="font-bold text-xl text-black dark:text-white mb-2">Where to find lists of expiring and auction domains</h3>
                <ul>
                  <li>
                    <a className="text-primary hover:text-primary-light" href="https://namejet.com/download.action?format=csv" target="_blank" rel="noopener noreferrer">NameJet</a>
                  </li>
                  <li>
                    <a className="text-primary hover:text-primary-light" href="https://snapnames.com/download.action?format=csv" target="_blank" rel="noopener noreferrer">SnapNames</a>
                  </li>
                  <li>
                    <a className="text-primary hover:text-primary-light" href="https://www.dropcatch.com/downloads" target="_blank" rel="noopener noreferrer">DropCatch</a>
                  </li>
                  <li>
                    <a className="text-primary hover:text-primary-light" href="https://inventory.auctions.godaddy.com/" target="_blank" rel="noopener noreferrer">GoDaddy Auctions Inventory</a>
                  </li>
                </ul>
                <DomainListInput onDomainsAdded={handleDomainsAdded} />
              </section>
              <Results />
              <div className="bg-white dark:bg-gray-800 p-4 rounded border-2 border-black dark:border-gray-700 border-solid my-4">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-black dark:text-white dark:bg-gray-700"
                  placeholder={'example.com'}
                  onChange={(e) => setDomain(e.target.value)}
                />
                <DomainQualityMeter domainName={domain} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
