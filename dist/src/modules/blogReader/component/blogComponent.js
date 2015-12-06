Trio.Module.export('blogComponent', function() {
    var style = Trio.Stylizer.create();
        style.select('.blog-title')
                .css({
                    'display': 'flex',
                    'font-size': '2.4em',
                    'font-weight': '500',
                    'min-height': '150px',
                    'color': 'white',
                    'padding': '24px',
                    'background-color': 'rgba(0, 0, 0, 0.4)'
                })
            .select('.blog-header')
                .css({
                    'background-repeat': 'no-repeat',
                    'background-position': 'center center',
                    'background-size': 'cover'
                })
            .select('.blog-author')
                .css({
                    'display': 'flex',
                    'font-size': '0.7em',
                    'font-weight': '300',
                    'color': 'white',
                    'padding': '12px 24px'
                })
            .select('.blog-meta')
                .css({
                    'background-color': 'rgba(0, 0, 0, 0.7)',
                    'display': 'flex',
                    'flex-flow': 'row nowrap',
                    'border-bottom': '1px solid rgba($layout-color, 0.2)'
                })
            .select('.blog-date')
                .css({
                    'font-size': '0.7em',
                    'font-weight': '300',
                    'color': 'white',
                    'padding': '12px 24px'
                })
            .select('.blog-body')
                .css({
                    'display': 'flex',
                    'font-size': '0.9em',
                    'font-weight': '100',
                    'color': 'rgba($layout-color, 0.8)',
                    'padding': '12px 24px',
                    'line-height': '1.8em'
                });

    var tmpl = Trio.Renderer.createTemplate();
        
        tmpl.open('style').text(style.toCSS.bind(style)).close()
            .open('div.blog-header')
            .open('div.blog-title').close()
            .open('div.blog-meta')
                .open('div.blog-author').close()
                .open('div.blog-date').close()
                .open('div.fb-share-button')
                    .attr('data-href', "https://developers.facebook.com/docs/plugins/")
                    .attr('data-layout', 'button')
                .close()
            .close()
        .close()
        .open('div.blog-body').close()


    return Trio.Component.register({
        tagName: 'ck-blog',

        template: tmpl,

        onCreate: function() {
            this.blogTitle = this.shadowRoot.querySelector('.blog-title');
            this.blogHeader = this.shadowRoot.querySelector('.blog-header');
            this.blogAuthorName = this.shadowRoot.querySelector('.blog-author');
            this.blogDate = this.shadowRoot.querySelector('.blog-date');
            this.blogBody = this.shadowRoot.querySelector('.blog-body');
        },

        renderBlogContent: function(d) {
            this.blogTitle.textContent = d.title;
            this.blogAuthorName.textContent = d.author.name;
            this.blogDate.textContent = new Date(+d.timestamp).toString().slice(4, 15);
            this.blogBody.textContent = d.content;
            this.blogHeader.style['background-image'] = 'url(' + d.coverUrl + ')';
        }
    });
});
