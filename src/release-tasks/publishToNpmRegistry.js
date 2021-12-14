import execa from 'execa'
import _ from './../index'

const publishToNpmRegistry = async (version, root) => {
    try {
        await execa('npm', ['publish', '--access', 'public'], {
            cwd: root,
        })
        await _.respondOk(
            `published package version ${version} to npm registry 🚀🚀`
        )
    } catch (e) {
        _.abortWithMessage(e)
    }
}

export default publishToNpmRegistry
