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
    var layout = ret.layoutModule.create();
    var header = ret.headerModule.create();
    var canvas = ret.canvasModule.create();
    layout.addToHeader(header.component);
    layout.addToCanvas(canvas.component);
});
