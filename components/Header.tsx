import React from 'react'
import Img from 'next/image'

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
            </div>
        </header>
    )
}