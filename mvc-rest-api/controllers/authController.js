const userDB = {
  users: require('../model/users.json'),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require('bcrypt');

async function handleLogin(req, res) {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: 'Username and password must be provided' });

  const foundedUser = userDB.users.find((person) => person.username === user);

  if (!foundedUser) return res.sendStaus(401); // Unauthorized

  const match = await bcrypt.compare(pwd, foundedUser.password);

  if (!match) return res.status(401);

  // create JWT
  res.json({ success: `User ${user} is logged in` });
}

module.exports = { handleLogin };
