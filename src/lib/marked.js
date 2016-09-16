import marked from 'marked';
import prism from './prism';

const renderer = new marked.Renderer();

// Change the code method to output the same as Prism.js would.
renderer.code = function(code, lang, escaped) {
  code = this.options.highlight(code, lang);

  if (!lang) {
    return `<pre><code>${code}\n</code></pre>`;
  }

  // e.g. "language-js"
  const langClass = this.options.langPrefix + lang;

  return `<pre class="${langClass}"><code class="${langClass}">${code}</code></pre>\n`;
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
  gfm: true,
  renderer: renderer,
  langPrefix: 'language-',
  highlight: function(code, lang) {
    if (!prism.languages.hasOwnProperty(lang)) {
      // Default to markup.
      lang = extensions[lang] || 'markup';
    }

    return prism.highlight(code, prism.languages[lang]);
  }
});

export default marked;