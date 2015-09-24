Trio.Module.export('blogReaderStyle', function() {
    var style = {
        ':host': {
            'display': 'flex',
            'flex-flow': 'row nowrap',
            'flex': '1 0 auto',
            'width': '100%'
        },
        '.blog-content': {
            'width': '100%',
            'display': 'flex',
            'flex-flow': 'column nowrap',
            'padding': '12px',
            'overflow-y': 'scroll'
        }
    };

     return style;
});