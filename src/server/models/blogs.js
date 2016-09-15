import fs from 'fs';
import path from 'path';
import md from 'markdown';
import marked from 'marked';
import prism from 'prismjs';

const renderer = new marked.Renderer();

// Change the code method to output the same as Prism.js would.
renderer.code = function(code, lang, escaped) {
  code = this.options.highlight(code, lang);

  if (!lang) {
    return '<pre><code>' + code + '\n</code></pre>';
  }

  // e.g. "language-js"
  const langClass = this.options.langPrefix + lang;

  return '<pre class="' + langClass + '"><code class="' + langClass + '">' +
    code +
    '</code></pre>\n';
};

// Translate marked languages to prism.
const extensions = {
  js: 'javascript',
  scss: 'css',
  sass: 'css',
  html: 'markup',
  svg: 'markup',
  xml: 'markup',
  py: 'python',
  rb: 'ruby',
  ps1: 'powershell',
  psm1: 'powershell'
};

marked.setOptions({
  renderer,
  gfm: true,
  langPrefix: 'language-',
  highlight(code, lang) {
    if (!prism.languages.hasOwnProperty(lang)) {
      // Default to markup.
      lang = extensions[lang] || 'markup';
    }

    return prism.highlight(code, prism.languages[lang]);
  }
});

export default class Blogs {
  static getBlog(filename, cb) {
    fs.readFile(`${process.cwd()}/blogs/tutorials/${filename}`, {encoding: "utf-8"}, (err, data) => {
      if (err) {
        return cb(err, null);
      }

      try {
        const appData = this.getAppData(data);
        cb(null, {
          id: `BLOG__${filename.toUpperCase()}`,
          type: 'BLOG',
          name: appData.metadata.title,
          buttons: ['MINIMIZE', 'MAXIMIZE', 'CLOSE'],
          actions: ['FILE', 'VIEW', 'HELP'],
          x: 150,
          y: 70,
          appData
        });
      } catch (e) {
        cb(e, null);
      }
    });
  }

  static getAppData(content) {
    const list = content.split('****METADATA****');

    return {
      metadata: JSON.parse(list[0]),
      markdown: marked(list[1])
    };
  }
}
