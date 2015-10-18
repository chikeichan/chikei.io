Trio.Module.export('blogNavItemComponent', function(ret) {
    var itemTmpl = Trio.Renderer.createTemplate();
        itemTmpl.open('div.nav-item').close();
    var frag = itemTmpl.render();
    var style = Trio.Stylizer.createStyleTag({
        '.nav-item': {
            'padding': '4px 4px 4px 16px',
            'font-weight': '100',
            'color': Trio.Stylizer.toRGBa(Trio.Stylizer.getVariable('layout-color'), 0.75),
            'font-size': '0.6em',
            'text-transform': 'capitalize',
            'cursor': 'pointer',
            'background-color': 'rgba(0, 0, 0, 0.05)',
            '-webkit-user-select': 'none',
            'white-space': 'nowrap',
            'text-overflow': 'ellipsis',
            'overflow': 'hidden',
            'flex': '1 0 auto'
        },
        '.nav-item:hover': {
            'background-color': 'rgba(0, 0, 0, 0)'
        },
        '.nav-item:active': {
            'background-color': 'rgba(0, 0, 0, 0.1)'
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
