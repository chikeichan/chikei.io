Trio.Module.export('layoutService', function() {

    var LayoutService = Trio.Service.extend({
        initialize: function(opts) {
            this.component = opts.component;
            this.factory   = opts.factory;
            document.body.appendChild(opts.component);
            this.component.changeBackground(this.factory.get('backgroundUrl'));
        }
    });

    return LayoutService;

});