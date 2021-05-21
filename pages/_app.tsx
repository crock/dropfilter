import "tailwindcss/tailwind.css"
import '../styles/globals.css'
import { AppProps } from 'next/app'
import { DFProvider } from '../store/'
import Header from '../components/Header'

// Font Awesome
import { library, config } from "@fortawesome/fontawesome-svg-core"
import {
  faGithub,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons"
import { faHeart } from "@fortawesome/pro-regular-svg-icons"

config.autoAddCss = false
library.add(faGithub, faDiscord, faHeart)

function App({ Component, pageProps }: AppProps) {
  return (
    <DFProvider>
      <Header />
      <Component {...pageProps} />
    </DFProvider>
  )
}

export default App