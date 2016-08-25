const icons =[
  {
    id: 'FOLDER',
    name: 'My Blogs'
  },
  {
    id: 'MINESWEEPER',
    name: 'Minesweeper'
  }
];

const windowsMap = {
  'MINESWEEPER': {
    id: 'MINESWEEPER',
    name: 'Minesweeper',
    buttons: ['MINIMIZE', 'MAXIMIZE', 'CLOSE'],
    actions: ['FILE', 'EDIT', 'VIEW', 'HELP']
  },
  'FOLDER': {
    id: 'FOLDER',
    name: 'My Blogs',
    buttons: ['MINIMIZE', 'MAXIMIZE', 'CLOSE'],
    actions: ['FILE', 'EDIT', 'VIEW', 'HELP']
  },
} 

function layout(req, res) {
  const fixture = {
    icons,
    windows: []
  };

  res.send(fixture);
}

function windows(req, res) {
  const {windowId} = req.params;
  const fixture = windowsMap[windowId];
  res.send(fixture);
}

export default {
  layout,
  windows
};
