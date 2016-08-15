function layout(req, res) {
  const fixture = {
    icons: ['MINESWEEPER']
  };

  res.send(fixture);
}

export default {
  layout
};
