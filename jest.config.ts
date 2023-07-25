export default {
	collectCoverage: true,
	preset: "ts-jest",
	// testEnvironment: "node",
	testEnvironment: "jsdom",
	testRegex: "^((?!int|e2e).)*.test.(ts|tsx)$",
	coverageDirectory: "../coverage",
	coverageProvider: "v8",
	moduleFileExtensions: ["js", "json", "ts", "tsx"],
	rootDir: "src",
	moduleNameMapper: {
		"^film-client/(.*)$": "<rootDir>/$1",
		"\\.(css|scss)$": "<rootDir>/utils/scss-mock.ts",
	},
	coveragePathIgnorePatterns: [
		"/node_modules/",
		"/in-memory*",
		".*\\.factory\\.ts$",
	],
	transform: {
		"^.+\\.tsx?$": [
			"ts-jest",
			{
				diagnostics: false,
				isolatedModules: true,
				jsx: "react",
				target: "es2017",
				allowJs: true,
			},
		],
	},
};
