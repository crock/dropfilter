import React from 'react'
import Link from './Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TabBar = () => {


    return (
        <nav className="fixed bottom-0 bg-white shadow-lg w-screen h-16 flex place-items-center items-center z-40">
            <div className="container mx-auto h-full">
                <ul className="flex flex-row flex-nowrap justify-evenly items-center list-none mt-0 h-full">
                    <li className="inline-flex">
                        <Link to="/filter" className="px-4 flex flex-col justify-center items-center text-sm text-black dark:text-white hover:text-primary" activeClassName="text-primary">
                            <FontAwesomeIcon
                                icon={[`far`, `filter`]}
                                size={'2x'}
                                className="mb-2 w-5 h-auto"
                            />
                            <span className="text-center">Filter</span>
                        </Link>
                    </li>

                    <li className="inline-flex">
                        <Link to="/presets" className="px-4 flex flex-col justify-center items-center text-sm text-black dark:text-white hover:text-primary" activeClassName="text-primary">
                            <FontAwesomeIcon
                                icon={[`far`, `cog`]}
                                size={'2x'}
                                className="mb-2 w-5 h-auto"
                            />
                            <span className="text-center">Presets</span>
                        </Link>
                    </li>

                    <li className="inline-flex">
                        <Link to="/favorites" className="px-4 flex flex-col justify-center items-center text-sm text-black dark:text-white hover:text-primary" activeClassName="text-primary">
                            <FontAwesomeIcon
                                icon={[`far`, `heart`]}
                                size={'2x'}
                                className="mb-2 w-5 h-auto"
                            />
                            <span className="text-center">Favorites</span>
                        </Link>
                    </li>

                    <li className="inline-flex">
                        <Link to="/history" className="px-4 flex flex-col justify-center items-center text-sm text-black dark:text-white hover:text-primary" activeClassName="text-primary">
                            <FontAwesomeIcon
                                icon={[`far`, `hourglass`]}
                                size={'2x'}
                                className="mb-2 w-4 h-auto"
                            />
                            <span className="text-center">History</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
};

export default TabBar;