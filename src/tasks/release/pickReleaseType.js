import inquirer from 'inquirer'

const pickReleaseType = async () => {
    const questions = [
        {
            type: 'list',
            name: 'releaseType',
            prefix: '',
            message: 'Pick a semantic release type:',
            choices: [
                { name: 'patch', value: 'patch' },
                { name: 'minor', value: 'minor' },
                { name: 'major', value: 'major' },
                { name: 'prepatch', value: 'prepatch' },
                { name: 'preminor', value: 'preminor' },
                { name: 'premajor', value: 'premajor' },
                { name: 'prerelease', value: 'prerelease' },
            ],
        },
    ]

    let answers = await inquirer.prompt(questions)
    return answers.releaseType
}

export default pickReleaseType
