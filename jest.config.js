module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  testPathIgnorePatterns: ["^<rootDir>/dist/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  "collectCoverageFrom": [
    "**/src/**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**"
  ],
};