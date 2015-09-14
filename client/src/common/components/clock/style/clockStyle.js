Trio.Module.export('clockStyle', function() {
      var style = {
         ':host': {
            'color': 'white',
            'display': 'inline-flex',
            'align-items': 'center',
            'height': '100%',
            'padding': '0 12px',
            'cursor': 'pointer'
         },
         ':host(:hover)': {
            'background-color': 'rgba(255, 255, 255, 0.1)'
         },
         ':host(:active)': {
            'background-color': 'rgba(0, 0, 0, 0.1)'
         },
         'span': {
            '-webkit-user-select': 'none',
         },
         '.clock-day': {
            'margin-right': '0.2em',
            'color': Trio.Stylizer.getVariable('theme-color'),
            'font-weight': '700'
         },
         '.clock-minute': {
            'margin-right': '0.1em'
         }
    };

     return style;
});