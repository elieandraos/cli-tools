import execa from 'execa'
import _ from './../index'

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

        await _.respondOk(`created github tag ${tag}`)
    } catch (e) {
        _.abortWithMessage(e)
    }
}

export default createGithubTag
