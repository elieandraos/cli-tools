import chalk from 'chalk'
import * as worker from './release-tasks'

async function release(root) {
    console.log(chalk.magenta('Checking prerequisites:\n'))

    // check pre-requisites
    await worker.checkIfGitIsInitialized(root)
    await worker.checkIfLoggedInToNpm(root)
    await worker.checkIfGitDirectoryIsClean(root)
    await worker.checkIfEnvironmentVariablesAreSet()
    await worker.checkIfLocalBranchIsTheReleaseBranchConfigured(root)
    await worker.checkIfChangelogExists(root)
}

export default release
