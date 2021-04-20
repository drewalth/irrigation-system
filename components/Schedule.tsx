import {Typography, Calendar} from "antd";

export const Schedule = () => {
    return (
        <div style={{maxHeight: '750px',overflowY: 'scroll'}}>
            <Typography.Title level={5}>Schedule</Typography.Title>
            <Calendar />
        </div>
    )
}
