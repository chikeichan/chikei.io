Trio.Module.import([
    './src/modules/layout/factory/layoutFactory.js',
    './src/modules/layout/component/layoutComponent.js'
]).and.export(function(layoutFactory, layoutComponent) {
    var LayoutService = Trio.Service.extend({
        onStart: function() {
            var component = layoutComponent.createElement();
            var factory   = new layoutFactory();
            document.body.appendChild(component);
            this.implement(factory);
            this.implement(component);
            this.emit('update:background', factory.attributes.backgroundUrl);
        }
    });

    var layout = new LayoutService();
    return layout;
});
