module.exports = function(api) {
    api.cache(false);
    return {
        presets: ['babel-preset-expo'],
        plugins: [[
            'module:react-native-dotenv',
            {
                moduleName: '@env',
                verbose: false,

            },
        ], "nativewind/babel", "@babel/plugin-proposal-export-namespace-from",
            "react-native-reanimated/plugin"],
    };
};
