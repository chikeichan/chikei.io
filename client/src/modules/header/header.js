Trio.Module.import({
    'headerFactory'          : './src/modules/header/factory/headerFactory.js',
    'headerComponent'        : './src/modules/header/component/headerComponent.js'
})

.and.export('headerModule', function(ret) {
    // return {
    //     create: function() {
    //         var factory = new ret.headerFactory({});
    //         var component = document.createElement('ck-header');
    //         var service = new ret.headerService({
    //             factory: factory,
    //             component: component
    //         });
    //         return service;
    //     }
    // };

    var HeaderService = Trio.Service.extend({
        onStart: function() {
            var component = ret.headerComponent.render();
            this.implement(new ret.headerFactory({}));
            this.implement(component);
            this.broadcast('header:started', { header: component });
        }
    });

    var header = new HeaderService();
    return header;
});
