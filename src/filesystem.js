import fs from 'fs'
import path from 'path'

const exists = (src) => {
    return fs.existsSync(src)
}

const isDirectory = (src) => {
    if (!exists(src)) return false

    const stat = fs.statSync(src)
    return stat.isDirectory()
}

const isFile = (src) => {
    if (!exists(src)) return false

    const stat = fs.statSync(src)
    return stat.isFile()
}

const empty = (src) => {
    if (!isDirectory(src)) throw `directory ${src} does not exist`

    for (const file of fs.readdirSync(src)) {
        const abs = path.resolve(src, file)

        if (fs.lstatSync(abs).isDirectory()) {
            empty(abs)
            fs.rmdirSync(abs)
        } else {
            fs.unlinkSync(abs)
        }
    }
}

const copy = (src, dest) => {
    if (!exists(src)) throw `No such file or directory ${src}`

    isDirectory(src) ? copyDir(src, dest) : copyFile(src, dest)
}

const copyFile = (src, dest) => {
    fs.copyFileSync(src, dest)
}

const copyDir = (src, dest) => {
    fs.mkdirSync(dest, { recursive: true })

    for (const file of fs.readdirSync(src)) {
        const srcFile = path.resolve(src, file)
        const destFile = path.resolve(dest, file)
        copy(srcFile, destFile)
    }
}

export { exists, isDirectory, isFile, empty, copy }
