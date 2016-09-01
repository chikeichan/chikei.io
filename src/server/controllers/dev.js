import fs from 'fs';
import path from 'path';

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
  }
];

const windowsMap = {
  MINESWEEPER: {
    id: 'MINESWEEPER',
    type: 'MINESWEEPER',
    name: 'Minesweeper',
    buttons: ['MINIMIZE', 'NO_MAXIMIZE', 'CLOSE'],
    actions: ['GAME', 'HELP']
  },
  TUTORIALS: {
    id: 'TUTORIALS',
    type: 'FOLDER',
    name: 'Tutorials',
    buttons: ['MINIMIZE', 'MAXIMIZE', 'CLOSE'],
    actions: ['VIEW', 'HELP'],
    appData: {
      blogs: blogs
    }
  },
  HELLO_WORLD: {
    id: 'HELLO_WORLD',
    type: 'BLOG',
    name: 'Hello World!',
    buttons: ['MINIMIZE', 'MAXIMIZE', 'CLOSE'],
    actions: ['VIEW', 'HELP']
  }
} 

function layout(req, res) {
  const fixture = {
    icons,
    windows: []
  };

  setTimeout(() => res.send(fixture), 500);
}

function windows(req, res, next) {
  const {windowId} = req.params;
  const fixture = windowsMap[windowId] || {};

  if (windowId === 'HELLO_WORLD') {
    fs.readFile(`${process.cwd()}/blogs/hellow-world.md`, {encoding: "utf-8"}, (err, data) => {
      if (err) {
        return next(err);
      }

      res.send({
        ...windowsMap.HELLO_WORLD,
        appData: {
          markdown: data
        }
      });
    });
  } else {
    setTimeout(() => res.send(fixture), 250);
  }
}

export default {
  layout,
  windows
};
