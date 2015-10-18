Trio.Module.export('blogNavFolderComponent', function(ret) {
    var folderTmpl = Trio.Renderer.createTemplate();
        folderTmpl.open('div.nav-folder')
                .open('div.nav-folder-name').close()
                .open('div.nav-folder-content').close()
            .close();

    var frag = folderTmpl.render();
    var style = Trio.Stylizer.createStyleTag({
        '.nav-folder': {
            'display': 'flex',
            'margin': '1px 0',
            'font-weight': '100',
            '-webkit-user-select': 'none',
            'cursor': 'pointer',
            'flex-flow': 'column nowrap'
        },
        '.nav-folder-name:hover': {
            'background-color': 'rgba(255, 255, 255 , 0.15)'
        },
        '.nav-folder-name:active': {
            'background-color': 'rgba(255, 255, 255 , 0.05)'
        },
        '.nav-folder-name': {
            'color': Trio.Stylizer.getVariable('layout-color'),
            'background-color': 'rgba(255, 255, 255 , 0.1)',
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
