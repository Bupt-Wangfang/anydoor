module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "globals":{
        "document": true,
        "localStorage": true,
        "window": true,
        "process": true
    },
    "parser": "babel-eslint",
    "extends": [
        'eslint-config-alloy'
    ],
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {"indent": [
            "error",
        ],
        "linebreak-style": [
            "off"
        ],
        "semi": [
            2, "always"
        ],
        "no-console": [
            "off"
        ]
    }
};