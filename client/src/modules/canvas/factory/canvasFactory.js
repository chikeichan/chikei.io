Trio.Module.export('canvasFactory', function() {
    var CanvasFactory = Trio.Factory.extend({
        defaults: {
            icons: [
                {
                    iconUrl: '/src/images/icons/icon-blog-48.png',
                    iconName: 'Blogs',
                    position: {
                        x: 4,
                        y: 4
                    }
                },
                // {
                //     iconUrl: '/src/images/icons/icon-blog-48.png',
                //     iconName: 'Blogs',
                //     position: {
                //         x: 4,
                //         y: 104
                //     }
                // }
            ]
        }
    });

    return CanvasFactory;
});