export interface ITimeSlot {
  id?: number
  name: string
  startTime: Date
  endTime: Date
  interval: string
}

export const timeSlot = {
  name: '',
  startTime: new Date(),
  endTime: new Date(),
  interval: 'daily',
}
