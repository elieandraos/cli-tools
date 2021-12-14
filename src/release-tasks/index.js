import {
    checkIfGitIsInitialized,
    checkIfLoggedInToNpm,
    checkIfGitDirectoryIsClean,
    checkIfEnvironmentVariablesAreSet,
    checkIfLocalBranchIsTheReleaseBranchConfigured,
    checkIfChangelogExists,
} from './prerequisites'

import pickReleaseType from './pickReleaseType'
import bumpPackageVersion from './bumpPackageVersion'
import parseChangelog from './parseChangelog'
import createGithubTag from './createGithubTag'
import createGithubRelease from './createGithubRelease'
import publishToNpmRegistry from './publishToNpmRegistry'

export {
    checkIfGitIsInitialized,
    checkIfLoggedInToNpm,
    checkIfGitDirectoryIsClean,
    checkIfEnvironmentVariablesAreSet,
    checkIfLocalBranchIsTheReleaseBranchConfigured,
    checkIfChangelogExists,
    pickReleaseType,
    bumpPackageVersion,
    parseChangelog,
    createGithubTag,
    createGithubRelease,
    publishToNpmRegistry,
}
