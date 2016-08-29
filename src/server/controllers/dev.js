const icons =[
  {
    id: 'TUTORIALS',
    type: 'FOLDER',
    name: 'Tutorials'
  },
  {
    id: 'MINESWEEPER',
    type: 'MINESWEEPER',
    name: 'Minesweeper'
  }
];

const blogs = [
  {
    id: 'HELLO_WORLD',
    type: 'BLOG',
    name: 'Hello World!'
  },
  {
    id: 'HELLO_WORLD1',
    type: 'BLOG',
    name: 'Hello World!'
  },
  {
    id: 'HELLO_WORLD2',
    type: 'BLOG',
    name: 'Hello World!'
  },
  {
    id: 'HELLO_WORLD3',
    type: 'BLOG',
    name: 'Hello World!'
  },
  {
    id: 'HELLO_WORLD4',
    type: 'BLOG',
    name: 'Hello World!'
  },
  {
    id: 'HELLO_WORLD5',
    type: 'BLOG',
    name: 'Hello World!'
  },
  {
    id: 'HELLO_WORLD6',
    type: 'BLOG',
    name: 'Hello World!'
  }
];

const windowsMap = {
  'MINESWEEPER': {
    id: 'MINESWEEPER',
    type: 'MINESWEEPER',
    name: 'Minesweeper',
    buttons: ['MINIMIZE', 'NO_MAXIMIZE', 'CLOSE'],
    actions: ['GAME', 'HELP']
  },
  'TUTORIALS': {
    id: 'TUTORIALS',
    type: 'FOLDER',
    name: 'Tutorials',
    buttons: ['MINIMIZE', 'MAXIMIZE', 'CLOSE'],
    actions: ['FILE', 'EDIT', 'VIEW', 'HELP'],
    appData: {
      blogs: blogs
    }
  },
} 

function layout(req, res) {
  const fixture = {
    icons,
    windows: []
  };

  setTimeout(() => res.send(fixture), 500);
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
