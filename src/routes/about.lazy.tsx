import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <>
      <div className="flex flex-col justify-start items-start">
        <h1 className="text-2xl font-bold my-4">About Dropfilter</h1>
        <p className="text-sm text-gray-500">
          Dropfilter is a tool that allows you to filter a list of domain names based on your own criteria.
        </p>
        <h2 className="text-xl font-bold my-4">How it works</h2>
        <p className="text-sm text-gray-500">
          Dropfilter works by using a list of keywords and a set of filters.
        </p>
        <h3 className="text-xl font-bold my-4">Configurable Filters</h3>
        <p className="text-sm text-gray-500 mb-2">
          Filters are used to filter the list of domain names based on your own criteria.
        </p>
        <ul className="list-disc list-inside">
          <li>
            <span className="font-bold">Keyword</span> - A keyword is a word that you want to filter for.
          </li>
          <li>
            <span className="font-bold">Extension</span> - A filter is the ending of a domain name.
          </li>
          <li>
            <span className="font-bold">Hyphens</span> - A filter is the presence of hyphens in a domain name.
          </li>
          <li>
            <span className="font-bold">Numbers</span> - A filter is the presence of numbers in a domain name.
          </li>
          <li>
            <span className="font-bold">IDN</span> - A filter is the presence of non-ASCII symbols such as emoji in a domain name.
          </li>
          <li>
            <span className="font-bold">Adult</span> - A filter is the presence of adult content in a domain name.
          </li>
          <li>
            <span className="font-bold">Length</span> - A filter is the length of a domain name.
          </li>
          <li>
            <span className="font-bold">Domain Hacks</span> - A filter that disables the extension filter, so that it can be used to identify domain hacks which are words or phrases that span the dot.
          </li>
        </ul>
      </div>
    </>
  )
}
