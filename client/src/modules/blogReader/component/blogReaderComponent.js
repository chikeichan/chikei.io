Trio.Module.import({
    'blogReaderStyle'       : './src/modules/blogReader/component/style/blogReaderStyle.js',
    'blogReaderTemplate'    : './src/modules/blogReader/component/template/blogReaderTemplate.js'
})

.and.export('blogReaderComponent', function(ret) {
    var frag = ret.blogReaderTemplate.render();
    var style = Trio.Stylizer.createStyleTag(ret.blogReaderStyle);

    return Trio.Component.register({
        tagName: 'ck-blog-reader',

        fragment: frag,

        style: style,

        onCreate: function() {
            this.nav = this.shadowRoot.querySelector('.nav');
            this.reader = this.shadowRoot.querySelector('.blog-content');
        },

        renderBlog: function(el) {
            this.reader.innerHTML = '';
            this.reader.appendChild(el);
        }
    });
});
