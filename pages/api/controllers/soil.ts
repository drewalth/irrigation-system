import rpio from 'rpio'
const activePins = [22, 36, 33]

rpio.init({
  mock: process.env.NODE_ENV === 'development' ? 'raspi-3' : undefined,
})

const { NODE_ENV } = process.env(
  (async function () {
    await Promise.all(activePins.map((p) => rpio.open(p, rpio.INPUT))).then(
      (res) => {
        console.log('Inputs Opened')

        return res
      }
    )
  })()
)

export const getSoilReadings = async (): Promise<any> => {
  return Promise.all(activePins.map((pin) => rpio.read(pin)))
    .then((res) => res)
    .catch((e) => console.error(e))
}
