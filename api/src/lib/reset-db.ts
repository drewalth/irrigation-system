import path from "path"
import fs from "fs"

export const resetDb = () => {
  console.log('-------------------\n\nResetting db\n\n-------------------')
  const configFile = fs.createWriteStream(path.join(__dirname, "../db/db.json"))

  configFile.write(JSON.stringify({
    updated: new Date(),
    scheduledWatering: new Date(),
    weatherResults: {}
  }, null, 2))
  configFile.end()
}
