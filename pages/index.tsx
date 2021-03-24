import { useState, useEffect } from 'react'
import { Layout, Switch, List, Typography, Row, Col } from 'antd'
import 'antd/dist/antd.css';
const {Header, Footer, Content} = Layout
interface IData {
  pong: string
}

export default function Home() {

  const [loading, setLoading] = useState(false)
  const [soilReadings, setSoilReading] = useState([])
  const [soilReadingsLoading, setSoilReadingsLoading] = useState(false)
  const [data, setData] = useState<IData>({
    pong: ''
  })
  const [error, setError] = useState()

  const toggleValve = (active: boolean) => {
    fetch(`/api/valve?open=${active}`).then(res => res.json()).then(data => setData(data))
  }

  const getSoilReadings = () => {
    setSoilReadingsLoading(true)
    fetch('/api/soil').then(res => res.json()).then(data => setSoilReading(data)).finally(() => setSoilReadingsLoading(false))
  }

  const soilReadingOptimal = (reading:number) => {
    return (reading === 0)
  }

  const initializeSystem = () => {
    fetch('/api/init')
  }

  useEffect(() => {
    initializeSystem()
    getSoilReadings()
  }, [])


  return (
    <>
      <Layout>
        <Header>
          Header
        </Header>
        <Content>
          <Row>
            <Col span={14} offset={4}>
              <div>
                <label htmlFor="switch" style={{marginRight: '8px'}}>Valve Active</label>
                <Switch loading={loading} onChange={toggleValve} />
              </div>
              <List bordered
                    dataSource={soilReadings}
                    header={<Typography.Title level={3}>Soil Sensors</Typography.Title> }
                    renderItem={(item,index) => <List.Item>Sensor {index + 1} {soilReadingOptimal(item) ? 'good' : 'bad'}</List.Item>}
              />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>

  )
}
