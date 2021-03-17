import rpio from "rpio"
const activePin = 18

rpio.init({
  mock: process.env.NODE_ENV === 'development' ? 'raspi-3' : undefined
})

/**
 * 
 * @param {boolean} active whether or not the solenoid valve is open
 */
export const laser = async (active = false): Promise<void> => {
  if (process.env.NODE_ENV === 'development') return
  try {
    rpio.open(activePin, rpio.OUTPUT, rpio.HIGH);
    rpio.write(activePin, active ? rpio.LOW : rpio.HIGH);
  } catch (error) {
    console.log(`error`, error)
  }
}