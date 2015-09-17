Trio.Module.export('layoutStyle', function() {
    var style = {
       ':host': {
           'display': 'flex',
           'flex': '1 1 auto',
           'width': '100%',
           'height': '100%',
           'flex-flow': 'column nowrap'
       },
       '#header': {
           'display': 'flex',
           'background-color': Trio.Stylizer.toRGBa(Trio.Stylizer.getVariable('base-color'), 0.9),
           'width': '100%',
           'height': '50px',
           'flex-shrink': '0'
       },
       '#canvas': {
           'display': 'flex',
           'width': '100%',
           'overflow': 'auto',
           'flex': '1 0 auto'
       },
       '#main': {
           'display': 'flex',
           'flex': '0 1 auto',
           'flex-flow': 'column nowrap',
           'height': '100%'
       }
  };

   return style;
});