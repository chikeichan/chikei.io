Trio.Module.import({
    'moduleStyle': './src/common/components/module/style/moduleStyle.js',
    'moduleTemplate': './src/common/components/module/template/moduleTemplate.js',
    'resizable': './src/common/mixins/resizable.js'
})

.and.export('moduleComponent', function(ret) {
    var frag = ret.moduleTemplate.render();
    var style = Trio.Stylizer.createStyleTag(ret.moduleStyle);

    return Trio.Component.register({
        tagName: 'ck-module',

        fragment: frag,
        
        style: style,

        origin: {
            x: null,
            y: null
        },
        
        start: {
            x: null,
            y: null
        },
        
        events: {
            'mousedown .close-module': 'stopPropagation',
            'click .close-module': 'destroy'
        },

        onCreate: function() {
            this.onDragStart = this.onDragStart.bind(this);
            this.onDragging = this.onDragging.bind(this);
            this.onDragEnd = this.onDragEnd.bind(this);
            this.header = this.shadowRoot.querySelector('.module-header');
            this.moduleContent = this.shadowRoot.querySelector('.module-content');
            this.moduleName = this.shadowRoot.querySelector('.module-title');
            this.header.addEventListener('mousedown', this.onDragStart);
            ret.resizable.initResizable.call(this, ['south', 'north', 'east', 'west', 'north-west', 'north-east', 'south-west', 'south-east']);
        },

        addModuleContent: function(el) {
            this.moduleContent.appendChild(el);
        },

        setTitle: function(title) {
            this.moduleName.textContent = title;
        },

        setPosition: function(opt) {
            this.style.top = opt.y + 'px';
            this.style.left = opt.x + 'px';
        },

        setSize: function(opts) {
            this.style.height = opts.height + 'px';
            this.style.width = opts.width + 'px';
        },

        onDragStart: function(e) {
            if (e.which !== 1) {
                return;
            }
            this.origin.x = this.offsetLeft;
            this.origin.y = this.offsetTop;
            this.start.x = e.pageX;
            this.start.y = e.pageY;
            this.style.opacity = '0.5';
            window.addEventListener('mouseup', this.onDragEnd);
            window.addEventListener('mousemove', this.onDragging);
        },

        onDragging: function(e) {
            this.style.top = (this.origin.y + (e.pageY - this.start.y)) + 'px';
            this.style.left = (this.origin.x + (e.pageX - this.start.x)) + 'px';
        },

        onDragEnd: function() {
            this.style.opacity = '1';
            window.removeEventListener('mouseup', this.onDragEnd);
            window.removeEventListener('mousemove', this.onDragging);
        },

        stopPropagation: function(e) {
            e.stopImmediatePropagation();
        },

        destroy: function(e) {
            this.dispatchEvent(new Event('destroy'));
            this.remove();
        }
    });
});