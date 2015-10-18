Trio.Module.export('layoutTemplate', function() {
    var tmpl = Trio.Renderer.createTemplate();

    tmpl.open('div#main')
            .open('div#canvas').close()
            .open('div#header').close()
        .close()

    return tmpl;
});