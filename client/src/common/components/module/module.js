Trio.Module.export('moduleComponent', function() {
    var style = Trio.Stylizer.create();
        style.select(':host')
                .css({
                    'position': 'absolute',
                    'display': 'flex',
                    'flex-flow': 'column nowrap',
                    'height': '400px',
                    'width': '600px',
                    'background-color': 'rgba($base-color, 0.9)',
                    'border-radius': '2px',
                    "box-shadow": '0px 0px 3px $shadow-color'
                })
            .select('.module-header')
                .css({
                    'display': 'flex',
                    'flex-flow': 'row nowrap',
                    'flex': '0 0 auto',
                    'height': '30px',
                    'background-color': '$base-color',
                    'border-top-right-radius': '2px',
                    'border-top-left-radius': '2px',
                    'cursor': 'move'
                })
            .select('.module-title')
                .css({
                    'color': '$layout-color',
                    'font-size': '0.8em',
                    'flex': '1 0 auto',
                    'display': 'flex',
                    'align-items': 'center',
                    '-webkit-user-select': 'none',
                    'margin': '4px 8px',
                    'font-weight': '600'
                })
            .select('.module-button')
                .css({
                    'display': 'flex',
                    'align-items': 'center',
                    '-webkit-user-select': 'none',
                    'margin': '4px 8px',
                    'width': '48px',
                    'justify-content': 'flex-end'
                })
            .select('.module-content')
                .css({
                    'display': 'flex',
                    'flex': '1 0 auto',
                    'border-bottom-right-radius': '2px',
                    'border-bottom-left-radius': '2px',
                    'height': 'calc(100% - 30px)',
                    'overflow': 'hidden'
                })
            .select('.button')
                .css({
                    'width': '12px',
                    'height': '12px',
                    'border-radius': '50%',
                    'cursor': 'pointer',
                    'opacity': '0.9'
                })
            .select('.button:hover')
                .css({
                    'opacity': '1'
                })
            .select('.button:active')
                .css({
                    'opacity': '0.8'
                })
            .select('.button.close-module')
                .css({
                    'background-color': '#FF3B3B',
                })
            .select('iframe')
                .css({
                    'flex': '1 1 auto',
                    'border': 'none'
                });


    var tmpl = Trio.Renderer.createTemplate();
        tmpl.open('style').text(style.toCSS.bind(style)).close()
            .open('div.module-header')
                .open('div.module-title').close()
                .open('div.module-button')
                    .open('div.button').addClass('close-module').close()
                .close()
            .close()
            .open('div.module-content').close();

    return Trio.Component.register({
        tagName: 'ck-module',

        template: tmpl,
        
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