Trio.Module.export('moduleStyle', function() {
    var style = {
        ':host': {
            'position': 'absolute',
            'display': 'flex',
            'flex-flow': 'column nowrap',
            'height': '400px',
            'width': '600px',
            'background-color': Trio.Stylizer.toRGBa(Trio.Stylizer.getVariable('base-color'), 0.8),
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
            'border-bottom-left-radius': '2px'
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
        },
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
    };

    return style;
});