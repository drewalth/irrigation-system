import rpio from "rpio"
const activePin = 16

/*
 * Set the initial state to low.  The state is set prior to the pin
 * being actived, so is safe for devices which require a stable setup.
 */
rpio.open(activePin, rpio.OUTPUT, rpio.LOW);

/*
 * The sleep functions block, but rarely in these simple programs does
 * one care about that.  Use a setInterval()/setTimeout() loop instead
 * if it matters.
 */
export const valveController = (active: boolean): void => {
  
  rpio.write(activePin, active ? rpio.HIGH : rpio.LOW);

  // /* Off for half a second (500ms) */
  // rpio.write(activePin, rpio.LOW);
  // rpio.msleep(500);

  // if (active) {
  // rpio.write(activePin, rpio.HIGH);
  // // rpio.msleep(500);
  // } else {
  //   rpio.write(activePin, rpio.LOW);
  // }

}