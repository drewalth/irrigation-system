import rpio from 'rpio'
const activePins = [22, 36, 33]

rpio.init({
  mock: process.env.NODE_ENV === 'development' ? 'raspi-3' : undefined,
})

export const getSoilReadings = async (): Promise<any> => {
  await Promise.all(activePins.map((p) => rpio.open(p, rpio.INPUT)))

  return Promise.all(activePins.map((pin) => rpio.read(pin)))
    .then((res) => res)
    .catch((e) => console.error(e))
}
