Trio.Module.import({
    'clockStyle': './src/common/components/clock/style/clockStyle.js',
    'clockTemplate': './src/common/components/clock/template/clockTemplate.js'
})

.and.export('clockComponent', function(ret) {
    var frag = ret.clockTemplate.render({});
    var style = Trio.Stylizer.createStyleTag(ret.clockStyle);
    var dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return Trio.Component.register({
        tagName: 'ck-clock',
        fragment: frag,
        style: style,

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
            ret.clockTemplate.patch(this.shadowRoot, this.getUpdatedTime());
            this.shadowRoot.appendChild(style);
            setTimeout(this.updateTime.bind(this), 60000);
        }
    });
});