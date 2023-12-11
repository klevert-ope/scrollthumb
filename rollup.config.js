import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
	input: './src/component/ScrollThumb.jsx',
	output: {
		file: 'dist/index.js',
		format: 'es',
	},
	plugins: [
		resolve(),
		commonjs(),
		babel({
			exclude: 'node_modules/**',
			presets: ['@babel/preset-react'],
			babelHelpers: 'bundled',
		}),
	],
	external: ['react', 'react-dom', 'prop-types'],
};
