require('dotenv').config()

const hasEnv = (vars) => {
    let missing = []

    vars.forEach((variable) => {
        if (!process.env[variable]) missing.push(variable)
    })

    return !!missing.length
}

const getEnv = (variable) => {
    return process.env[variable] || null
}

export { hasEnv, getEnv }
