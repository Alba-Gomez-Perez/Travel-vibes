export default {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
        "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/src/tests/__mocks__/fileMock.js",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
