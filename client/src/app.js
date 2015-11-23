Trio.Module.import({
    'components': './src/common/components/index.js',
    'variables': './src/style/variables.js',
})

.and.import({
    'layoutModule': './src/modules/layout/layout.js',
    'headerModule': './src/modules/header/header.js',
    'canvasModule': './src/modules/canvas/canvas.js',
})

.then(function(ret) {
    var layout = ret.layoutModule.start();
    var header = ret.headerModule.start();
    var canvas = ret.canvasModule.start();
});
