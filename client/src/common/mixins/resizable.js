Trio.Module.export('resizable', function() {
    var key = {
        'south': _addSouthEvents,
        'north': _addNorthEvents,
        'east': _addEastEvents,
        'west': _addWestEvents,
        'north-west': _addNorthWestEvents,
        'north-east': _addNorthEastEvents,
        'south-west': _addSouthWestEvents,
        'south-east': _addSouthEastEvents,
    };

    var style = {
        '.resizable': {
            'position': 'absolute',
            '-webkit-user-select': 'none'
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
    }

    var Resizable = {
        initResizable: function(indicators) {
            indicators = indicators || [];
            indicators.forEach(function(indicator) {
                var tmpl = Trio.Renderer.createTemplate();

                tmpl.create('div.resizable').addClass(indicator).appendLast();

                this.shadowRoot.appendChild(tmpl.render());

                key[indicator].call(this);
            }.bind(this));

            this.shadowRoot.appendChild(Trio.Stylizer.createStyleTag(style));
        }
    };

    return Resizable;

    function _addSouthEvents(el) {
        var el = this.shadowRoot.querySelector('.south');
        var self = this;
        var origin = {};
        var start  = {};

        el.addEventListener('mousedown', onResizeStart);

        function onResizeStart(e) {
            if (e.which !== 1) {
                return;
            }
            setBeginningVariables.call(self, origin, start, e);
            self.style.opacity = '0.5';
            window.addEventListener('mouseup', onResizeEnd);
            window.addEventListener('mousemove', onResizing);
        }

        function onResizeEnd(e) {
            self.style.opacity = '1';
            window.removeEventListener('mouseup', onResizeEnd);
            window.removeEventListener('mousemove', onResizing);
        }

        function onResizing(e) {
            self.style.height = '' + (origin.height + (e.pageY - start.y)) + 'px';
        }
    }

    function _addNorthEvents(el) {
        var el = this.shadowRoot.querySelector('.north');
        var self = this;
        var origin = {};
        var start  = {};

        el.addEventListener('mousedown', onResizeStart);

        function onResizeStart(e) {
            if (e.which !== 1) {
                return;
            }
            setBeginningVariables.call(self, origin, start, e);
            self.style.opacity = '0.5';
            window.addEventListener('mouseup', onResizeEnd);
            window.addEventListener('mousemove', onResizing);
        }

        function onResizeEnd(e) {
            self.style.opacity = '1';
            window.removeEventListener('mouseup', onResizeEnd);
            window.removeEventListener('mousemove', onResizing);
        }

        function onResizing(e) {
            var diff = e.pageY - start.y;
            self.style.height = '' + (origin.height - diff) + 'px';
            self.style.top = '' + (origin.y + diff) + 'px';
        }
    }

    function _addEastEvents(el) {
        var el = this.shadowRoot.querySelector('.east');
        var self = this;
        var origin = {};
        var start  = {};

        el.addEventListener('mousedown', onResizeStart);

        function onResizeStart(e) {
            if (e.which !== 1) {
                return;
            }
            setBeginningVariables.call(self, origin, start, e);
            self.style.opacity = '0.5';
            window.addEventListener('mouseup', onResizeEnd);
            window.addEventListener('mousemove', onResizing);
        }

        function onResizeEnd(e) {
            self.style.opacity = '1';
            window.removeEventListener('mouseup', onResizeEnd);
            window.removeEventListener('mousemove', onResizing);
        }

        function onResizing(e) {
            var diff = e.pageX - start.x;
            self.style.width = '' + (origin.width + diff) + 'px';
        }
    }

    function _addWestEvents(el) {
        var el = this.shadowRoot.querySelector('.west');
        var self = this;
        var origin = {};
        var start  = {};

        el.addEventListener('mousedown', onResizeStart);

        function onResizeStart(e) {
            if (e.which !== 1) {
                return;
            }
            setBeginningVariables.call(self, origin, start, e);
            self.style.opacity = '0.5';
            window.addEventListener('mouseup', onResizeEnd);
            window.addEventListener('mousemove', onResizing);
        }

        function onResizeEnd(e) {
            self.style.opacity = '1';
            window.removeEventListener('mouseup', onResizeEnd);
            window.removeEventListener('mousemove', onResizing);
        }

        function onResizing(e) {
            var diff = e.pageX - start.x;
            self.style.width = '' + (origin.width - diff) + 'px';
            self.style.left = '' + (origin.x + diff) + 'px';

        }
    }

    function _addNorthWestEvents() {
        var el = this.shadowRoot.querySelector('.north-west');
        var self = this;
        var origin = {};
        var start  = {};

        el.addEventListener('mousedown', onResizeStart);

        function onResizeStart(e) {
            if (e.which !== 1) {
                return;
            }
            setBeginningVariables.call(self, origin, start, e);
            self.style.opacity = '0.5';
            window.addEventListener('mouseup', onResizeEnd);
            window.addEventListener('mousemove', onResizing);
        }

        function onResizeEnd(e) {
            self.style.opacity = '1';
            window.removeEventListener('mouseup', onResizeEnd);
            window.removeEventListener('mousemove', onResizing);
        }

        function onResizing(e) {
            var diffY = e.pageY - start.y;
            var diffX = e.pageX - start.x;
            self.style.height = '' + (origin.height - diffY) + 'px';
            self.style.top = '' + (origin.y + diffY) + 'px';
            self.style.width = '' + (origin.width - diffX) + 'px';
            self.style.left = '' + (origin.x + diffX) + 'px';
        }
    }

    function _addNorthEastEvents() {
        var el = this.shadowRoot.querySelector('.north-east');
        var self = this;
        var origin = {};
        var start  = {};

        el.addEventListener('mousedown', onResizeStart);

        function onResizeStart(e) {
            if (e.which !== 1) {
                return;
            }
            setBeginningVariables.call(self, origin, start, e);
            self.style.opacity = '0.5';
            window.addEventListener('mouseup', onResizeEnd);
            window.addEventListener('mousemove', onResizing);
        }

        function onResizeEnd(e) {
            self.style.opacity = '1';
            window.removeEventListener('mouseup', onResizeEnd);
            window.removeEventListener('mousemove', onResizing);
        }

        function onResizing(e) {
            var diffY = e.pageY - start.y;
            var diffX = e.pageX - start.x;
            self.style.height = '' + (origin.height - diffY) + 'px';
            self.style.top = '' + (origin.y + diffY) + 'px';
            self.style.width = '' + (origin.width + diffX) + 'px';
        }
    }

    function _addSouthWestEvents() {
        var el = this.shadowRoot.querySelector('.south-west');
        var self = this;
        var origin = {};
        var start  = {};

        el.addEventListener('mousedown', onResizeStart);

        function onResizeStart(e) {
            if (e.which !== 1) {
                return;
            }
            setBeginningVariables.call(self, origin, start, e);
            self.style.opacity = '0.5';
            window.addEventListener('mouseup', onResizeEnd);
            window.addEventListener('mousemove', onResizing);
        }

        function onResizeEnd(e) {
            self.style.opacity = '1';
            window.removeEventListener('mouseup', onResizeEnd);
            window.removeEventListener('mousemove', onResizing);
        }

        function onResizing(e) {
            var diff = e.pageX - start.x;
            self.style.width = '' + (origin.width - diff) + 'px';
            self.style.left = '' + (origin.x + diff) + 'px';
            self.style.height = '' + (origin.height + (e.pageY - start.y)) + 'px';
        }
    }

    function _addSouthEastEvents() {
        var el = this.shadowRoot.querySelector('.south-east');
        var self = this;
        var origin = {};
        var start  = {};

        el.addEventListener('mousedown', onResizeStart);

        function onResizeStart(e) {
            if (e.which !== 1) {
                return;
            }
            setBeginningVariables.call(self, origin, start, e);
            self.style.opacity = '0.5';
            window.addEventListener('mouseup', onResizeEnd);
            window.addEventListener('mousemove', onResizing);
        }

        function onResizeEnd(e) {
            self.style.opacity = '1';
            window.removeEventListener('mouseup', onResizeEnd);
            window.removeEventListener('mousemove', onResizing);
        }

        function onResizing(e) {
            var diffX = e.pageX - start.x;
            self.style.width = '' + (origin.width + diffX) + 'px';
            self.style.height = '' + (origin.height + (e.pageY - start.y)) + 'px';
        }
    }

    function setBeginningVariables(origin, start, e) {
        origin.height = + this.style.height.replace(/[^0-9\.]+/g,'');
        origin.width = + this.style.width.replace(/[^0-9\.]+/g,'');
        origin.x = this.offsetLeft;
        origin.y = this.offsetTop;
        start.x = e.pageX;
        start.y = e.pageY;
    }

});