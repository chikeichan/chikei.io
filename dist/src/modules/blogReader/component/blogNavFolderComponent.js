Trio.Module.export('blogNavFolderComponent', function(ret) {
    var style = Trio.Stylizer.create();
        style.select('.nav-folder')
                .css({
                    'display': 'flex',
                    'margin': '1px 0',
                    'font-weight': '100',
                    '-webkit-user-select': 'none',
                    'cursor': 'pointer',
                    'flex-flow': 'column nowrap'
                })
            .select('.nav-folder-name:hover')
                .css({
                    'background-color': 'rgba(255, 255, 255 , 0.15)'
                })
            .select('.nav-folder-name:active')
                .css({
                    'background-color': 'rgba(255, 255, 255 , 0.05)'
                })
            .select('.nav-folder-name')
                .css({
                    'color': '$layout-color',
                    'background-color': 'rgba(255, 255, 255 , 0.1)',
                    'text-transform': 'uppercase',
                    'padding': '12px'
                })
            .select('.nav-folder-content')
                .css({
                    'display': 'flex',
                    'flex-flow': 'column nowrap',
                    'overflow': 'hidden'
                });

    var tmpl = Trio.Renderer.createTemplate();
        tmpl.open('style').text(style.toCSS.bind(style)).close()
            .open('div.nav-folder')
                .open('div.nav-folder-name').close()
                .open('div.nav-folder-content').close()
            .close();

    return Trio.Component.register({
        tagName: 'ck-blog-folder',

        template: tmpl,

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
