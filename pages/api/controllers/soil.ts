import rpio from 'rpio'
const activePins = [22, 36, 33]

const openPins = async () => {
  await Promise.all(activePins.map((p) => rpio.open(p, rpio.INPUT)))
  return console.log('pins opened')
}

rpio.init({
  mock: process.env.NODE_ENV === 'development' ? 'raspi-3' : undefined,
})

openPins()

const { NODE_ENV } = process.env

export const getSoilReadings = async (): Promise<any> => {
  return Promise.all(activePins.map((pin) => rpio.read(pin)))
    .then((res) => res)
    .catch((e) => console.error(e))
}
