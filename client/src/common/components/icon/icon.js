Trio.Module.export('iconComponent', function() {
    var tmpl = Trio.Renderer.createTemplate();
    tmpl.create('div.icon-pic').append()
        .create('div.icon-name').appendLast();
    var frag = tmpl.render();
    var style = Trio.Stylizer.createStyleTag({
        ':host': {
            'position': 'absolute',
            'display': 'flex',
            'flex-flow': 'column nowrap',
            'align-items': 'center',
            'margin': '4px'
        },
        '.icon-pic': {
            'width': '48px',
            'height': '48px',
            'padding': '12px 12px 4px 12px',
            'background-repeat': 'no-repeat',
            'background-position': 'center center',
            'background-size': '48px',
            'cursor': 'default',
            'border-top-left-radius': '2px',
            'border-top-right-radius': '2px'
        },
        '.icon-name': {
            'font-size': '0.6em',
            'color': 'white',
            'text-align': 'center',
            '-webkit-user-select': 'none',
            'width': '72px',
            'overflow': 'hidden',
            'text-overflow': 'ellipsis',
            'white-space': 'nowrap',
            'text-shadow': '0px 1px 3px black',
            'padding-bottom': '4px',
            'font-weight': '600',
            'border-bottom-left-radius': '2px',
            'border-bottom-right-radius': '2px'
        }
    });

    return Trio.Component.register({
        tagName: 'ck-icon',

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
        
        onCreate: function() {
            this.onDragStart = this.onDragStart.bind(this);
            this.onDragging = this.onDragging.bind(this);
            this.onDragEnd = this.onDragEnd.bind(this);
            this.picture = this.shadowRoot.querySelector('.icon-pic');
            this.name = this.shadowRoot.querySelector('.icon-name');
            this.addEventListener('mousedown', this.onDragStart);
        },

        setIconPic: function(url) {
            this.picture.style['background-image'] = 'url(' + url + ')';
        },

        setIconName: function(name) {
            this.name.textContent = name;
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
            this.name.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
            this.picture.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
            this.style.opacity = '0.5';
            window.addEventListener('mouseup', this.onDragEnd);
            window.addEventListener('mousemove', this.onDragging);
        },

        onDragging: function(e) {
            this.style.top = (this.origin.y + (e.pageY - this.start.y)) + 'px';
            this.style.left = (this.origin.x + (e.pageX - this.start.x)) + 'px';
        },

        onDragEnd: function() {
            this.name.style.backgroundColor = '';
            this.picture.style.backgroundColor = '';
            this.style.opacity = '1';
            window.removeEventListener('mouseup', this.onDragEnd);
            window.removeEventListener('mousemove', this.onDragging);
        }
    });
});