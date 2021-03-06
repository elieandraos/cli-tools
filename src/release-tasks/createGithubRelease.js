import { Octokit } from '@octokit/core'
import _ from './../index'

const createGithubRelease = async (version, body) => {
    try {
        const octokit = new Octokit({
            auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
        })

        await octokit.request('POST /repos/{owner}/{repo}/releases', {
            owner: process.env.REPO_OWNER,
            repo: process.env.REPO_NAME,
            tag_name: version.substring(1),
            name: version,
            body: body,
        })

        await _.respondOk(`created github release ${version}`)
    } catch (e) {
        _.abortWithMessage(e)
    }
}

export default createGithubRelease
