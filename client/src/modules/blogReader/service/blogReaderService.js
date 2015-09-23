Trio.Module.export('blogReaderService', function() {
    var folderTmpl = Trio.Renderer.createTemplate();
        folderTmpl.create('div.nav-folder').text(function(d) {return d.title}).appendLast();
    var itemTmpl = Trio.Renderer.createTemplate();
        itemTmpl.create('div.nav-item').text(function(d) {return d.title}).appendLast();

    var blogTmpl = Trio.Renderer.createTemplate();
        blogTmpl.create('div.blog-header').text(function(d) {return d.title}).append()
            .create('div.blog-author').text(function(d) {return d.author.name}).append()
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
                var el;
                if (!item.threadId) {
                    el = createFolder(item);
                    if (item.children) {
                        this.initStructure(el, item.children);
                    }
                } else {
                    el = createItem.call(this, item);    
                }
                root.appendChild(el);
            }.bind(this))

            function createFolder(d) {
                var folder = folderTmpl.render(d);
                return folder;
            }

            function createItem(d) {
                var item = itemTmpl.render(d);
                item.querySelector('.nav-item').addEventListener('click', this.openBlog.bind(this, d.threadId));
                return item;
            }
        },

        openBlog: function(id) {
            var blog = this.factory.fetchBlog(id);
            var el = blogTmpl.render(blog);
            this.component.renderBlog(el);
        }

    });

    return BlogReaderService;
});