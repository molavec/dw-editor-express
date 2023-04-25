module.exports = {
  env: {
    node: true,
  },
  rules: {
    indent: ['warn', 2],
    quotes: ['warn', 'single'],
    semi: ['warn', 'always'],
    'max-len': ['warn', { 'code': 100 }],
    'comma-dangle': ['warn', 'always-multiline'],
  },
};
