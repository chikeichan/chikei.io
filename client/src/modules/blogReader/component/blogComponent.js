Trio.Module.export('blogComponent', function() {
    var blogTmpl = Trio.Renderer.createTemplate();
        
        blogTmpl.open('div.blog-header')
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

    var frag = blogTmpl.render();

    var style = Trio.Stylizer.createStyleTag({
        '.blog-title': {
            'display': 'flex',
            'font-size': '2.4em',
            'font-weight': '500',
            'min-height': '150px',
            'color': 'white',
            'padding': '24px',
            'background-color': 'rgba(0, 0, 0, 0.4)'
        },
        '.blog-header': {
            'background-repeat': 'no-repeat',
            'background-position': 'center center',
            'background-size': 'cover',
        },
        '.blog-author': {
            'display': 'flex',
            'font-size': '0.7em',
            'font-weight': '300',
            'color': 'white',
            'padding': '12px 24px',

        },
        '.blog-meta': {
            'background-color': 'rgba(0, 0, 0, 0.7)',
            'display': 'flex',
            'flex-flow': 'row nowrap',
            'border-bottom': '1px solid ' + Trio.Stylizer.toRGBa(Trio.Stylizer.getVariable('layout-color'), 0.2)
        },
        '.blog-date': {
            'font-size': '0.7em',
            'font-weight': '300',
            'color': 'white',
            'padding': '12px 24px',
        },
        '.blog-body': {
            'display': 'flex',
            'font-size': '0.9em',
            'font-weight': '100',
            'color': Trio.Stylizer.toRGBa(Trio.Stylizer.getVariable('layout-color'), 0.8),
            'padding': '12px 24px',
            'line-height': '1.8em',
        }
    });

    return Trio.Component.register({
        tagName: 'ck-blog',

        fragment: frag,

        style: style,

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
