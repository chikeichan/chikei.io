Trio.Module.export('layoutStyle', function() {
    var themeColor = Trio.Stylizer.getVariable('theme-color')
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
           'background-color': Trio.Stylizer.getVariable('header-color'),
           'width': '100%',
           'height': '50px',
           'flex-shrink': '0'
       },
       '#canvas': {
           'display': 'flex',
           'width': '100%',
           'overflow': 'auto',
           'flex': '1 0 auto',
           'background-size': 'cover',
           'background-repeat': 'no-repeat',
           'background-position': 'center center'
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