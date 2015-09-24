Trio.Module.export('blogNavItemComponent', function(ret) {
    var itemTmpl = Trio.Renderer.createTemplate();
        itemTmpl.create('div.nav-item').appendLast();
    var frag = itemTmpl.render();
    var style = Trio.Stylizer.createStyleTag({
        '.nav-item': {
            'padding': '4px 4px 4px 16px',
            'font-weight': '100',
            'color': Trio.Stylizer.toRGBa(Trio.Stylizer.getVariable('layout-color'), 0.75),
            'font-size': '0.6em',
            'text-transform': 'capitalize',
            'cursor': 'pointer',
            'background-color': 'rgba(255, 255, 255, 0.1)',
            '-webkit-user-select': 'none',
            'white-space': 'nowrap',
            'text-overflow': 'ellipsis',
            'overflow': 'hidden',
            'flex': '1 0 auto'
        },
        '.nav-item:hover': {
            'background-color': 'rgba(255, 255, 255, 0.15)'
        },
        '.nav-item:active': {
            'background-color': 'rgba(255, 255, 255, 0.05)'
        }
    });

    return Trio.Component.register({
        tagName: 'ck-blog-item',

        fragment: frag,

        style: style,

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
