Trio.Module.import({
    'blogNavComponent'  : './src/modules/blogReader/component/blogNavComponent.js',
})

.and.export('blogReaderTemplate', function() {
    var tmpl = Trio.Renderer.createTemplate();

    tmpl.open('ck-blog-nav').close()
        .open('div.blog-content').close();

    return tmpl;
});