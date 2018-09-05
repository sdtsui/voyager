module.exports = {
  testMatch: ["**/unit/specs/**/*spec.js"],
  moduleFileExtensions: ["js", "vue"],
  moduleDirectories: ["app/node_modules", "node_modules", "src"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/app/src/$1",
    "^app/(.*)$": "<rootDir>/app/$1",
    "^renderer/(.*)$": "<rootDir>/app/src/renderer/$1",
    "^common/(.*)$": "<rootDir>/app/src/renderer/components/common/$1",
    "^govern/(.*)$": "<rootDir>/app/src/renderer/components/govern/$1",
    "^monitor/(.*)$": "<rootDir>/app/src/renderer/components/monitor/$1",
    "^staking/(.*)$": "<rootDir>/app/src/renderer/components/staking/$1",
    "^scripts/(.*)$": "<rootDir>/app/src/renderer/scripts/$1",
    "^wallet/(.*)$": "<rootDir>/app/src/renderer/components/wallet/$1",
    "^variables$": "<rootDir>/app/src/renderer/styles/variables.styl"
  },

  transform: {
    ".*\\.js$": "<rootDir>/node_modules/babel-jest",
    ".*\\.vue$": "<rootDir>/node_modules/vue-jest"
  },

  transformIgnorePatterns: ["node_modules/(?!@tendermint/ui|.*vue)"],

  collectCoverage: true,
  mapCoverage: true,
  coverageDirectory: "./test/unit/coverage",
  coverageReporters: ["lcov"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/build/",
    "/dist/",
    "/test/",
    "/app/src/config.js"
  ],
  testURL: "http://localhost"
}
