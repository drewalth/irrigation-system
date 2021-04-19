import rpio from 'rpio'
const rainActivePin = 11

rpio.init({
  mock: process.env.NODE_ENV === 'development' ? 'raspi-3' : undefined
})

export const rainSensor = async (): Promise<any> => {

  if (process.env.NODE_ENV === 'development') return false
  try {

    rpio.open(rainActivePin, rpio.INPUT);

    const reading = await rpio.read(rainActivePin)

    return (reading === 0)

  } catch (error) {
    console.log(`error`, error)
  }
}
