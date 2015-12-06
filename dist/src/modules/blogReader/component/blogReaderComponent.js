Trio.Module.export('blogReaderComponent', function(ret) {
    var style = Trio.Stylizer.create();
        style.select(':host')
                .css({
                    'display': 'flex',
                    'flex-flow': 'row nowrap',
                    'flex': '1 0 auto',
                    'width': '100%'
                })
            .select('.blog-content')
                .css({
                    'width': '100%',
                    'display': 'flex',
                    'flex-flow': 'column nowrap',
                    'overflow-y': 'scroll'
                });

    var tmpl = Trio.Renderer.createTemplate();

    tmpl.open('style').text(style.toCSS.bind(style)).close()
        .open('ck-blog-nav').close()
        .open('div.blog-content').close();

    return Trio.Component.register({
        tagName: 'ck-blog-reader',

        template: tmpl,

        onCreate: function() {
            this.nav = this.shadowRoot.querySelector('ck-blog-nav');
            this.reader = this.shadowRoot.querySelector('.blog-content');
        },

        renderBlog: function(el) {
            this.reader.innerHTML = '';
            this.reader.appendChild(el);
        }
    });
});
