import Icons from '../models/icons'

function getLayout(req, res) {
  const fixture = {
    icons: Icons.getAll(),
    windows: []
  };

  res.send(fixture);
}

export default {
  getLayout
};
