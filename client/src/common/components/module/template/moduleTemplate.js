Trio.Module.export('moduleTemplate', function() {
    var tmpl = Trio.Renderer.createTemplate();

    tmpl.create('div.module-header')
            .create('div.module-title').append()
            .create('div.module-button')
                .create('div.button').addClass('close-module').append()
            .append()
        .appendLast()
        // .create('div.resizable').addClass('north').append()
        // .create('div.resizable').addClass('south').append()
        // .create('div.resizable').addClass('east').append()
        // .create('div.resizable').addClass('west').append()
        // .create('div.resizable').addClass('north-west').append()
        // .create('div.resizable').addClass('north-east').append()
        // .create('div.resizable').addClass('south-west').append()
        // .create('div.resizable').addClass('south-east').appendLast()

    return tmpl;
});