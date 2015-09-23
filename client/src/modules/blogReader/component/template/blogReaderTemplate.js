Trio.Module.export('blogReaderTemplate', function() {
    var tmpl = Trio.Renderer.createTemplate();

    tmpl.create('div.nav').append()
        .create('div.blog-content').appendLast();

    return tmpl;
});