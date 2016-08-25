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

const windows = [
  // {
  //   id: 'MINESWEEPER',
  //   name: 'Minesweeper',
  //   buttons: ['MINIMIZE', 'MAXIMIZE', 'CLOSE'],
  //   actions: ['FILE', 'EDIT', 'VIEW', 'HELP']
  // }
]; 

function layout(req, res) {
  const fixture = {
    icons, windows
  };

  res.send(fixture);
}

export default {
  layout
};
