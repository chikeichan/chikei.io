Trio.Module.export('layoutTemplate', function() {
    var tmpl = Trio.Renderer.createTemplate();

    tmpl.create('div#main')
            .create('div#canvas').append()
            .create('div#header').append()
        .appendLast()

    return tmpl;
});