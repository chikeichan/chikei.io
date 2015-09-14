Trio.Module.export('layoutFactory', function() {
    var LayoutFactory = Trio.Factory.extend({
        defaults: {
            backgroundUrl: 'http://images7.alphacoders.com/343/343662.jpg'
        }
    });
    
    return LayoutFactory;
});