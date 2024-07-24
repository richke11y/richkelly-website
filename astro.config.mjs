import { defineConfig } from 'astro/config';
import prefetch from '@astrojs/prefetch';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
const env = process.env.NODE_ENV;

let config = {
	site: 'https://www.richkelly.uk',
	base: './',
	compressHTML: env === 'development' ? false : true,
	build: {
		inlineStylesheets: env === 'development' ? 'never' : 'auto'
	}
};

switch (true) {
	case env === 'development':
		config.site = 'https://development--richkelly-website.netlify.app/';
	break;
	case env === 'staging':
		config.site = 'https://staging--richkelly-website.netlify.app/';
	break;
};

// https://astro.build/config
export default defineConfig({
	srcDir: './src',
	publicDir: './public',
	cacheDir: './cache',
	site: config.site,
	compressHTML: config.compressHTML,
	base: config.base,
	image: {
		remotePatterns: [{
			protocol: "https",
			hostname: '**.richkelly.uk'
		}],
		domains: [
			'richkelly.uk'
		]
	},
	output: 'static',
	build: {
		format: 'directory',
		assets: 'dist',
		inlineStylesheets: config.build.inlineStylesheets
	},
	integrations: [
		prefetch(),
		icon(),
		sitemap()
	]
});