import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

/**
 * @param {import('rollup').RollupOptions} config
 * @returns {import('rollup').RollupOptions}
 */
const bundle = config => ({
	...config,
	input: 'src/ScrollThumb.tsx',
	external: (id) => !/^[./]/.test(id)
})

export default [
	bundle({
		plugins: [esbuild()],
		output: [
			{
				file: `scrollthumb.js`,
				format: 'cjs',
				sourcemap: true,
			},
			{
				file: `scrollthumb.mjs`,
				format: 'es',
				sourcemap: true,
			},
		],
	}),
	bundle({
		plugins: [dts()],
		output: {
			file: `scrollthumb.d.ts`,
			format: 'es',
		},
	}),
]
