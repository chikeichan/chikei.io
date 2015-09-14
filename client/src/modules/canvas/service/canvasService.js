Trio.Module.export('canvasService', function() {
    var CanvasService = Trio.Service.extend({
        initialize: function(opts) {
            this.component = opts.component;
            this.factory = opts.factory;
            this.addAllIcons(this.factory.clone());
        },

        addAllIcons: function(d) {
            var icons = d.icons || [];
            icons.forEach(function(icon) {
                this.addIcon(icon);
            }.bind(this))
        },

        addIcon: function(iconOpts) {
            var icon = document.createElement('ck-icon');
            icon.addEventListener('dblclick', this.openModule.bind(this, iconOpts));
            icon.setIconPic(iconOpts.iconUrl);
            icon.setIconName(iconOpts.iconName);
            icon.setPosition(iconOpts.position);
            this.component.addToCanvas(icon);
        },

        openModule: function(iconOpts) {
            var module = document.createElement('ck-module');
            var iframe = document.createElement('iframe');
            iframe.src = 'https://treeify.herokuapp.com';
            module.setTitle(iconOpts.iconName);
            module.addModuleContent(iframe);
            this.component.addToCanvas(module);
        }
    });

    return CanvasService;
});