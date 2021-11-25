# The scaffolded package

#### Includes:

-   :package: **microbundle**, zero-configuration bundler
-   :test_tube: **jest**, testing Framework
-   :rotating_light: **eslint**, tool for identifying and reporting on patterns in JavaScript
-   :lipstick: **prettier**, tool for code formatting
-   :twisted_rightwards_arrows: **dotenv**, loads environment variables from a .env file into process.env
-   :green_heart: continuous integration with gitHub action
-   :rocket: automated semantic version releasing

#### Scripts:

-   `npm run build` _bundles your code with mircobundle_
-   `npm run test` _runs the test suites with jest_
-   `npm run format` _formats the code with prettier_
-   `npm run lint` _check for linting error, apply fixes with es-lint_
-   `npm run release` _creates a gitHub tag and release, publishes to npm registry_
-   `npm run info` _lists the dependencies installed and the ones that are outdated_

#### Customization

The package uses the default `eslint:recommended` set of rules and few prettier rules.
You can customize both of them to your personal flavor.

-   es-lint [configuration](https://eslint.org/docs/user-guide/configuring/) and [rules](https://eslint.org/docs/rules/) docs
-   prettier [configuration](https://prettier.io/docs/en/configuration.html) and [options](https://prettier.io/docs/en/options.html) docs

# Release automation

#### It will:

-   :white_check_mark: perform few checks before releasing
-   :speech_balloon: ask you for the release type: `patch|minor|major|prepatch|preminor|premajor|prerelease`
-   :pushpin: bump the package version
-   :arrow_up: push `package.json` file
-   :bookmark: create a gitHub tag
-   :loud_sound: create a gitHub release with the version's changelog as release body
-   :rocket: publish the package to npm

#### Configuration:

> This is a one time configuration only.

1. Create gitHub [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) with `repo` scope
2. Fill the environment variables _(gitHub token, branch, username, repo)_ in the `.env` file including the gitHub token just created

#### Release

Run the release script from your terminal

```shell
npm run release
```

The script will perform few pre-requisites checks and will render an error help message if any fails:

-   check if git is initialized
-   check if you are logged in to npm (via cli)
-   check if the working directory is clean (no changes to commit and push)
-   check if all the .env variables are filled
-   check if the working branch is as configured in .env
-   check if the version's release notes exist in changelog.md (see how to create release notes below)

If all the pre-requisites checks pass, it will ask for the semantic version and start the release process.

#### How to create release notes in the changelog file:

Just add a markdown level 2 heading with the release version as title at the top of `changelog.md`.
You can check the package's changelog.d file as an example.

> Tip: How to [make a good](https://keepachangelog.com/en/1.0.0/#how) change log
