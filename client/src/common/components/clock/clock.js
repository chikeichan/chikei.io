Trio.Module.import({
    'clockStyle': './src/common/components/clock/style/clockStyle.js',
    'clockTemplate': './src/common/components/clock/template/clockTemplate.js'
})

.and.export('clockComponent', function(ret) {
    var frag = ret.clockTemplate.render();
    var style = Trio.Stylizer.createStyleTag(ret.clockStyle);
    var dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return Trio.Component.register({
        tagName: 'ck-clock',
        fragment: frag,
        style: style,
        onCreate: function() {
            this.day      = this.shadowRoot.querySelector('.clock-day');
            this.hour     = this.shadowRoot.querySelector('.clock-hour');
            this.minute   = this.shadowRoot.querySelector('.clock-minute');
            this.meridiem = this.shadowRoot.querySelector('.clock-meridiem');
        },

        onAttach: function() {
            this.updateTime();
        },

        updateTime: function() {
            var timeNow = new Date();
            this.setDay(timeNow.getDay());
            this.setHour(timeNow.getHours())
            this.setMinute(timeNow.getMinutes())
            this.setMeridiem(timeNow.getHours() < 12 ? 'AM' : 'PM');
            setTimeout(this.updateTime.bind(this), 60000);
        },

        setHour: function(hr) {
            this.hour.textContent = hr;
        },

        setDay: function(day) {
            this.day.textContent = dayMap[day];
        },

        setMinute: function(min) {
            min = min < 10 ? '0' + min : '' + min;
            this.minute.textContent = min;
        },

        setMeridiem: function(ampm) {
            this.meridiem.textContent = ampm;
        }
    });
});