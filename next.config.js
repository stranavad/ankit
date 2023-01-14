/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
// 	enabled: process.env.ANALYZE === 'true'
// })


/** @type {import("next").NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		appDir: true
	},
	swcMinify: true,
	images: {
		domains: ["lh3.googleusercontent.com"]
	}
};

module.exports = nextConfig;

// module.exports = withBundleAnalyzer(nextConfig);
