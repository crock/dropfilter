import React from 'react'
import Img from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faGithub,
} from "@fortawesome/free-brands-svg-icons"

const Header = () => {


    return (
        <header className="fixed top-0 bg-blue-700 w-screen h-16 flex items-center z-40">
            <div className="container flex flex-row justify-between items-center px-4 mx-auto">
                <div className="flex flex-row flex-nowrap items-center">
                    <Img width={45} height={38} src={`/logo-icon.png`} alt={`dropfilter planet logo`} />
                    <div className="flex flex-col justify-center items-end ml-4">
                        <h1 className="font-black text-white text-2xl">Dropfilter</h1>
                    </div>
                </div>
                <nav className="flex flex-row flex-nowrap items-center justify-end flex-1">
                    <Link href="https://github.com/crock/dropfilter" className="flex flex-row flex-nowrap items-center text-sm text-white p-1 lg:p-4 hover:text-black">
                        <FontAwesomeIcon
                            icon={faGithub}
                            className="mr-2 w-4 h-auto"
                        />
                        <span className="hidden lg:inline-block">Contribute</span>
                    </Link>
                </nav>
            </div>
        </header>
    )
};

export default Header;