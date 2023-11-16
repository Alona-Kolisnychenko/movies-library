import postcss from "rollup-plugin-postcss";
// import css from "rollup-plugin-import-css";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
    input: "src/app.js",
    output: {
        dir: "dist",
        format: "iife",
    },
    plugins: [
        postcss({
            extract: "app.css",
        }),
        // css(),
        nodeResolve()
    ],
}