module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@next/next/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: "ulst",
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint"],
	rules: {
		quotes: ["warn", "double"],
		semi: ["warn", "always"],
	},
};
