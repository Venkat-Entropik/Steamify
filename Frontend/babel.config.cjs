module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
        ['@babel/preset-react', { runtime: 'automatic' }],
    ],
    plugins: [
        'babel-plugin-transform-import-meta',
        ['babel-plugin-transform-define', {
            'import.meta.env': {
                VITE_API_URL: 'http://localhost:5001/api',
                MODE: 'test'
            }
        }]
    ]
};
