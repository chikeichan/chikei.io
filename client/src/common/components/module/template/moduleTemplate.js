Trio.Module.export('moduleTemplate', function() {
    var tmpl = Trio.Renderer.createTemplate();

    tmpl.open('div.module-header')
            .open('div.module-title').close()
            .open('div.module-button')
                .open('div.button').addClass('close-module').close()
            .close()
        .close()
        .open('div.module-content').close();

    return tmpl;
});