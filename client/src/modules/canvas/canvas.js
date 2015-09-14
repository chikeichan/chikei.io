Trio.Module.import({
    'canvasFactory'          : './src/modules/canvas/factory/canvasFactory.js',
    'canvasComponent'        : './src/modules/canvas/component/canvasComponent.js',
    'canvasService'          : './src/modules/canvas/service/canvasService.js',
})

.and.export('canvasModule', function(ret) {
    return {
        create: function() {
            var factory = new ret.canvasFactory({});
            var component = document.createElement('ck-canvas');
            var service = new ret.canvasService({
                factory: factory,
                component: component
            });
            return service;
        }
    };
});
