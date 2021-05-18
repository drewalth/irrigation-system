import Twilio from 'twilio'
const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_TO_NUMBER,
  TWILIO_FROM_NUMBER,
} = process.env

let twilioClient

if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN) {
  // @ts-ignore
  twilioClient = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
}

export const sms = async (body: string) => {
  if (!twilioClient) return
  twilioClient.messages
    .create({
      body,
      to: TWILIO_TO_NUMBER,
      from: TWILIO_FROM_NUMBER,
    })
    .then((message) => console.log(message.sid))
    .catch((e) => console.error(e))
}
