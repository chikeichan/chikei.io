Trio.Module.import({
    'blogReaderFactory'          : './src/modules/blogReader/factory/blogReaderFactory.js',
    'blogReaderComponent'        : './src/modules/blogReader/component/blogReaderComponent.js',
    'blogReaderService'          : './src/modules/blogReader/service/blogReaderService.js',
})

.and.export('blogReaderModule', function(ret) {
    return {
        create: function() {
            var factory = new ret.blogReaderFactory({});
            var component = document.createElement('ck-blog-reader');
            var service = new ret.blogReaderService({
                factory: factory,
                component: component
            });
            return service;
        }
    };
});
