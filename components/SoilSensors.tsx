import {Typography} from "antd";

export const SoilSensors = ({soilReadings, soilReadingsLoading}) => {

    const readingOptimal = (reading: number): string => {
        return reading === 0
            ? 'Reading meets requirement.'
            : 'Reading does not meet requirement.'
    }

    return (
        <div>
            <Typography.Title level={5}>Soil Sensors</Typography.Title>
        </div>
    )
}
