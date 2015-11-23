Trio.Module.export('variables', function() {
    var baseColor = '#000000';
    var layoutColor = '#FFFFFF';
    var themeColor = '#00B8FF';

    // var baseColor = '#FFFFFF';
    // var layoutColor = '#000000';
    // var themeColor = '#FF0081';
    var shadowColor = 'rgba(0, 0, 0, 0.4)';

    Trio.Stylizer.registerVariable('base-color', baseColor);
    Trio.Stylizer.registerVariable('layout-color', layoutColor);
    Trio.Stylizer.registerVariable('theme-color', themeColor);
    Trio.Stylizer.registerVariable('shadow-color', shadowColor);

});