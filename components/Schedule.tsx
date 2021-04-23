import {
  Typography,
  Table,
  Spin,
  Button,
  Modal,
  Form,
  Input,
  TimePicker,
  Select,
  message,
} from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import moment from 'moment'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { ITimeSlot, timeSlot } from '../interfaces'

export const Schedule = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [timeSlots, setTimeSlots] = useState([])
  const [timeSlotsLoading, setTimeSlotsLoading] = useState(false)
  const [timeSlotForm, setTimeSlotForm] = useState<ITimeSlot>({ ...timeSlot })

  const getTimeSlots = async () => {
    try {
      setTimeSlotsLoading(true)
      const result = await axios.get('/api/schedule').then((res) => res.data)
      setTimeSlots(result)
    } catch (e) {
      message.error('Something went wrong...')
      console.log(e)
    } finally {
      setTimeSlotsLoading(false)
    }
  }

  useEffect(() => {
    getTimeSlots()
  }, [])

  const createTimeSlot = async (payload) => {
    try {
      const result = await axios
        .post('/api/schedule', payload)
        .then((res) => res.data)
      message.success('Time Slot Created')
      setTimeSlots([...timeSlots, result])
    } catch (e) {
      message.error('Something went wrong...')
      console.log(e)
    }
  }

  const deleteTimeSlot = async (slotId) => {
    console.log(slotId)
    try {
      await axios.delete(`/api/schedule?slotId=${slotId}`).then(() => {
        message.success('Time Slot Deleted')
        setTimeSlots(timeSlots.filter((slot) => slot.id !== slotId))
      })
    } catch (e) {
      message.error('Something went wrong...')
      console.log(e)
    }
  }

  const handleCancel = () => {
    setModalVisible(false)
    setTimeSlotForm(timeSlot)
  }

  const initiateEdit = (timeSlot: ITimeSlot) => {
    setModalVisible(true)
    setTimeSlotForm(timeSlot)
  }

  const updateTimeSlot = async (slotId, payload) => {
    try {
      const result = await axios
        .post(`/api/schedule?slotId=${slotId}`, payload)
        .then((res) => res.data)

      const index = timeSlots.findIndex((t) => t.id === result.id)
      const data = [...timeSlots]
      data.splice(index, 1, result)

      setTimeSlots(data)
      message.success('Time Slot Updated')
    } catch (e) {
      console.log(e)
    }
  }

  const tableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (time) => <>{moment(time).format('LTS')}</>,
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (time) => <>{moment(time).format('LTS')}</>,
    },
    {
      title: 'Interval',
      dataIndex: 'interval',
      key: 'interval',
    },
    {
      key: 'action',
      render: (text, record) => (
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}
        >
          <Button
            icon={<EditOutlined />}
            style={{ marginRight: '0.5rem' }}
            onClick={() => initiateEdit(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => deleteTimeSlot(record.id)}
            danger
          />
        </div>
      ),
    },
  ]

  return (
    <div style={{ maxHeight: '750px', overflowY: 'scroll' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '1rem',
        }}
      >
        <Typography.Title level={5}>Schedule</Typography.Title>
        <Button onClick={() => setModalVisible(true)} type="primary">
          New Time Slot
        </Button>
      </div>
      {timeSlotsLoading && <Spin />}
      {!timeSlotsLoading && timeSlots.length > 0 && (
        <Table columns={tableColumns} dataSource={timeSlots} />
      )}
      <Modal
        visible={modalVisible}
        onCancel={handleCancel}
        onOk={async () => {
          if (timeSlotForm.id) {
            await updateTimeSlot(timeSlotForm.id, timeSlotForm)
          } else {
            await createTimeSlot(timeSlotForm)
          }
          setTimeSlotForm({ ...timeSlot })
          setModalVisible(false)
        }}
      >
        <div style={{ paddingRight: '2rem' }}>
          <Form>
            <Form.Item>
              <Input
                title="Name"
                value={timeSlotForm.name}
                onChange={(evt) => {
                  setTimeSlotForm({
                    ...timeSlotForm,
                    name: evt.target.value,
                  })
                }}
              />
            </Form.Item>
            <Form.Item>
              <TimePicker.RangePicker
                use12Hours
                value={[
                  moment(timeSlotForm.startTime),
                  moment(timeSlotForm.endTime),
                ]}
                onChange={([startTime, endTime]) => {
                  setTimeSlotForm({
                    ...timeSlotForm,
                    startTime: moment(startTime).toDate(),
                    endTime: moment(endTime).toDate(),
                  })
                }}
              />
            </Form.Item>
            <Form.Item>
              <Select
                value={timeSlotForm.interval}
                defaultValue="daily"
                onChange={(interval) => {
                  setTimeSlotForm({
                    ...timeSlotForm,
                    interval,
                  })
                }}
              >
                <Select.Option value="daily">Daily</Select.Option>
                <Select.Option value="weekly">Weekly</Select.Option>
                <Select.Option value="monthly">Monthly</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  )
}
