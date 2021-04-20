import 'antd/dist/antd.css'
import { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd'
import {
  ToolOutlined,
  CalendarOutlined,
  GithubOutlined,
  DashboardOutlined,
} from '@ant-design/icons'

import { Dashboard, SoilSensors, RainSensors, Schedule } from '../components'

const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout

export default function Home() {
  const [soilReadingsLoading, setSoilReadingsLoading] = useState(false)
  const [soilReadings, setSoilReadings] = useState([])
  const [rainReadingsLoading, setRainReadingsLoading] = useState(false)
  const [rainReadings, setRainReadings] = useState([])
  const [activeTab, setActiveTab] = useState(['1'])

  const getSoilReadings = () => {
    setSoilReadingsLoading(true)
    fetch('/api/soil')
      .then((res) => res.json())
      .then((data) => setSoilReadings(data))
      .finally(() => setSoilReadingsLoading(false))
  }

  const getRainReadings = () => {
    setRainReadingsLoading(true)
    fetch('/api/rain')
      .then((res) => res.json())
      .then((data) => setRainReadings(data))
      .finally(() => setRainReadingsLoading(false))
  }

  const initializeSystem = () => {
    fetch('/api/init')
  }

  useEffect(() => {
    initializeSystem()
    getRainReadings()
    getSoilReadings()
  }, [])

  return (
    <Layout>
      <Header className="header">
        <div className="logo">Irrigation System</div>
      </Header>
      <Content style={{ height: 'calc(100vh - 135px)', padding: '0 50px' }}>
        <Layout
          className="site-layout-background"
          style={{ padding: '24px 0' }}
        >
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              openKeys={activeTab}
              style={{ height: '100%' }}
            >
              <Menu.Item
                key="1"
                onClick={() => setActiveTab(['1'])}
                icon={<DashboardOutlined />}
              >
                Dashboard
              </Menu.Item>
              <SubMenu
                onTitleClick={() => setActiveTab([...activeTab, '2'])}
                key="2"
                icon={<ToolOutlined />}
                title="Sensors"
              >
                <Menu.Item onClick={() => setActiveTab(['3', '2'])} key="3">
                  Soil
                </Menu.Item>
                <Menu.Item onClick={() => setActiveTab(['4', '2'])} key="4">
                  Rain
                </Menu.Item>
              </SubMenu>
              <Menu.Item
                onClick={() => setActiveTab(['5'])}
                key="5"
                icon={<CalendarOutlined />}
              >
                Schedule
              </Menu.Item>
            </Menu>
          </Sider>
          <Content
            style={{ backgroundColor: '#fff', padding: '24px', minHeight: 280 }}
          >
            {activeTab.includes('1') && (
              <Dashboard
                soilReadings={soilReadings}
                rainReadings={rainReadings}
                rainReadingsLoading={rainReadingsLoading}
                soilReadingsLoading={soilReadingsLoading}
              />
            )}
            {activeTab.includes('3') && (
              <SoilSensors
                soilReadings={soilReadings}
                soilReadingsLoading={soilReadingsLoading}
              />
            )}
            {activeTab.includes('4') && (
              <RainSensors
                rainReadings={rainReadings}
                rainReadinsLoading={rainReadingsLoading}
              />
            )}
            {activeTab[0] === '5' && <Schedule />}
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Drew Althage -{' '}
        <a
          style={{ color: 'currentColor' }}
          href="https://github.com/drewalth/irrigation-system"
          target="_blank"
          rel="noreferrer"
        >
          <GithubOutlined />
        </a>
      </Footer>
    </Layout>
  )
}
