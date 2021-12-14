import chalk from 'chalk'
import execa from 'execa'
import _ from "./../index"

const checkIfGitIsInitialized = async (root) => {
    try {
        _.isDirectory(`${root}/.git`)
            ? await _.respondOk('git is initialized')
            : _.abortWithMessage('git is not initialized')
    } catch (e) {
        _.abortWithMessage(e)
    }
}

const checkIfLoggedInToNpm = async (root) => {
    try {
        const { stdout } = await execa('npm', ['whoami'], {
            cwd: root,
        })

        await _.respondOk(`logged in to npm registry as ${stdout}`)
    } catch (e) {
        _.abortWithMessage('You are not logged in to npm. run "npm login"')
    }
}

const checkIfGitDirectoryIsClean = async (root) => {
    try {
        const { stdout } = await execa('git', ['diff', '--stat'], {
            cwd: root,
        })

        stdout
            ? _.abortWithMessage('git directory is not clean, push your changes')
            : await _.respondOk('git directory is clean')
    } catch (e) {
        _.abortWithMessage(e)
    }
}

const checkIfEnvironmentVariablesAreSet = async () => {
    try {
        let vars = [
            'GITHUB_PERSONAL_ACCESS_TOKEN',
            'RELEASE_BRANCH',
            'REPO_OWNER',
            'REPO_NAME',
        ]
        let missing = []

        vars.forEach((variable) => {
            if (!process.env[variable]) missing.push(variable)
        })

        missing.length
            ? _.abortWithMessage(
                  `These .env variables are not set: ${chalk.cyan(
                      missing.join(', ')
                  )}`
              )
            : await _.respondOk('all .env variables are set')
    } catch (e) {
        _.abortWithMessage(e)
    }
}

const checkIfLocalBranchIsTheReleaseBranchConfigured = async (root) => {
    try {
        const { stdout } = await execa('git', ['branch', '--show-current'], {
            cwd: root,
        })

        stdout !== process.env.RELEASE_BRANCH
            ? _.abortWithMessage(
                  'Your current local branch is different than the one configured in your .env file'
              )
            : await _.respondOk(
                  'local branch is the same as the one configured in your .env file'
              )
    } catch (e) {
        _.abortWithMessage(e)
    }
}

const checkIfChangelogExists = async (root) => {
    try {
        _.exists(`${root}changelog.md`)
            ? await _.respondOk('changelog.md exists')
            : _.abortWithMessage(`changelog.md is missing`)
    } catch (e) {
        _.abortWithMessage(e)
    }
}

export {
    checkIfGitIsInitialized,
    checkIfLoggedInToNpm,
    checkIfGitDirectoryIsClean,
    checkIfEnvironmentVariablesAreSet,
    checkIfLocalBranchIsTheReleaseBranchConfigured,
    checkIfChangelogExists,
}
