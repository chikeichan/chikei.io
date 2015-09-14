Trio.Module.export('moduleComponent', function() {
    var tmpl = Trio.Renderer.createTemplate();
    tmpl.create('div.module-header')
            .create('div.module-title').append()
            .create('div.module-button')
                .create('div.button').addClass('close-module').append()
            .append()
        .append()
        .create('div.module-content').appendLast();
    var frag = tmpl.render();
    var style = Trio.Stylizer.createStyleTag({
        ':host': {
            'position': 'absolute',
            'display': 'flex',
            'flex-flow': 'column nowrap',
            'height': '400px',
            'width': '600px',
            'background-color': 'rgba(0, 0, 0, 0.8)',
            'padding': '4px',
            'border-radius': '2px'
        },
        '.module-header': {
            'display': 'flex',
            'flex-flow': 'row nowrap',
            'flex': '0 0 auto',
            'height': '30px',
            'background-color': 'rgb(0, 0, 0)'
        },
        '.module-title': {
            'color': 'white',
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
            'flex': '1 0 auto'
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

        destroy: function() {
            this.remove();
        }
    });
});