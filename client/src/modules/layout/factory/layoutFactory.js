Trio.Module.export('layoutFactory', function() {
    var LayoutFactory = Trio.Factory.extend({
        defaults: {
            backgroundUrl: './src/images/wallpaper_default.jpg'
        }
    });
    
    return LayoutFactory;
});