Trio.Module.export('resizable', function() {
    var key = {
        'south': _addSouthEvents,
        'north': _addNorthEvents,
        'east': _addEastEvents,
        'west': _addWestEvents,
        'north-west': _addNorthWestEvents,
        'north-east': _addNorthEastEvents,
        'South-west': _addSouthWestEvents,
        'South-east': _addNorthEastEvents,
    };

    var Resizable = {
        initResizable: function(indicators) {
            indicators = indicators || [];
            indicators.forEach(function(indicator) {
                key[indicator].call(this);
            }.bind(this));
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
            origin.height = +self.style.height.replace(/\D/g,'');
            origin.width = +self.style.width.replace(/\D/g,'');
            start.x = e.pageX;
            start.y = e.pageY;
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
            origin.height = + self.style.height.replace(/\D/g,'');
            origin.width = + self.style.width.replace(/\D/g,'');
            origin.x = self.offsetLeft;
            origin.y = self.offsetTop;
            start.x = e.pageX;
            start.y = e.pageY;
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
            origin.height = + self.style.height.replace(/\D/g,'');
            origin.width = + self.style.width.replace(/\D/g,'');
            origin.x = self.offsetLeft;
            origin.y = self.offsetTop;
            start.x = e.pageX;
            start.y = e.pageY;
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
            origin.height = + self.style.height.replace(/\D/g,'');
            origin.width = + self.style.width.replace(/\D/g,'');
            origin.x = self.offsetLeft;
            origin.y = self.offsetTop;
            start.x = e.pageX;
            start.y = e.pageY;
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
        _addNorthEvents.call(this);
        _addWestEvents.call(this);
    }

    function _addNorthEastEvents() {
        _addNorthEvents.call(this);
        _addEastEvents.call(this);
    }

    function _addSouthWestEvents() {
        _addSouthEvents.call(this);
        _addWestEvents.call(this);
    }

    function _addSouthEastEvents() {
        _addSouthEvents.call(this);
        _addEastEvents.call(this);
    }

});