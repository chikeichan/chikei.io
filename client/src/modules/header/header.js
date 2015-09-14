Trio.Module.import({
    'headerFactory'          : './src/modules/header/factory/headerFactory.js',
    'headerComponent'        : './src/modules/header/component/headerComponent.js',
    'headerService'          : './src/modules/header/service/headerService.js',
})

.and.export('headerModule', function(ret) {
    return {
        create: function() {
            var factory = new ret.headerFactory({});
            var component = document.createElement('ck-header');
            var service = new ret.headerService({
                factory: factory,
                component: component
            });
            return service;
        }
    };
});
