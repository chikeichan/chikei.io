Trio.Module.import([
    './src/style/variables.js',
    './src/resources/index.js',
    './src/common/components/index.js',
    './src/modules/layout/layout.js',
    './src/modules/header/header.js',
    './src/modules/canvas/canvas.js',
    './src/modules/theme/theme.js'
]).and.then(function(variables, resources, components, layoutModule, headerModule, canvasModule) {
    var layout = layoutModule.start();
    var header = headerModule.start();
    var canvas = canvasModule.start();

});
