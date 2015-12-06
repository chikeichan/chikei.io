Trio.Module.export(function() {
    var style = Trio.Stylizer.create();
        style.select(':host')
                .css({
                   'color': '$layout-color',
                   'display': 'inline-flex',
                   'align-items': 'center',
                   'height': '100%',
                   'padding': '0 12px',
                   'cursor': 'pointer'
                })
            .select(':host(:hover)')
                .css({
                   'background-color': 'rgba($layout-color, 0.1)'
                })
            .select(':host(:active)')
                .css({
                   'background-color': 'rgba($base-color, 0.1)'
                })
            .select('span')
                .css({
                   '-webkit-user-select': 'none'
                })
            .select('.clock-day')
                .css({
                   'margin-right': '0.2em',
                   'color': '$theme-color',
                   'font-weight': '700'
                })
            .select('.clock-minute')
                .css({
                   'margin-right': '0.1em'
                });

    var tmpl = Trio.Renderer.createTemplate();
        tmpl.open('style').text(style.toCSS.bind(style)).close()
            .open('span.clock-day').text(function(d) {return d.day}).close()
            .open('span.clock-hour').text(function(d) {return d.hour}).close()
            .open('span.clock-colon').text(':').close()
            .open('span.clock-minute').text(function(d) {return d.minute}).close()
            .open('span.clock-meridiem').text(function(d) {return d.meridiem}).close();

    var dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return Trio.Component.register({
        tagName: 'ck-clock',
        template: tmpl,

        onAttach: function() {
            this.updateTime();
        },

        getUpdatedTime: function() {
            var timeNow = new Date();
            var min = timeNow.getMinutes();

            return {
                day: dayMap[timeNow.getDay()],
                hour: timeNow.getHours(),
                minute: min < 10 ? '0' + min : '' + min,
                meridiem: timeNow.getHours() < 12 ? 'AM' : 'PM'
            };
        },

        updateTime: function() {
            this.patch(this.getUpdatedTime());
            setTimeout(this.updateTime.bind(this), 60000);
        }
    });
});