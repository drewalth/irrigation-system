import {useState, useEffect} from 'react'
import {Layout, Switch, Card, Typography, Row, Col, Spin, Button, Calendar} from 'antd'
import 'antd/dist/antd.css';

const {Header, Content} = Layout

interface IData {
    pong: string
}

export default function Home() {

    const [loading, setLoading] = useState(false)
    const [soilReadings, setSoilReading] = useState([])
    const [soilReadingsLoading, setSoilReadingsLoading] = useState(false)
    const [rainReadingsLoading, setRainReadingsLoading] = useState(false)
    const [rainReadings, setRainReadings] = useState([])


    const [data, setData] = useState<IData>({
        pong: ''
    })

    const toggleValve = (active: boolean) => {
        fetch(`/api/valve?open=${active}`).then(res => res.json()).then(data => setData(data))
    }

    const getSoilReadings = () => {
        setSoilReadingsLoading(true)
        fetch('/api/soil').then(res => res.json()).then(data => setSoilReading(data)).finally(() => setSoilReadingsLoading(false))
    }

    const getRainReadings = () => {
        setRainReadingsLoading(true)
        fetch('/api/rain').then(res => res.json()).then(data => setRainReadings(data)).finally(() => setRainReadingsLoading(false))
    }

    const readingOptimal = (reading: number): string => {
        return (reading === 0) ? 'reading meets standards' : 'reading does not meet standards'
    }

    const initializeSystem = () => {
        fetch('/api/init')
    }

    useEffect(() => {
        initializeSystem()
        getRainReadings()
        getSoilReadings()
    }, [])

    const rowStyle = {marginBottom: '2rem'}

    return (
        <Layout>
            <Header style={{display: 'flex', alignItems: 'flex-end'}}>
                <Typography.Title mark level={2}>Irrigation System</Typography.Title>
            </Header>
            <Content style={{height:'100vh'}}>
                <Row style={{...rowStyle, marginTop: '2rem'}}>
                    <Col span={14} offset={4}>

                    </Col>
                </Row>
                <Row style={rowStyle}>
                    <Col span={14} offset={4}>
                        <label htmlFor="switch" style={{marginRight: '8px'}}>Valve Open (Watering)</label>
                        <Switch loading={loading} onChange={toggleValve}/>
                    </Col>
                </Row>
                <Row style={rowStyle}>
                    <Col span={14} offset={4}>
                        <Card title="Soil Sensors" extra={<Button onClick={getSoilReadings} disabled={soilReadingsLoading}>Refresh</Button>}>
                            {soilReadingsLoading && (
                                <div style={{display: 'flex'}}>
                                    <Spin/>
                                    <span style={{marginLeft: '1rem'}}>
                                            Loading Soil Moisture Readings
                                        </span>
                                </div>
                            )}
                            {!soilReadingsLoading && soilReadings.length ? (
                                <ul>
                                    {soilReadings.map((reading, index) => (
                                        <li key={String(reading + index)}>Sensor {index + 1}: {readingOptimal(reading)}</li>
                                    ))}
                                </ul>
                            ) : (
                                // this feels like bad practice
                                <></>
                            )}
                        </Card>
                    </Col>
                </Row>
                <Row style={rowStyle}>
                    <Col span={14} offset={4}>
                        <Card title="Rain Sensors" extra={<Button onClick={getRainReadings} disabled={rainReadingsLoading}>Refresh</Button>}>
                            {rainReadingsLoading && (
                                <div style={{display: 'flex'}}>
                                    <Spin/>
                                    <span style={{marginLeft: '1rem'}}>
                                            Loading Soil Moisture Readings
                                    </span>
                                </div>
                            )}
                            {!rainReadingsLoading && rainReadings.length ? (
                                <ul>
                                    {rainReadings.map((reading, index) => (
                                        <li key={String(reading + index)}>Sensor {index + 1}: {readingOptimal(reading)}</li>
                                    ))}
                                </ul>
                            ) : (
                                // this feels like bad practice
                                <></>
                            )}
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}
