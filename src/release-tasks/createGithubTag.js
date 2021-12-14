import execa from 'execa'
import { respondOk, abortWithMessage } from './../index'

const createGithubTag = async (version, root) => {
    try {
        let tag = version.substring(1)

        await execa('git', ['add', '.'], { cwd: root })
        await execa('git', ['commit', '-m', `:rocket: release ${version}`], {
            cwd: root,
        })
        await execa('git', ['tag', tag], { cwd: root })
        await execa('git', ['push'])
        await execa('git', ['push', '--tags'])

        await respondOk(`created github tag ${tag}`)
    } catch (e) {
        abortWithMessage(e)
    }
}

export default createGithubTag