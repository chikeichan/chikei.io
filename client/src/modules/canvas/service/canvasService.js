Trio.Module.import({
    'blogReaderModule': './src/modules/blogReader/blogReader.js'
})

.and.export('canvasService', function(ret) {
    var CanvasService = Trio.Service.extend({
        initialize: function(opts) {
            this.component = opts.component;
            this.factory = opts.factory;
            this.factory.fetchViewConfig();
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
            if (this.factory.activeModules[iconOpts.moduleId]) {
                return;
            }

            var module = document.createElement('ck-module');
            var data = this.factory.fetchModule(iconOpts.moduleId);

            this.setActiveModule(iconOpts.moduleId, module);
            module.addEventListener('destroy', this.clearActiveModule.bind(this, iconOpts.moduleId));

            module.setTitle(data.moduleName);
            setModuleSize.call(this);
            module.setPosition({
                x: this.component.clientWidth/8,
                y: this.component.clientHeight/8
            });

            this.component.addToCanvas(module);
            module.addModuleContent(ret.blogReaderModule.create().component);

            function setModuleSize() {
                if (data.size.height && data.size.width) {
                    module.setSize({
                        width: data.size.width,
                        height: data.size.height
                    });
                } else if (data.size.minHeight && data.size.minWidth) {
                    module.setSize({
                        width: data.size.minWidth,
                        height: data.size.minHeight
                    });
                } else {
                    module.setSize({
                        width: this.component.clientWidth/2,
                        height: this.component.clientHeight/2
                    });
                }
            }
        },

        setActiveModule: function(id, element) {
            this.factory.activeModules[id] = element;
            window.el = element
        },

        clearActiveModule: function(id) {
            delete this.factory.activeModules[id];
        }
    });

    return CanvasService;
});