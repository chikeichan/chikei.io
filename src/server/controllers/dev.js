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
    buttons: ['MINIMIZE', 'NO_MAXIMIZE', 'CLOSE'],
    actions: ['GAME', 'HELP']
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
  setTimeout(() => res.send(fixture), 250);
}

export default {
  layout,
  windows
};
