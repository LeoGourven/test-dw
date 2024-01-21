const styleguide = require('@vercel/style-guide/prettier');

module.exports = {
    ...styleguide,
    useTabs: false,
    tabWidth: 4,
    singleQuote: true,
    trailingComma: 'none',
    printWidth: 100,
    plugins: [...styleguide.plugins, 'prettier-plugin-tailwindcss']
};
