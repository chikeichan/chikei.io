Trio.Module.import({
    'blogComponent': './src/modules/blogReader/component/blogComponent.js'
})
.and.export('blogReaderService', function(ret) {
    var BlogReaderService = Trio.Service.extend({

        initialize: function(opts) {
            this.component = opts.component;
            this.factory = opts.factory;
            this.factory.fetchList();
            this.component.nav.initStructure(this.component.nav.shadowRoot.querySelector('.nav'), this.factory.structure);
            this.component.addEventListener('openBlog', this.openBlog.bind(this));
        },

        openBlog: function(e) {
            var blog = this.factory.fetchBlog(e.detail);
            var el  = document.createElement('ck-blog');
            el.renderBlogContent(blog);
            this.component.renderBlog(el);
        },

    });

    return BlogReaderService;
});