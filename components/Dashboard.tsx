import { Row, Col, Typography, Spin, Switch } from "antd";
import { useRef, useState } from "react";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";

export const Dashboard = ({
  soilReadings,
  rainReadings,
  soilReadingsLoading,
  rainReadingsLoading,
}) => {
  const gifRef = useRef(null);

  const wateringGif =
    "https://media.giphy.com/media/3osxYt7bembKQLbPS8/giphy.gif";
  const waitingGif =
    "https://media.giphy.com/media/Zv8VKJZMFm5NKxW9k5/giphy.gif";

  const [valveOpen, setValveOpen] = useState(false);

  const toggleValve = (open: boolean) => {
    fetch(`/api/valve?open=${open}`)
      .then((res) => res.json())
      .then(() => setValveOpen(open))
      .then(() => {
        if (gifRef && gifRef.current) {
          gifRef.current.src = open ? wateringGif : waitingGif;
        }
      });
  };

  const getIcon = (value) => {
    return value === 0 ? (
      <CheckCircleTwoTone twoToneColor="#52c41a" />
    ) : (
      <CloseCircleTwoTone twoToneColor="#eb2f96" />
    );
  };

  return (
    <Row>
      {rainReadingsLoading || soilReadingsLoading ? (
        <Spin />
      ) : (
        <>
          <Col span={12}>
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
          <Col span={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography.Title level={4}>Main Valve</Typography.Title>
              <Switch
                checkedChildren="Watering"
                unCheckedChildren="Closed"
                checked={valveOpen}
                onClick={() => toggleValve(!valveOpen)}
              />
            </div>
            <img
              alt={valveOpen ? "Watering Plants" : "Not watering plants"}
              ref={gifRef}
              src={waitingGif}
              style={{ objectFit: "cover", height: "232px", width: "100%" }}
            />
          </Col>
        </>
      )}
    </Row>
  );
};
