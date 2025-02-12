import { useState } from "react"

interface DomainListInputProps {
  onDomainsAdded: (domains: string[], count: number) => void
}

const DomainListInput = ({ onDomainsAdded }: DomainListInputProps) => {
  const [domains, setDomains] = useState<string[]>([])

  const handleAddDomains = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const domainList = event.target.value.match(/([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}/gi)
    if (domainList) {
      const uniqueDomains = [...new Set(domainList)].map(domain => domain.toLowerCase())
      setDomains([...domains, ...uniqueDomains])
      onDomainsAdded(uniqueDomains, uniqueDomains.length)   
    }
  }

  return (
    <div className="flex flex-col my-4">
        <textarea onChange={handleAddDomains} className="w-full h-48 form-textarea text-black dark:text-white bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-700 border-solid p-4 rounded" cols={30} rows={10} placeholder="Paste domains here"></textarea>
    </div>
  )
}

export default DomainListInput
