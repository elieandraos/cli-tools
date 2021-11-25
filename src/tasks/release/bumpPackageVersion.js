import execa from 'execa'
import { getRootDir } from './../../utils/fileSystem'
import { respondOk, abortWithMessage } from './../../utils/console'

const bumpPackageVersion = async (releaseType) => {
    try {
        const { stdout } = await execa(
            'npm',
            [
                'version',
                '--commit-hooks',
                false,
                '--git-tag-version',
                false,
                releaseType,
            ],
            {
                cwd: getRootDir(),
            }
        )

        await respondOk(`bumped package version to ${stdout.slice(1)}`)
        return stdout
    } catch (e) {
        abortWithMessage(e)
    }
}

export default bumpPackageVersion
