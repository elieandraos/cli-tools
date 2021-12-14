# Javascript helpers

```javascript
import _ from '@elieandraos/cli-tools'
```

#### File system:

| function              | Description                                                      |
|-----------------------| ---------------------------------------------------------------- |
| _.exists(path)        | Checks if a directory exists                                     |
| _.isDirectory(path)     | Checks if a given path is a directory                            |
| _.isFile(path)          | Checks if a given path is a file                                 |
| _.createDirectory(path) | Creates a directory in a given path                              |
| _.emptyDirectory(path)  | Empties a given directory from all its content                   |
| _.copy(src,dest)        | Copies (recursive) a given directory/file to the new destination |

#### Console:

| function             | Description                                      |
| -------------------- | ------------------------------------------------ |
| _.sleep(ms)            | Sets a timeout for a given milliseconds          |
| _.respondOk(msg)       | Prints a success console message                 |
| _.respondError(msg)    | Prints an error console message                  |
| _.abort()              | Stops and exits the script                       |
| _.abortWithMesage(msg) | Stops and exits the script with an error message |

#### Env:

| function      | Description                                |
|---------------| ------------------------------------------ |
| _.getEnv(var) | Gets the value of the environment variable |
| _.hasEnv(var)   | Checks if the environment variable exists  |

#### Release:

```javascript
_.release(rootPath) // see release automation below for more details
```

# Release automation

#### It will:

-   :white_check_mark: perform few checks before releasing (pre-requisites)
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

#### Release pre-requisites

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
