Trio.Module.export('moduleStyle', function() {
    var style = {
        ':host': {
            'position': 'absolute',
            'display': 'flex',
            'flex-flow': 'column nowrap',
            'height': '400px',
            'width': '600px',
            'background-color': Trio.Stylizer.toRGBa(Trio.Stylizer.getVariable('base-color'), 0.9),
            'border-radius': '2px',
            "box-shadow": '0px 0px 3px ' + Trio.Stylizer.getVariable('shadow-color')
        },
        '.module-header': {
            'display': 'flex',
            'flex-flow': 'row nowrap',
            'flex': '0 0 auto',
            'height': '30px',
            'background-color': Trio.Stylizer.getVariable('base-color'),
            'border-top-right-radius': '2px',
            'border-top-left-radius': '2px',
            'cursor': 'move'
        },
        '.module-title': {
            'color': Trio.Stylizer.getVariable('layout-color'),
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
            'flex': '1 0 auto',
            'border-bottom-right-radius': '2px',
            'border-bottom-left-radius': '2px',
            'height': 'calc(100% - 30px)',
            'overflow': 'hidden'
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
    };

    return style;
});