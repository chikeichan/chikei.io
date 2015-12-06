Trio.Module.import([
    './src/modules/header/factory/headerFactory.js',
    './src/modules/header/component/headerComponent.js'
]).and.export(function(headerFactory, headerComponent) {
    var HeaderService = Trio.Service.extend({
        onStart: function() {
            var component = headerComponent.createElement();
            this.implement(new headerFactory({}));
            this.implement(component);
            this.broadcast('header:started', { header: component });
        }
    });

    var header = new HeaderService();
    return header;
});
