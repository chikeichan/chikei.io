Trio.Module.export('blogNavItemComponent', function(ret) {
    var style = Trio.Stylizer.create();
        style.select('.nav-item')
                .css({
                    'padding': '4px 4px 4px 16px',
                    'font-weight': '100',
                    'color': 'rgba($layout-color, 0.75)',
                    'font-size': '0.6em',
                    'text-transform': 'capitalize',
                    'cursor': 'pointer',
                    'background-color': 'rgba(0, 0, 0, 0.05)',
                    '-webkit-user-select': 'none',
                    'white-space': 'nowrap',
                    'text-overflow': 'ellipsis',
                    'overflow': 'hidden',
                    'flex': '1 0 auto'
                })
            .select('.nav-item:hover')
                .css({
                    'background-color': 'rgba(0, 0, 0, 0)'
                })
            .select('.nav-item:active')
                .css({
                    'background-color': 'rgba(0, 0, 0, 0.1)'
                })

    var tmpl = Trio.Renderer.createTemplate();
        tmpl.open('style').text(style.toCSS.bind(style)).close()
            .open('div.nav-item').close();

    return Trio.Component.register({
        tagName: 'ck-blog-item',

        template: tmpl,

        events: {
            'click .nav-item': 'didClickItem'
        },

        onCreate: function() {
            this.itemTitle = this.shadowRoot.querySelector('.nav-item');
        },

        renderItemTitle: function(d) {
            this.itemTitle.textContent = d.title;
        },

        didClickItem: function(e) {
            e.stopImmediatePropagation();
            this.dispatchEvent(new CustomEvent('openBlog', {detail: this.threadId}));
        }
    });
});
