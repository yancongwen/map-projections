const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    root: true,
    extends: ['plugin:prettier/recommended', 'prettier/standard'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module'
    },
    ignorePatterns: [
        'node_modules/',
        'dist/',
        'public/',
        'build',
        'src/libs/*.js'
    ],
    rules: {
        // 0: "off", 1: "warn", 2: "error"
        'no-console': isDev ? 0 : 1,
        'no-debugger': isDev ? 0 : 2,
        indent: ['error', 4],
        semi: 0
    }
}
