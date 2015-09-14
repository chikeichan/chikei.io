Trio.Module.import({
    'layoutStyle'       : './src/modules/layout/component/style/layoutStyle.js',
    'layoutTemplate'    : './src/modules/layout/component/template/layoutTemplate.js'
})

.and.export('layoutComponent', function(ret) {
    var frag = ret.layoutTemplate.render();
    var style = Trio.Stylizer.createStyleTag(ret.layoutStyle);

    Trio.Component.register({
        tagName: 'ck-layout',
        fragment: frag,
        style: style,
        onCreate: function() {
            this.header   = this.shadowRoot.querySelector('#header');
            this.canvas   = this.shadowRoot.querySelector('#canvas');
            this.main     = this.shadowRoot.querySelector('#main');
        },

        changeBackground: function(url) {
            this.main.style['background-image'] = 'url(' + url + ')';
        }
    });
});

