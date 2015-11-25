Trio.Module.export('logoComponent', function() {
    var style = Trio.Stylizer.create();
        style.select(':host')
                .css({
                    'color': '$layout-color',
                    'display': 'inline-flex',
                    'align-items': 'center',
                    'height': '100%',
                    'padding': '0 12px',
                    'cursor': 'default'
                 })
            .select('.logo-first')
                .css({
                    'color': '$theme-color',
                    'font-weight': '700',
                    'font-size': '1.7em',
                    'letter-spacing': '-2px'
                 })
            .select('.logo-last')
                .css({
                    'font-weight': '100',
                    'font-size': '1.5em'
                });

    var tmpl = Trio.Renderer.createTemplate();
        tmpl.open('style').text(style.toCSS.bind(style)).close()
            .open('span.logo-first').text('CHIKEI').close()
            .open('span.logo-last').text('CHAN').close();


    return Trio.Component.register({
        tagName: 'ck-logo',
        template: tmpl,
    });
});