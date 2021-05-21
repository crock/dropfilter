import React from 'react'
import Img from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default () => {


    return (
        <header className="fixed top-0 bg-blue-700 w-screen h-16 flex items-center z-40">
            <div className="container flex flex-row justify-between items-center px-4 mx-auto">
                <div className="flex flex-row flex-nowrap items-center">
                    <Img layout={`fixed`} width={45} height={38} src={`/logo-icon.png`} alt={`domaincord planet logo`} />
                    <div className="flex flex-col justify-center items-end ml-2">
                        <h1 className="font-display text-white text-2xl">Dropfilter</h1>
                        <span className="font-semibold text-white text-xs">by Domaincord</span>
                    </div>
                </div>
                <nav className="flex flex-row flex-nowrap items-center justify-end flex-1">
                    <Link href="https://www.buymeacoffee.com/croc">
                        <a className="flex flex-row flex-nowrap items-center text-sm text-white p-1 lg:p-4 hover:text-red-500">
                            <FontAwesomeIcon
                                icon={[`far`, `heart`]}
                                className="mr-2 w-4 h-auto"
                            />
                           <span className="hidden lg:inline-block">Support Me</span>
                        </a>
                    </Link>
                    <Link href="https://github.com/domaincord/dropfilter">
                        <a className="flex flex-row flex-nowrap items-center text-sm text-white p-1 lg:p-4 hover:text-black">
                            <FontAwesomeIcon
                                icon={[`fab`, `github`]}
                                className="mr-2 w-4 h-auto"
                            />
                            <span className="hidden lg:inline-block">Contribute</span>
                        </a>
                    </Link>
                    <Link href="https://dc.link/discord">
                        <a className="flex flex-row flex-nowrap items-center text-sm text-white p-1 lg:p-4 hover:text-discord-light">
                            <FontAwesomeIcon
                                icon={[`fab`, `discord`]}
                                className="mr-2 w-4 h-auto"
                            />
                            <span className="hidden lg:inline-block">Join the Discord</span>
                        </a>
                    </Link>
                </nav>
            </div>
        </header>
    )
}