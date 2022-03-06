import { defineConfig } from "rollup";
import image from "@rollup/plugin-image";
import commonjs from "@rollup/plugin-commonjs";
import css from "rollup-plugin-css-only";
import nodeResolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import posthtml from "rollup-plugin-posthtml-template";
import { createFilter } from "@rollup/pluginutils";
import { terser } from "rollup-plugin-terser";
import copy from "rollup-plugin-copy";
import { marked } from "marked";
import prism from "prismjs";

const production = !process.env.ROLLUP_WATCH;
function md() {
  const filter = createFilter("**/*.md");
  marked.setOptions({
    highlight: (code, lang) => {
      if (prism.languages[lang]) {
        return prism.highlight(code, prism.languages[lang], lang);
      } else {
        return code;
      }
    },
  });
  const escape = (code) => code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  var renderer = new marked.Renderer();
  renderer.code = function (code, language, escaped) {
    return `<pre ${
      language === "bash" || language === "shell" ? 'data-prefix="$"' : ""
    } class="language-${language} mockup-code"><code>${escape(
      code
    )}</code></pre>`;
  };
  marked.use({
    renderer,
  });
  return {
    name: "md",
    async transform(code, id) {
      if (!filter(id)) return;
      return {
        code: `export default ${JSON.stringify(
          marked(code, { headerIds: true })
        )}`,
        map: { mappings: "" },
      };
    },
  };
}
function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn("npm", ["start"], {
        stdio: ["ignore", "inherit", "inherit"],
        shell: true,
      });

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

export default defineConfig({
  input: "src/index.js",
  output: {
    name: "app",
    format: "iife",
    file: "build/build.js",
  },
  plugins: [
    !production && image(),
    commonjs(),
    css({
      output: "build.css",
    }),
    nodeResolve({
      browser: true,
      dedupe: ["dativejs"],
    }),
    posthtml({
      include: "**/*.dative.html",
    }),
    md(),
    !production && serve(),
    terser(),
    production &&
      copy({
        verbose: true,
        targets: [
          {
            src: "index.html",
            dest: "dist",
            transform: (contents, filename) =>
              contents
                .toString()
                .replace(
                  '<script src="build/build.js"></script>',
                  '<script src="build.js"></script>'
                )
                .replace(
                  '<link rel="stylesheet" href="build/build.css" />',
                  '<link rel="stylesheet" href="build.css" />'
                ),
          },
          {
            src: "guide/index.html",
            dest: "dist/guide",
            transform: (contents, filename) =>
              contents
                .toString()
                .replace(
                  '<script src="/build/build.js"></script>',
                  '<script src="/build.js"></script>'
                )
                .replace(
                  '<link rel="stylesheet" href="/build/build.css" />',
                  '<link rel="stylesheet" href="/build.css" />'
                ),
          },
          {
            src: "build/build.js",
            dest: "dist",
            transform: (contents, filename) =>
              contents
                .toString()
                .replace(
                  `!function(e,t){e&&!e.getElementById("livereloadscript")&&((t=e.createElement("script")).async=1,t.src="//"+(self.location.host||"localhost").split(":")[0]+":35729/livereload.js?snipver=1",t.id="livereloadscript",e.getElementsByTagName("head")[0].appendChild(t))}(self.document),`,
                  '!'
                ),
          },
          { src: "build/build.css", dest: "dist" },
          { src: "public/fonts", dest: "dist/public" },
          { src: "public/*.png", dest: "dist/public" },
        ],
      }),
    !production && livereload(),
  ],
});
