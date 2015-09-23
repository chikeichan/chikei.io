Trio.Module.import({
    'canvasStyle'       : './src/modules/canvas/component/style/canvasStyle.js',
    'canvasTemplate'    : './src/modules/canvas/component/template/canvasTemplate.js'
})

.and.export('canvasComponent', function(ret) {
    var frag = ret.canvasTemplate.render();
    var style = Trio.Stylizer.createStyleTag(ret.canvasStyle);

    return Trio.Component.register({
        tagName: 'ck-canvas',

        fragment: frag,
        
        style: style,
        
        addToCanvas: function(el) {
            this.shadowRoot.appendChild(el);
        }
    });
});
