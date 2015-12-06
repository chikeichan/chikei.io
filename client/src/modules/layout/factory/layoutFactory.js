Trio.Module.export(function() {
    var LayoutFactory = Trio.Factory.extend({
        initialize: function() {
            this.sync('ViewConfig', function(d) {
            	if (d && d.attributes) {
	            	this.attributes.backgroundUrl = d.attributes.backgroundUrl;
	            	this.emit('update:background', this.attributes.backgroundUrl);
            	}
            }.bind(this));
        }
    });

    return LayoutFactory;
});