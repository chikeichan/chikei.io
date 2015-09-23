Trio.Module.export('blogReaderStyle', function() {
    var style = {
        ':host': {
            'display': 'flex',
            'flex-flow': 'row nowrap',
            'flex': '1 0 auto',
            'width': '100%'
        },
        '.nav': {
            // 'background-color': '#1F1F1F',
            'background-color': Trio.Stylizer.toRGBa(Trio.Stylizer.getVariable('theme-color'), 0.4),
            'border-right': '2px solid black',
            'width': '200px',
            'position': 'relative',
            'flex': '0 0 auto'
        },
        '.blog-content': {
            // 'background-color': '#3A3A3A',
            'width': '100%',
            'display': 'flex',
            'flex-flow': 'column nowrap',
            'padding': '12px',
            'overflow-y': 'scroll'
        },
        '.nav-folder': {
            'display': 'flex',
            'padding': '12px',
            'margin': '2px 0',
            'font-weight': '100',
            'color': Trio.Stylizer.getVariable('layout-color'),
            'text-transform': 'uppercase',
            'cursor': 'pointer',
            'background-color': 'rgba(0, 0, 0, 0.1)',
            '-webkit-user-select': 'none'
        },
        '.nav-folder:hover': {
            'background-color': 'rgba(0, 0, 0, 0.05)'
        },
        '.nav-folder:active': {
            'background-color': 'rgba(0, 0, 0, 0.15)'
        },
        '.nav-item': {
            'padding': '4px 4px 4px 16px',
            'font-weight': '100',
            'color': Trio.Stylizer.toRGBa(Trio.Stylizer.getVariable('layout-color'), 0.75),
            'font-size': '0.6em',
            'text-transform': 'capitalize',
            'cursor': 'pointer',
            'background-color': 'rgba(255, 255, 255, 0.1)',
            '-webkit-user-select': 'none',
            'white-space': 'nowrap',
            'text-overflow': 'ellipsis',
            'overflow': 'hidden'
        },
        '.nav-item:hover': {
            'background-color': 'rgba(255, 255, 255, 0.15)'
        },
        '.nav-item:active': {
            'background-color': 'rgba(255, 255, 255, 0.05)'
        },
        '.blog-header': {
            'display': 'flex',
            'font-size': '2.4em',
            'font-weight': '300',
            'color': Trio.Stylizer.getVariable('layout-color'),
            'padding': '24px'
        },
        '.blog-author': {
            'display': 'flex',
            'font-size': '0.7em',
            'font-weight': '300',
            'color': Trio.Stylizer.getVariable('layout-color'),
            'padding': '12px 24px',
            'border-bottom': '1px solid ' + Trio.Stylizer.toRGBa(Trio.Stylizer.getVariable('layout-color'), 0.2)
        },
        '.blog-body': {
            'display': 'flex',
            'font-size': '0.9em',
            'font-weight': '100',
            'color': Trio.Stylizer.toRGBa(Trio.Stylizer.getVariable('layout-color'), 0.8),
            'padding': '12px 24px',
            'line-height': '1.8em',
        }
    };

     return style;
});