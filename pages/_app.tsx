import "tailwindcss/tailwind.css"
import '../styles/globals.css'
import { AppProps } from 'next/app'
import { DFProvider } from '../store/'
import Header from '../components/Header'


function App({ Component, pageProps }: AppProps) {
  return (
    <DFProvider>
      <Header />
      <Component {...pageProps} />
    </DFProvider>
  )
}

export default App