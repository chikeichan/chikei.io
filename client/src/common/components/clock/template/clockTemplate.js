Trio.Module.export('clockTemplate', function() {
    var tmpl = Trio.Renderer.createTemplate();

    tmpl.open('span.clock-day').text(function(d) {return d.day}).close()
        .open('span.clock-hour').text(function(d) {return d.hour}).close()
        .open('span.clock-colon').text(':').close()
        .open('span.clock-minute').text(function(d) {return d.minute}).close()
        .open('span.clock-meridiem').text(function(d) {return d.meridiem}).close()

    return tmpl;
});