import fs from 'fs'
import path from 'path'
import { abortWithMessage } from './console'

const exists = (src) => {
    try {
        return fs.existsSync(src)
    } catch (e) {
        abortWithMessage(e)
    }
}

const isDirectory = (src) => {
    try {
        const stat = fs.statSync(src)
        return stat.isDirectory()
    } catch (e) {
        abortWithMessage(e)
    }
}

const isFile = (src) => {
    return !isDirectory(src)
}

const empty = (src) => {
    try {
        for (const file of fs.readdirSync(src)) {
            const abs = path.resolve(src, file)

            if (fs.lstatSync(abs).isDirectory()) {
                empty(abs)
                fs.rmdirSync(abs)
            } else {
                fs.unlinkSync(abs)
            }
        }
    } catch (e) {
        abortWithMessage(e)
    }
}

const copy = (src, dest) => {
    try {
        const stat = fs.statSync(src)
        if (stat.isDirectory()) {
            copyDir(src, dest)
        } else {
            copyFile(src, dest)
        }
    } catch (e) {
        abortWithMessage(e)
    }
}

const copyFile = (src, dest) => {
    try {
        fs.copyFileSync(src, dest)
    } catch (e) {
        abortWithMessage(e)
    }
}

const copyDir = (src, dest) => {
    try {
        fs.mkdirSync(dest, { recursive: true })
        for (const file of fs.readdirSync(src)) {
            const srcFile = path.resolve(src, file)
            const destFile = path.resolve(dest, file)
            copy(srcFile, destFile)
        }
    } catch (e) {
        abortWithMessage(e)
    }
}

export { exists, isDirectory, isFile, empty, copy, copyFile, copyDir }
