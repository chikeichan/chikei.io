Trio.Module.export('blogReaderService', function() {
    var folderTmpl = Trio.Renderer.createTemplate();
        folderTmpl.create('div.nav-folder')
                .create('div.nav-folder-name').text(function(d) {return d.title}).append()
                .create('div.nav-folder-content').append()
            .appendLast();
    var itemTmpl = Trio.Renderer.createTemplate();
        itemTmpl.create('div.nav-item').text(function(d) {return d.title}).appendLast();

    var blogTmpl = Trio.Renderer.createTemplate();
        blogTmpl.create('div.blog-header').text(function(d) {return d.title}).append()
            .create('div.blog-meta')
                .create('div.blog-author').text(function(d) {return d.author.name}).append()
                .create('div.blog-date').text(function(d) {return new Date(+d.timestamp).toString().slice(4, 15)}).append()
                .create('div.fb-share-button')
                    .attr('data-href', "https://developers.facebook.com/docs/plugins/")
                    .attr('data-layout', 'button')
                .append()
            .append()
            .create('div.blog-body').text(function(d) {return d.content}).appendLast()

    var BlogReaderService = Trio.Service.extend({
        initialize: function(opts) {
            this.component = opts.component;
            this.factory = opts.factory;
            this.factory.fetchList();
            this.initStructure(this.component.nav, this.factory.structure);
        },

        initStructure: function(root, list) {
            list.forEach(function(item) {
                var itemEl;
                if (!item.threadId) {
                    itemEl = createFolder.call(this, item);
                    if (item.children) {
                        this.initStructure(itemEl.querySelector('.nav-folder-content'), item.children);
                    }
                } else {
                    itemEl = createItem.call(this, item);    
                }
                root.appendChild(itemEl);
            }.bind(this))

            function createFolder(d) {
                var folder = folderTmpl.render(d);
                folder.querySelector('.nav-folder-name')
                    .addEventListener('click', this.toggleFolder.bind(this, folder.querySelector('.nav-folder-content')));
                return folder;
            }

            function createItem(d) {
                var item = itemTmpl.render(d);
                item.querySelector('.nav-item')
                    .addEventListener('click', this.openBlog.bind(this, d.threadId));
                return item;
            }
        },

        openBlog: function(id) {
            var blog = this.factory.fetchBlog(id);
            var el = blogTmpl.render(blog);
            this.component.renderBlog(el);
        },

        toggleFolder: function(el) {
            el.style.height = el.isCollapsed ? '' : '0px';
            el.isCollapsed = !el.isCollapsed;
        }

    });

    return BlogReaderService;
});