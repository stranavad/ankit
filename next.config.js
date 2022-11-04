/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
/** @type {import("next").NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		appDir: true
	},
	swcMinify: true,
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")]
	},
	images: {
		domains: ["lh3.googleusercontent.com"]
	}
};

module.exports = nextConfig;
