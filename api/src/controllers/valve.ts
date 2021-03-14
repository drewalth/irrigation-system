import rpio from "rpio"
import moment from 'moment'
const activePin = 16

rpio.init({
  mock: process.env.NODE_ENV === 'development' ? 'raspi-3' : undefined
})

/**
 * 
 * @param {boolean} active whether or not the solenoid valve is open
 */
export const valveController = async (active = false): Promise<void> => {
  console.log(`Valve Open : ${active} : ${moment(new Date()).format('LLLL')}`)
  if (process.env.NODE_ENV === 'development') return
  try {
    rpio.open(activePin, rpio.OUTPUT, rpio.LOW);
    rpio.write(activePin, active ? rpio.HIGH : rpio.LOW);
  } catch (error) {
    console.log(`error`, error)
  }
}