import chalk from 'chalk'
import * as worker from './release-tasks'

async function release(root) {
    // check pre-requisites
    console.log(chalk.magenta('Checking prerequisites:\n'))

    await worker.checkIfGitIsInitialized(root)
    await worker.checkIfLoggedInToNpm(root)
    await worker.checkIfGitDirectoryIsClean(root)
    await worker.checkIfEnvironmentVariablesAreSet()
    await worker.checkIfLocalBranchIsTheReleaseBranchConfigured(root)
    await worker.checkIfChangelogExists(root)

    // release flow
    console.log(chalk.magenta('\nStarting the release flow:\n'))

    const releaseType = await worker.pickReleaseType()
    const version = await worker.bumpPackageVersion(releaseType, root)
    const releaseChangelog = await worker.parseChangelog(version, root)
    await worker.createGithubTag(version, root)
    await worker.createGithubRelease(version, releaseChangelog)
    await worker.publishToNpmRegistry(version, root)
}

export default release
