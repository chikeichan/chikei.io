Trio.Module.export('clockTemplate', function() {
    var tmpl = Trio.Renderer.createTemplate();

    tmpl.create('span.clock-day').append()
        .create('span.clock-hour').append()
        .create('span.clock-colon').text(':').append()
        .create('span.clock-minute').append()
        .create('span.clock-meridiem').appendLast()

    return tmpl;
});