import {
    sleep,
    respondOk,
    respondError,
    abort,
    abortWithMessage,
} from './console'

import { hasEnv, getEnv } from './env'

import {
    exists,
    isDirectory,
    isFile,
    createDirectory,
    emptyDirectory,
    copy,
} from './filesystem'

import release from './release'

const _ = {
    // console
    sleep,
    respondOk,
    respondError,
    abort,
    abortWithMessage,
    // env
    hasEnv,
    getEnv,
    // file system
    exists,
    isDirectory,
    isFile,
    createDirectory,
    emptyDirectory,
    copy,
    // release
    release,
}

export default _
