Trio.Module.export('headerTemplate', function() {
    var tmpl = Trio.Renderer.createTemplate();

    tmpl.create('ck-logo').append()
        .create('span.header-content').append()
        .create('ck-clock').appendLast();

    return tmpl;
});