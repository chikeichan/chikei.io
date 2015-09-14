Trio.Module.export('logoComponent', function() {
    var tmpl = Trio.Renderer.createTemplate();
    tmpl.create('div.logo-first').text('CHIKEI').append()
        .create('div.logo-last').text('CHAN').appendLast();
    var frag = tmpl.render();
    var style = Trio.Stylizer.createStyleTag({
        ':host': {
            'color': 'white',
            'display': 'inline-flex',
            'align-items': 'center',
            'height': '100%',
            'padding': '0 12px',
            'cursor': 'default'
         },
         '.logo-first': {
            'color': Trio.Stylizer.getVariable('theme-color'),
            'font-weight': '700',
            'font-size': '1.7em',
            'letter-spacing': '-2px'
         },
         '.logo-last': {
            'font-weight': '100',
            'font-size': '1.5em'
         }
    });

    return Trio.Component.register({
        tagName: 'ck-logo',
        fragment: frag,
        style: style
    });
});