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
            icon.setIconPic(iconOpts.iconUrl);
            icon.setIconName(iconOpts.iconName);
            icon.setPosition(iconOpts.position);
            this.component.addIcon(icon);
            this.component.addEventListener('dblclick', this.openModule.bind(this, iconOpts));
        },

        openModule: function(iconOpts) {
            console.log(iconOpts)
        }
    });

    return CanvasService;
});