import path from "path"
import fs from "fs"
import db from "../db/db.json"

const updateConfigFile = (payload = {}) => {
  console.log('-------------------\n\nUpdating records.\n\n-------------------')
  const configFile = fs.createWriteStream(path.join(__dirname, "../db/db.json"))

  configFile.write(JSON.stringify(Object.assign({...db}, {...payload}), null, 2))
  configFile.end()
}

export default updateConfigFile