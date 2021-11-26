import chalk from 'chalk'

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

const respondOk = async (message) => {
    await sleep(500)
    console.log(chalk.green(`✔ ${message}`))
}

const respondError = async (message) => {
    await sleep(500)
    console.log(chalk.red(`✖ ${message}`))
}

const abort = () => {
    process.exit(1)
}

const abortWithMessage = (message) => {
    respondError(message).then( () => {
        abort()
    })
}

export { sleep, respondOk, respondError, abort, abortWithMessage }
