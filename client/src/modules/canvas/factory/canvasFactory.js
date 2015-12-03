var viewConfig = {
    icons: [
        {
            iconUrl: './src/images/icons/icon-blog-48.png',
            iconName: 'Blog Reader',
            position: {
                x: 4,
                y: 4
            },
            moduleId: 'Y2hpa2VpLmlvIEJsb2dz'
        },
        // {
        //     iconUrl: '/src/images/icons/icon-blog-48.png',
        //     iconName: 'Demo',
        //     position: {
        //         x: 4,
        //         y: 104
        //     }
        // }
    ]
}

var modulesInfo = {
    'Y2hpa2VpLmlvIEJsb2dz': {
        moduleName: 'Blog Reader',
        moduleId: 'Y2hpa2VpLmlvIEJsb2dz',
        moduleType: 'application',
        size: {
            minWidth: 800,
            minHeight: 600,
            width: null,
            height: null,
            maxWidth: null,
            maxHeight: null
        },
        context: {
            appType: 'blog'
        }
    }
}

Trio.Module.export(function() {
    var CanvasFactory = Trio.Factory.extend({
        initialize: function() {
            this.attributes = viewConfig;
        }

        // fetchViewConfig: function() {
        //     this.set(viewConfig);
        //     return viewConfig;
        // },

        // fetchModule: function(id) {
        //     return modulesInfo[id];
        // }
    });

    return CanvasFactory;
});