import execa from 'execa'
import { getRootDir } from './../../utils/fileSystem'
import { respondOk, abortWithMessage } from './../../utils/console'

const createGithubTag = async (version) => {
    try {
        let tag = version.substring(1)

        await execa('git', ['add', '.'], { cwd: getRootDir() })
        await execa('git', ['commit', '-m', `:rocket: release ${version}`], {
            cwd: getRootDir(),
        })
        await execa('git', ['tag', tag], { cwd: getRootDir() })
        await execa('git', ['push'])
        await execa('git', ['push', '--tags'])

        await respondOk(`created github tag ${tag}`)
    } catch (e) {
        abortWithMessage(e)
    }
}

export default createGithubTag
