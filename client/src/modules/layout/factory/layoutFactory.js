Trio.Module.export(function() {
    var LayoutFactory = Trio.Factory.extend({
        initialize: function() {
            this.attributes.backgroundUrl = './src/images/wallpaper_default.jpg'
        }
    });

    return LayoutFactory;
});