import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import autoPreprocess from "svelte-preprocess"

const production = !process.env.ROLLUP_WATCH;

export default {
    input: "src/main.js",
    output: {
        sourcemap: true,
        name: "app",
        file: "public/dist/bundle.js",
        format: "iife"
    },
    plugins: [
        svelte({
            preprocess: autoPreprocess(),

            // By default, all .svelte and .html files are compiled
            extensions: [".svelte"],

            // enable run-time checks when not in production
            dev: !production,

            // we"ll extract any component CSS out into
            // a separate file — better for performance
            css: css => {
                css.write("public/dist/bundle.css");
            },
        }),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration —
        // consult the documentation for details:
        // https://github.com/rollup/rollup-plugin-commonjs
        babel(),
        resolve(),
        commonjs(),
        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        !production && livereload("public"),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser()
    ],
    watch: {
		clearScreen: false
    }
}