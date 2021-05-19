import 'antd/dist/antd.css'
import { Component } from 'react'
import { Layout, Menu } from 'antd'
import {
  ToolOutlined,
  CalendarOutlined,
  GithubOutlined,
  DashboardOutlined,
} from '@ant-design/icons'
import { io } from 'socket.io-client'
import { Dashboard, SoilSensors, RainSensors, Schedule } from '../components'

const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout

class Home extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    soilReadingsLoading: false,
    soilReadings: [],
    rainReadingsLoading: false,
    rainReadings: [],
    windowWidth: 0,
    activeTab: ['1'],
    socket: io(),
    valveOpen: false,
  }

  handleValveToggle = (open) => {
    this.setState({
      valveOpen: open,
    })
    this.state.socket.emit('valveToggle', open)
  }

  getSoilReadings = () => {
    this.setState({ soilReadingsLoading: true })
    fetch('/api/soil')
      .then((res) => res.json())
      .then((data) => this.setState({ soilReadings: data }))
      .finally(() => this.setState({ soilReadingsLoading: false }))
  }

  getRainReadings = () => {
    this.setState({ rainReadingsLoading: true })
    fetch('/api/rain')
      .then((res) => res.json())
      .then((data) => this.setState({ rainReadings: data }))
      .finally(() => this.setState({ rainReadingsLoading: false }))
  }

  connectSocket = async () => {
    fetch('/api/socketio').finally(() => {
      this.state.socket.on('connect', () => {
        console.log('user connected')
      })
      this.state.socket.on('valveToggle', (data) => {
        this.setState({
          valveOpen: data.includes('true'),
        })
      })
    })
  }

  initializeSystem = () => {
    fetch('/api/init')
    fetch('/api/status')
      .then((res) => res.json())
      .then(({ active }) => {
        this.setState({
          valveOpen: active.includes('true'),
        })
      })
  }

  componentDidMount() {
    this.setState({
      windowWidth: window.innerWidth,
    })

    this.initializeSystem()
    this.getRainReadings()
    this.getSoilReadings()
    this.connectSocket()

    window.addEventListener('resize', () => {
      this.setState({
        windowWidth: window.innerWidth,
      })
    })
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="header">
          <div className="logo">Irrigation System</div>
        </Header>
        <Content style={{ height: 'calc(100vh - 135px)', padding: '0 50px' }}>
          <Layout
            className="site-layout-background"
            style={{ padding: '24px 0' }}
          >
            <Sider
              className="site-layout-background"
              width={200}
              collapsed={this.state.windowWidth < 768}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                openKeys={this.state.activeTab}
                style={{ height: '100%' }}
              >
                <Menu.Item
                  key="1"
                  onClick={() =>
                    this.setState({
                      activeTab: ['1'],
                    })
                  }
                  icon={<DashboardOutlined />}
                >
                  Dashboard
                </Menu.Item>
                <SubMenu
                  onTitleClick={({ key }) => {
                    if (key === '2' && this.state.activeTab.includes('2')) {
                      this.setState({
                        activeTab: this.state.activeTab.filter(
                          (t) => t !== '2'
                        ),
                      })
                    } else {
                      this.setState({
                        activeTab: [...this.state.activeTab, '2'],
                      })
                    }
                  }}
                  key="2"
                  icon={<ToolOutlined />}
                  title="Sensors"
                >
                  <Menu.Item
                    onClick={() => this.setState({ activeTab: ['3', '2'] })}
                    key="3"
                  >
                    Soil
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => this.setState({ activeTab: ['4', '2'] })}
                    key="4"
                  >
                    Rain
                  </Menu.Item>
                </SubMenu>
                <Menu.Item
                  onClick={() => this.setState({ activeTab: ['5'] })}
                  key="5"
                  icon={<CalendarOutlined />}
                >
                  Schedule
                </Menu.Item>
              </Menu>
            </Sider>
            <Content
              style={{
                backgroundColor: '#fff',
                padding: '24px',
                minHeight: 280,
              }}
            >
              {this.state.activeTab.includes('1') && (
                <Dashboard
                  {...this.state}
                  handleValveToggle={this.handleValveToggle}
                />
              )}
              {this.state.activeTab.includes('3') && (
                <SoilSensors
                  soilReadings={this.state.soilReadings}
                  soilReadingsLoading={this.state.soilReadingsLoading}
                />
              )}
              {this.state.activeTab.includes('4') && (
                <RainSensors
                  rainReadings={this.state.rainReadings}
                  rainReadinsLoading={this.state.rainReadingsLoading}
                />
              )}
              {this.state.activeTab[0] === '5' && <Schedule />}
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
}

export default Home
