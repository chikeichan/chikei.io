Trio.Module.export(function() {
    var style = Trio.Stylizer.create();
        style.select(':host')
                .css({
                    'display': 'flex',
                    'flex': '1 1 auto',
                    'width': '100%',
                    'height': '100%',
                    'flex-flow': 'column nowrap'
               })
            .select('#header')
                .css({
                    'display': 'flex',
                    'background-color': 'rgba($base-color, 0.9)',
                    'width': '100%',
                    'height': '50px',
                    'flex-shrink': '0'
                })
            .select('#canvas')
                .css({
                    'display': 'flex',
                    'width': '100%',
                    'overflow': 'auto',
                    'flex': '1 0 auto'
                })
            .select('#main')
                .css({
                    'display': 'flex',
                    'flex': '0 1 auto',
                    'flex-flow': 'column nowrap',
                    'height': '100%'
                });

    var tmpl = Trio.Renderer.createTemplate();
        tmpl.open('style').text(style.toCSS.bind(style)).close()
            .open('div#main')
                .open('div#canvas')
                    .style('background-image', function(d) { return 'url(' + d.backgroundUrl + ')';})
                .close()
                .open('div#header').close()
            .close();

    var LayoutComponent = Trio.Component.register({
        tagName: 'ck-layout',
        template: tmpl,
        onCreate: function() {
            this.header   = this.shadowRoot.querySelector('#header');
            this.canvas   = this.shadowRoot.querySelector('#canvas');
            this.main     = this.shadowRoot.querySelector('#main');

            this.on('header:started', function(d) {
                this.header.innerHTML = '';
                this.header.appendChild(d.detail.header);
            }.bind(this));

            this.on('canvas:started', function(d) {
                this.canvas.innerHTML = '';
                this.canvas.appendChild(d.detail.canvas);
            }.bind(this));

            this.on('render', function(d) {
                this.patch(d.detail);
            }.bind(this));
        },

        changeBackground: function(url) {
            this.main.style['background-image'] = 'url(' + url + ')';
        }
    });

    return LayoutComponent;

});

