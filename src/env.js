require('dotenv').config()
import { abortWithMessage } from './console'

const hasEnv = (vars) => {
    try {
        let missing = []

        vars.forEach((variable) => {
            if (!process.env[variable]) missing.push(variable)
        })

        return !!missing.length
    } catch (e) {
        abortWithMessage(e)
    }
}

const getEnv = (variable) => {
    try {
        return process.env[variable] || null
    } catch (e) {
        abortWithMessage(e)
    }
}

export { hasEnv, getEnv }
