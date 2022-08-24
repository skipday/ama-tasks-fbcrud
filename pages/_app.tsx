import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthContextProvider } from '../context/AuthContext'
import { Navbar } from '../components/Navbar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}

export default MyApp
