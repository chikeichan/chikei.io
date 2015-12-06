Trio.Module.export(function(ret) {
    var style = Trio.Stylizer.create();
        style.select(':host')
                .css({
                    'display': 'flex',
                    'flex': '1 0 auto',
                    'flex-flow': 'row nowrap',
                    'height': '100%',
                    'background-color': 'rgba($base-color, 0.9)'
                })
            .select('.header-content')
                .css({
                    'color': 'white',
                    'display': 'inline-flex',
                    'align-items': 'center',
                    'height': '100%',
                    'flex': '1 0 auto',
                    'border': '1px solid rgba($layout-color, 0.1)',
                    'border-top': 'none',
                    'border-bottom': 'none',
                });

    var tmpl = Trio.Renderer.createTemplate();

        tmpl.open('style').text(style.toCSS.bind(style)).close()
            .open('ck-logo').close()
            .open('span.header-content').close()
            .open('ck-clock').close();

    return Trio.Component.register({
        tagName: 'ck-header',
        template: tmpl
    });
});
