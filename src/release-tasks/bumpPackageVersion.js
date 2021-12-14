import execa from 'execa'
import _ from './../index'

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

        await _.respondOk(`bumped package version to ${stdout.slice(1)}`)
        return stdout
    } catch (e) {
        _.abortWithMessage(e)
    }
}

export default bumpPackageVersion
