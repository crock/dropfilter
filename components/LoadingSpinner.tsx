import React from "react"
import Img from 'next/image'

const LoadingSpinner = () => {
	return (
		<div className="flex flex-col justify-center items-center">
			<Img layout={'fixed'} width={100} height={100} src={"/loading.gif"} alt="loading spinner" />
		</div>
	)
}

export default LoadingSpinner
