import execa from 'execa'
import { getRootDir } from './../../utils/fileSystem'
import { respondOk, abortWithMessage } from './../../utils/console'

const publishToNpmRegistry = async (version) => {
    try {
        await execa('npm', ['publish', '--access', 'public'], {
            cwd: getRootDir(),
        })
        await respondOk(
            `published package version ${version} to npm registry 🚀🚀`
        )
    } catch (e) {
        abortWithMessage(e)
    }
}

export default publishToNpmRegistry
