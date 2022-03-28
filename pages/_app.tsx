import 'antd/dist/antd.css';
import "tailwindcss/tailwind.css"
import '../styles/globals.css'
import { AppProps } from 'next/app'
import { DFProvider } from '../store/'
import Header from '../components/Header'
import TabBar from '../components/TabBar';

// Font Awesome
import { library, config } from "@fortawesome/fontawesome-svg-core"
import {
  faGithub,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons"
import { faHeart, faCog, faHourglass, faFilter } from "@fortawesome/pro-regular-svg-icons"

config.autoAddCss = false
library.add(faGithub, faDiscord, faHeart, faCog, faHourglass, faFilter)

function App({ Component, pageProps }: AppProps) {
  return (
    <DFProvider>
      <Header />
      <Component {...pageProps} />
      <TabBar />
    </DFProvider>
  )
}

export default App