Trio.Module.import({
    'layoutFactory'          : './src/modules/layout/factory/layoutFactory.js',
    'layoutComponent'        : './src/modules/layout/component/layoutComponent.js'
})

.and.export('layoutModule', function(ret) {
    var LayoutService = Trio.Service.extend({
        onStart: function() {
            var component = ret.layoutComponent.render();
            var factory   = new ret.layoutFactory();
            document.body.appendChild(component);
            this.implement(factory);
            this.implement(component);
            this.emit('render', factory.attributes);
        }
    });

    var layout = new LayoutService();
    return layout;
});
