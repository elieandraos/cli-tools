import execa from 'execa'
import { respondOk, abortWithMessage } from './../index'

const bumpPackageVersion = async (releaseType, root) => {
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
                cwd: root,
            }
        )

        await respondOk(`bumped package version to ${stdout.slice(1)}`)
        return stdout
    } catch (e) {
        abortWithMessage(e)
    }
}

export default bumpPackageVersion
