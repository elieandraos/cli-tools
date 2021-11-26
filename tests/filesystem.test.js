import * as filesystem from './../src/filesystem'

const mock = require('mock-fs')

beforeEach(async () => {
    // Mock an in-memory file system
    mock(
        {
            dir: {
                file1: 'note content',
                subDir: {
                    file2: 'note 2 content',
                },
            },
        },
        {
            createCwd: true,
            createTmp: true,
        }
    )

    // Mock console.log() so we do not see log messages in the test console
    global.console.log = jest.fn().mockImplementation()
})

afterEach(async () => {
    mock.restore()
})

it('checks if a directory exists', () => {
    expect(filesystem.exists('dir')).toBe(true)
    expect(filesystem.exists('dir2')).toBe(false)
})

it('checks if a file exists', () => {
    expect(filesystem.exists('dir/file1')).toBe(true)
    expect(filesystem.exists('dir/file2')).toBe(false)
})

it('checks if is a directory', () => {
    expect(filesystem.isDirectory('dir')).toBe(true)
    expect(filesystem.isDirectory('dir/file1')).toBe(false)
    expect(filesystem.isDirectory('dir2')).toBe(false)
})

it('checks if is a file', () => {
    expect(filesystem.isFile('dir')).toBe(false)
    expect(filesystem.isFile('dir/file1')).toBe(true)
    expect(filesystem.isFile('dir/file2')).toBe(false)
})

it('it creates a directory', () => {
    filesystem.createDirectory('dir/test')
    expect(filesystem.isDirectory('dir/test')).toBe(true)
})

it('it empties the directory recursively', () => {
    filesystem.emptyDirectory('dir')

    expect(filesystem.isDirectory('dir')).toBe(true)
    expect(filesystem.exists('dir/file1')).toBe(false)
    expect(filesystem.exists('dir/subDir')).toBe(false)
})

it('it throws an error if it empties a directory that does not exists', () => {
    expect(() => {
        filesystem.emptyDirectory('dir2')
    }).toThrow('directory dir2 does not exist')
})

it('it throws an error if it empties a file', () => {
    expect(() => {
        filesystem.emptyDirectory('dir/file1')
    }).toThrow('directory dir/file1 does not exist')
})

it('it copies files and directories from to destination', () => {
    filesystem.copy('dir', 'temp')

    expect(filesystem.isDirectory('temp')).toBe(true)
    expect(filesystem.isFile('temp/file1')).toBe(true)
    expect(filesystem.isDirectory('temp/subDir')).toBe(true)
    expect(filesystem.isFile('temp/subDir/file2')).toBe(true)
})

it('it throws an error if the directory/file to copy does not exists', () => {
    expect(() => {
        filesystem.copy('dir2', 'temp')
    }).toThrow('No such file or directory dir2')
})
