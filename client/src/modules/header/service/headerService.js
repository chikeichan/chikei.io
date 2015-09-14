Trio.Module.export('headerService', function() {
    var HeaderService = Trio.Service.extend({
        initialize: function(opts) {
            this.component = opts.component;
        }
    });

    return HeaderService;
});