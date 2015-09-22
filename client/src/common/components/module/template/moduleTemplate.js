Trio.Module.export('moduleTemplate', function() {
    var tmpl = Trio.Renderer.createTemplate();

    tmpl.create('div.module-header')
            .create('div.module-title').append()
            .create('div.module-button')
                .create('div.button').addClass('close-module').append()
            .append()
        .append()
        .create('div.module-content').appendLast();

    return tmpl;
});