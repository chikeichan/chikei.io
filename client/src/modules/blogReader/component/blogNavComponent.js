Trio.Module.import({
    'blogNavFolderComponent'  : './src/modules/blogReader/component/blogNavFolderComponent.js',
    'blogNavItemComponent'    : './src/modules/blogReader/component/blogNavItemComponent.js'
})

.and.export('blogNavComponent', function(ret) {
    var style = Trio.Stylizer.create();
        style.select(':host')
                .css({
                    'background-color': 'rgba($theme-color, 0.4)',
                    'border-right': '2px solid $base-color's,
                    'width': '200px',
                    'position': 'relative',
                    'flex': '0 0 auto'
                });

    var tmpl = Trio.Renderer.createTemplate();
        tmpl.open('style').text(style.toCSS.bind(style)).close()
            .open('div.nav').close();

    return Trio.Component.register({
        tagName: 'ck-blog-nav',

        template: tmpl,

        initStructure: function(root, list) {
            list.forEach(function(item) {
                var itemEl;
                if (!item.threadId) {
                    itemEl = createFolder.call(this, item);
                    if (item.children) {
                        this.initStructure(itemEl.shadowRoot.querySelector('.nav-folder-content'), item.children);
                    }
                } else {
                    itemEl = createItem.call(this, item);    
                }
                root.appendChild(itemEl);
            }.bind(this));

            function createFolder(d) {
                var folder = document.createElement('ck-blog-folder');
                folder.renderFolderTitle(d);
                return folder;
            }

            function createItem(d) {
                var item = document.createElement('ck-blog-item');
                item.threadId = d.threadId;
                item.renderItemTitle(d);
                return item;
            }
        },

        
    });
});
