Trio.Module.export('headerStyle', function() {
    var style = {
        ':host': {
            'display': 'flex',
            'flex': '1 0 auto',
            'flex-flow': 'row nowrap',
            'height': '100%'
        },
        '.header-content': {
            'color': 'white',
            'display': 'inline-flex',
            'align-items': 'center',
            'height': '100%',
            'flex': '1 0 auto',
            'border': '1px solid rgba(255, 255, 255, 0.1)',
            'border-top': 'none',
            'border-bottom': 'none',
         }
    };

     return style;
});