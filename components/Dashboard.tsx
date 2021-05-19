import { Row, Col, Typography, Spin, Switch } from 'antd'
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'

export const Dashboard = (props) => {
  const {
    socket,
    valveOpen,
    soilReadings,
    rainReadings,
    soilReadingsLoading,
    rainReadingsLoading,
  } = props

  const toggleValve = (open: boolean) => {
    props.handleValveToggle(open)
    fetch(`/api/valve?open=${open}`)
      .then((res) => res.json())
      .then(({ watering }) => {
        socket.emit('valveToggle', watering)
      })
  }

  const getIcon = (value) => {
    return value === 0 ? (
      <CheckCircleTwoTone twoToneColor="#52c41a" />
    ) : (
      <CloseCircleTwoTone twoToneColor="#eb2f96" />
    )
  }

  return (
    <Row>
      {rainReadingsLoading || soilReadingsLoading ? (
        <Spin />
      ) : (
        <>
          <Col xs={24} sm={12} style={{ marginBottom: '24px' }}>
            <Typography.Title level={4}>Main Valve</Typography.Title>
            <Switch
              checkedChildren="Watering"
              unCheckedChildren="Closed"
              checked={valveOpen}
              onClick={() => toggleValve(!valveOpen)}
            />
          </Col>
          <Col xs={24} sm={12}>
            <Typography.Title level={5}>Soil</Typography.Title>
            <ul>
              {soilReadings.map((reading, index) => (
                <li key={index}>
                  Sensor {index + 1}: {getIcon(reading)}
                </li>
              ))}
            </ul>
            <Typography.Title level={5}>Rain</Typography.Title>
            <ul>
              {rainReadings.map((reading, index) => (
                <li key={index}>
                  Sensor {index + 1}: {getIcon(reading)}
                </li>
              ))}
            </ul>
          </Col>
        </>
      )}
    </Row>
  )
}
