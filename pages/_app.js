import '@/styles/globals.css'
import Layout from '@/components/common/Layout';
import { useEffect, useState } from 'react'
import { AppContext } from '@/components/AppContext';



export default function App({ Component, pageProps }) {
  const [context, setContext] = useState(null)
  return <AppContext.Provider value={{ context, setContext }}>
    {<Component {...pageProps} />}
  </AppContext.Provider >
}
