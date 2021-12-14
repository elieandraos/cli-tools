import execa from 'execa'
import { respondOk, abortWithMessage } from './../index'

const publishToNpmRegistry = async (version, root) => {
    try {
        await execa('npm', ['publish', '--access', 'public'], {
            cwd: root,
        })
        await respondOk(
            `published package version ${version} to npm registry 🚀🚀`
        )
    } catch (e) {
        abortWithMessage(e)
    }
}

export default publishToNpmRegistry
