import execa from 'execa'
import changelogParser from 'changelog-parser'
import { respondOk, abortWithMessage } from './../index'

const resetVersionedFiles = async (root) => {
    await execa('git', ['checkout', 'package.json', 'package-lock.json'], {
        cwd: root,
    })
}

const parseChangelog = async (version, root) => {
    try {
        let result = await changelogParser(`${root}changelog.md`)
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
        await resetVersionedFiles(root)
        abortWithMessage(e)
    }
}

export default parseChangelog
