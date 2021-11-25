import execa from 'execa'
import changelogParser from 'changelog-parser'
import { getRootDir } from './../../utils/fileSystem'
import { respondOk, abortWithMessage } from './../../utils/console'

const resetVersionedFiles = async () => {
    await execa('git', ['checkout', 'package.json', 'package-lock.json'], {
        cwd: getRootDir(),
    })
}
const parseChangelog = async (version) => {
    try {
        let result = await changelogParser(`${getRootDir()}changelog.md`)
        let changelog = result.versions.find((v) => v.title === version)

        if (!changelog) {
            await resetVersionedFiles()
            abortWithMessage(
                `could not find ${version} changelog - update CHANGELOG.md file`
            )
        } else {
            await respondOk(
                `parsed version ${version} release content from the changelog file`
            )
            return changelog.body
        }
    } catch (e) {
        resetVersionedFiles()
        abortWithMessage(e)
    }
}

export default parseChangelog
