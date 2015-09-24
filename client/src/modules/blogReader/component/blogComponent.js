Trio.Module.export('blogComponent', function() {
    var blogTmpl = Trio.Renderer.createTemplate();
        blogTmpl.create('div.blog-header')
            .create('div.blog-title').append()
            .create('div.blog-meta')
                .create('div.blog-author').append()
                .create('div.blog-date').append()
                .create('div.fb-share-button')
                    .attr('data-href', "https://developers.facebook.com/docs/plugins/")
                    .attr('data-layout', 'button')
                .append()
            .append()
        .append()
        .create('div.blog-body').appendLast()

    var frag = blogTmpl.render();

    var style = Trio.Stylizer.createStyleTag({
        '.blog-title': {
            'display': 'flex',
            'font-size': '2.4em',
            'font-weight': '500',
            'min-height': '150px',
            'color': Trio.Stylizer.getVariable('layout-color'),
            'padding': '24px',
            'background-color': Trio.Stylizer.toRGBa(Trio.Stylizer.getVariable('base-color'), 0.4)
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
            'color': Trio.Stylizer.getVariable('layout-color'),
            'padding': '12px 24px',

        },
        '.blog-meta': {
            'background-color': Trio.Stylizer.toRGBa(Trio.Stylizer.getVariable('base-color'), 0.5),
            'display': 'flex',
            'flex-flow': 'row nowrap',
            'border-bottom': '1px solid ' + Trio.Stylizer.toRGBa(Trio.Stylizer.getVariable('layout-color'), 0.2)
        },
        '.blog-date': {
            'font-size': '0.7em',
            'font-weight': '300',
            'color': Trio.Stylizer.getVariable('layout-color'),
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
