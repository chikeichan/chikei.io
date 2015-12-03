Trio.Module.import([
    './src/modules/canvas/factory/canvasFactory.js',
    './src/modules/canvas/component/canvasComponent.js'
]).and.export(function(canvasFactory, canvasComponent) {
    var CanvasService = Trio.Service.extend({
        onStart: function(opts) {
            var factory   = new canvasFactory({});
            var component = canvasComponent.createElement();
            this.implement(factory);
            this.implement(component);
            this.broadcast('canvas:started', {canvas:component});
            this.emit('render', factory.attributes);

            this.on('module:open', function(e) {
                this.openModule(e.detail);
            }.bind(this))
        },

        openModule: function(iconOpts) {
            // if (this.factory.activeModules[iconOpts.moduleId]) {
            //     return;
            // }

            var module = document.createElement('ck-module');
            // var data = this.factory.fetchModule(iconOpts.moduleId);

            // this.setActiveModule(iconOpts.moduleId, module);
            // module.addEventListener('destroy', this.clearActiveModule.bind(this, iconOpts.moduleId));

            // module.setTitle(data.moduleName);
            // setModuleSize.call(this);
            // module.setPosition({
            //     x: this.component.clientWidth/8,
            //     y: this.component.clientHeight/8
            // });

            // this.component.addToCanvas(module);
            this.emit('addModuleToCanvas', { module: module});
            // module.addModuleContent(blogReaderModule.create().component);

            // function setModuleSize() {
            //     if (data.size.height && data.size.width) {
            //         module.setSize({
            //             width: data.size.width,
            //             height: data.size.height
            //         });
            //     } else if (data.size.minHeight && data.size.minWidth) {
            //         module.setSize({
            //             width: data.size.minWidth,
            //             height: data.size.minHeight
            //         });
            //     } else {
            //         module.setSize({
            //             width: this.component.clientWidth/2,
            //             height: this.component.clientHeight/2
            //         });
            //     }
            // }
        },

        // setActiveModule: function(id, element) {
        //     this.factory.activeModules[id] = element;
        //     window.el = element
        // },

        // clearActiveModule: function(id) {
        //     delete this.factory.activeModules[id];
        // }
    });

    return new CanvasService();
});
