module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true,
  },
  'extends': 'google',
  'overrides': [
    {
      'env': {
        "node": true,
        "amd": true,
        "es6": true
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script',
      },
    },
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
  },
  "rules": {
    "new-cap":"off",
    "keyword-spacing":"off", // if else 
    "indent": "off", // 
    "no-trailing-spaces" : "off",
    "camelcase" : "off",
    "max-len": "off",
    "linebreak-style": "off",
    "object-curly-spacing": ["error", "always"],
    "quotes": [
      2,
      "single",
      {
        "avoidEscape": true
      }
    ]
  },
};
