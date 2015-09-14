Trio.Module.import({
    'variables': './src/style/variables.js'
})

.and.import({
    'layoutModule': './src/modules/layout/layout.js',
})

.then(function(ret) {
    var layout = ret.layoutModule.create();
});
