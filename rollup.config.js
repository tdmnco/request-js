// Imports:
import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { uglify } from 'rollup-plugin-uglify'

// Exports:
export default {
  input: 'src/js/request.js',
  output: {
    compact: true,
    file: 'dist/js/request.js',
    format: 'cjs',
    name: 'Request'
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    }),
    uglify()
  ]
}