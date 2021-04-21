import {Typography, Calendar, Button} from "antd";
import axios from "axios";
export const Schedule = () => {

    const createTimeSlot = async () => {
        try {
            await axios.post('/api/schedule', {
                startTime: new Date(),
                endTime: new Date()
            })
        } catch (e) {
            console.log(e)
        }
    }

    const getTimeSlots = async () => {
        try {
           const result = await axios.get('/api/schedule').then(res => res.data)

            console.log(result)
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div style={{maxHeight: '750px',overflowY: 'scroll'}}>
            <Typography.Title level={5}>Schedule</Typography.Title>
            <Button onClick={() => createTimeSlot()}>Create</Button>
            <Button onClick={() => getTimeSlots()}>get</Button>
            <Calendar />
        </div>
    )
}
