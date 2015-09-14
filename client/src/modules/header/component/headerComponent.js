Trio.Module.import({
    'headerStyle'       : './src/modules/header/component/style/headerStyle.js',
    'headerTemplate'    : './src/modules/header/component/template/headerTemplate.js'
})

.and.export('headerComponent', function(ret) {
    var frag = ret.headerTemplate.render();
    var style = Trio.Stylizer.createStyleTag(ret.headerStyle);

    return Trio.Component.register({
        tagName: 'ck-header',
        fragment: frag,
        style: style
    });
});
