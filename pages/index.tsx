import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import { initSystem} from "./api/lib"

interface IData {
  pong: string
}

export default function Home() {

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IData>({
    pong: ''
  })
  const [error, setError] = useState()

  const toggleValve = (active = true) => {
    console.log(active)
    fetch(`/api/valve?open=${active}`).then(res => res.json()).then(data => setData(data))
  }

  const load = async () => {
    try {
      setLoading(true)

      fetch('/api/valve').then(res => res.json()).then(data => setData(data))
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetch('/api/init')
    load()
  }, [])


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading && (
        <h2>loading</h2>
      )}

      {!loading && Object.keys(data).length > 0 ? (
        <div>{data.pong}</div>
      ) : (
          <div>Something went wrong</div>
      )}
      
      <button onClick={() => {
        toggleValve()
      }}>

        Toggle
      </button>

    </div>
  )
}
