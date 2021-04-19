import rpio from 'rpio'
import moment from 'moment'
import { sms } from './sms'

const activePin = 16

rpio.init({
  mock: process.env.NODE_ENV === 'development' ? 'raspi-3' : undefined,
})

/**
 *
 * @param {boolean} active whether or not the solenoid valve is open
 * @param {boolean} notify send sms messge when valve is opened or closed.
 */
export const valveController = async (
  active = false,
  notify = true
): Promise<void> => {
  const message = `Valve Open : ${active} : ${moment(new Date()).format(
    'LLLL'
  )}`
  console.log(message)

  if (notify) {
    await sms(message)
  }

  if (process.env.NODE_ENV === 'development') return
  try {
    rpio.open(activePin, rpio.OUTPUT, rpio.LOW)
    rpio.write(activePin, active ? rpio.HIGH : rpio.LOW)
  } catch (error) {
    console.log(`error`, error)
  }
}
