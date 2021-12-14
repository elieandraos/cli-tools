const esbuild = require('esbuild')
const { nodeExternalsPlugin } = require('esbuild-node-externals')

esbuild
    .build({
        entryPoints: ['src/index.js'],
        bundle: true,
        minify: true,
        logLevel: 'info',
        platform: 'node',
        outfile: 'dist/index.js',
        plugins: [nodeExternalsPlugin()],
    })
    .catch(() => {
        process.exit(1)
    })
