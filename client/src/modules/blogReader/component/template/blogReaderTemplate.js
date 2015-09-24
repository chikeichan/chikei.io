Trio.Module.import({
    'blogNavComponent'  : './src/modules/blogReader/component/blogNavComponent.js',
})

.and.export('blogReaderTemplate', function() {
    var tmpl = Trio.Renderer.createTemplate();

    tmpl.create('ck-blog-nav').append()
        .create('div.blog-content').appendLast();

    return tmpl;
});