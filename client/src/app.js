Trio.Module.import([
    './src/style/variables.js',
    './src/common/components/index.js',
    './src/modules/layout/layout.js',
    './src/modules/header/header.js',
    './src/modules/canvas/canvas.js'
]).and.then(function(variables, components, layoutModule, headerModule, canvasModule) {
    var layout = layoutModule.start();
    var header = headerModule.start();
    var canvas = canvasModule.start();
});
