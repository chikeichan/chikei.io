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

function getLayout(req, res) {
  const fixture = {
    icons,
    windows: []
  };

  res.send(fixture);
}

export default {
  getLayout
};
