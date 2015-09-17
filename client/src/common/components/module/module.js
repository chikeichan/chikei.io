Trio.Module.export('moduleComponent', function() {
    var tmpl = Trio.Renderer.createTemplate();
    tmpl.create('div.module-header')
            .create('div.module-title').append()
            .create('div.module-button')
                .create('div.button').addClass('close-module').append()
            .append()
        .append()
        .create('div.resizable').addClass('north').append()
        .create('div.resizable').addClass('south').append()
        .create('div.resizable').addClass('east').append()
        .create('div.resizable').addClass('west').append()
        .create('div.resizable').addClass('north-west').append()
        .create('div.resizable').addClass('north-east').append()
        .create('div.resizable').addClass('south-west').append()
        .create('div.resizable').addClass('south-east').append()
        .create('div.module-content').appendLast();
    var frag = tmpl.render();
    var style = Trio.Stylizer.createStyleTag({
        ':host': {
            'position': 'absolute',
            'display': 'flex',
            'flex-flow': 'column nowrap',
            'height': '400px',
            'width': '600px',
            'background-color': Trio.Stylizer.toRGBa(Trio.Stylizer.getVariable('base-color'), 0.8),
            'border-radius': '2px',
            "box-shadow": '0px 0px 3px ' + Trio.Stylizer.getVariable('shadow-color')
        },
        '.module-header': {
            'display': 'flex',
            'flex-flow': 'row nowrap',
            'flex': '0 0 auto',
            'height': '30px',
            'background-color': Trio.Stylizer.getVariable('base-color'),
            'border-top-right-radius': '2px',
            'border-top-left-radius': '2px',
            'cursor': 'move'
        },
        '.module-title': {
            'color': Trio.Stylizer.getVariable('layout-color'),
            'font-size': '0.8em',
            'flex': '1 0 auto',
            'display': 'flex',
            'align-items': 'center',
            '-webkit-user-select': 'none',
            'margin': '4px 8px',
            'font-weight': '600'
        },
        '.module-button': {
            'display': 'flex',
            'align-items': 'center',
            '-webkit-user-select': 'none',
            'margin': '4px 8px',
            'width': '48px',
            'justify-content': 'flex-end'
        },
        '.module-content': {
            'display': 'flex',
            'flex': '1 0 auto',
            'border-bottom-right-radius': '2px',
            'border-bottom-left-radius': '2px'
        },
        '.button': {
            'width': '12px',
            'height': '12px',
            'border-radius': '50%',
            'cursor': 'pointer',
            'opacity': '0.9'
        },
        '.button:hover': {
            'opacity': '1'
        },
        '.button:active': {
            'opacity': '0.8'
        },
        '.button.close-module': {
            'background-color': '#FF3B3B',
        },
        'iframe': {
            'flex': '1 1 auto',
            'border': 'none'
        },
        '.resizable': {
            'position': 'absolute',
        },
        '.resizable.north': {
            'height': '2px',
            'cursor': 'n-resize',
            'width': '100%',
            'top': '0'
        },
        '.resizable.south': {
            'height': '2px',
            'cursor': 's-resize',
            'width': '100%',
            'top': '100%'
        },
        '.resizable.east': {
            'width': '2px',
            'cursor': 'e-resize',
            'height': '100%',
            'left': '100%',
            'top': '0'
        },
        '.resizable.west': {
            'width': '2px',
            'cursor': 'w-resize',
            'height': '100%',
            'left': '0',
            'top': '0'
        },
        '.resizable.south-west': {
            'width': '6px',
            'height': '6px',
            'cursor': 'sw-resize',
            'left': '0',
            'top': 'calc(100% - 6px)'
        },
        '.resizable.south-east': {
            'width': '6px',
            'height': '6px',
            'cursor': 'se-resize',
            'left': 'calc(100% - 6px)',
            'top': 'calc(100% - 6px)'
        },
        '.resizable.north-east': {
            'width': '6px',
            'height': '6px',
            'cursor': 'ne-resize',
            'left': 'calc(100% - 6px)',
            'top': '0'
        },
        '.resizable.north-west': {
            'width': '6px',
            'height': '6px',
            'cursor': 'nw-resize',
            'left': '0',
            'top': '0'
        }
    });

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
            this.style.height = opts.y + 'px';
            this.style.width = opts.x + 'px';
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
            this.remove();
        }
    });
});