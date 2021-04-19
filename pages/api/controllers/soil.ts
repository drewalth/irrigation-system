import rpio from 'rpio'
const activePins = [22, 36, 33]

rpio.init({
  mock: process.env.NODE_ENV === 'development' ? 'raspi-3' : undefined,
})

const { NODE_ENV } = process.env

export const getSoilReadings = async () => {
  if (NODE_ENV === 'development') {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return [1, 1, 1]
  }

  await Promise.all(activePins.map((p) => rpio.open(p, rpio.INPUT)))
  return Promise.all(activePins.map((pin) => rpio.read(pin))).then((res) => res)
}
