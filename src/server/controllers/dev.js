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

function layout(req, res) {
  const fixture = {
    icons: icons
  };

  res.send(fixture);
}

export default {
  layout
};
