module.exports = {
    "extends": "airbnb-base",
    "overrides": [
        {
            "files": '*.js',
            "rules": {
                "no-unused-expressions": "off",
                "no-shadow": "off",
                "no-param-reassign": [2, {"props": false}],
                "max-len": [2, 150, 4, {"ignoreUrls": true}]
            }
        }
    ]
};