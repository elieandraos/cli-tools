import fs from 'fs'
import path from 'path'

const dirExists = (dir) => {
    return fs.existsSync(dir)
}

const getRootDir = () => {
    return path.join(__dirname, '../../')
}

export { dirExists, getRootDir }
