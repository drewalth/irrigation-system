import { useState, useEffect } from 'react'
import { Layout, Switch } from 'antd'
import 'antd/dist/antd.css';
const {Header, Footer, Content} = Layout
interface IData {
  pong: string
}

export default function Home() {

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IData>({
    pong: ''
  })
  const [error, setError] = useState()

  const toggleValve = (active: boolean) => {
    fetch(`/api/valve?open=${active}`).then(res => res.json()).then(data => setData(data))
  }

  const load = async () => {
    try {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 2000))
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
    <>
      <Layout>
        <Header>
          Header
        </Header>
        <Content>
          <div>
            <label htmlFor="switch" style={{marginRight: '8px'}}>Valve Active</label>
            <Switch loading={loading} onChange={toggleValve} />
         </div>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </>
    
  )
}
