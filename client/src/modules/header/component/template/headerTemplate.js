Trio.Module.export('headerTemplate', function() {
    var tmpl = Trio.Renderer.createTemplate();

    tmpl.open('ck-logo').close()
        .open('span.header-content').close()
        .open('ck-clock').close();

    return tmpl;
});