Trio.Module.export(function(ret) {
    var style = Trio.Stylizer.create();
        style.select(':host')
                .css({
                    'display': 'flex',
                    'flex': '1 0 auto',
                    'cursor': 'default'
                });

    var tmpl = Trio.Renderer.createTemplate();
        tmpl.open('style').text(style.toCSS.bind(style)).close()
            .each(function(d) {return d.icons;})
                .open('ck-icon')
                    .attr('data-module-id', function(icon) { return icon.moduleId; })
                    .data(function(icon) { return icon; })
                .close()
            .xeach();

    return Trio.Component.register({
        tagName: 'ck-canvas',
        template: tmpl,
        onCreate: function() {
            this.on('render', function(evt) {
                this.patch(evt.detail);
            }.bind(this));

            this.on('addModuleToCanvas', function(e) {
                this.shadowRoot.appendChild(e.detail.module);
            }.bind(this))
        }
    });
});
