Trio.Module.export('blogNavFolderComponent', function(ret) {
    var folderTmpl = Trio.Renderer.createTemplate();
        folderTmpl.create('div.nav-folder')
                .create('div.nav-folder-name').append()
                .create('div.nav-folder-content').append()
            .appendLast();

    var frag = folderTmpl.render();
    var style = Trio.Stylizer.createStyleTag({
        '.nav-folder': {
            'display': 'flex',
            'margin': '1px 0',
            'font-weight': '100',
            'background-color': 'rgba(0, 0, 0, 0.1)',
            '-webkit-user-select': 'none',
            'cursor': 'pointer',
            'flex-flow': 'column nowrap'
        },
        '.nav-folder-name:hover': {
            'background-color': 'rgba(0, 0, 0, 0.05)'
        },
        '.nav-folder-name:active': {
            'background-color': 'rgba(0, 0, 0, 0.15)'
        },
        '.nav-folder-name': {
            'color': Trio.Stylizer.getVariable('layout-color'),
            'text-transform': 'uppercase',
            'padding': '12px'
        },
        '.nav-folder-content': {
            'display': 'flex',
            'flex-flow': 'column nowrap',
            'overflow': 'hidden'
        }
    });

    return Trio.Component.register({
        tagName: 'ck-blog-folder',

        fragment: frag,

        style: style,

        events: {
            'click .nav-folder-name': 'toggleFolder'
        },

        onCreate: function() {
            this.folderTitle = this.shadowRoot.querySelector('.nav-folder-name');
        },

        renderFolderTitle: function(d) {
            this.folderTitle.textContent = d.title;
        },

        toggleFolder: function(e) {
            var el = e.currentTarget.nextSibling;
            el.style.height = el.isCollapsed ? '' : '0px';
            el.isCollapsed = !el.isCollapsed;
        }
    });
});
