const usersDB = {
  users: require('../model/users.json'),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromise = require('fs').promises;
const path = require('path');

async function handleLogin(req, res) {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: 'Username and password must be provided' });

  const foundedUser = usersDB.users.find((person) => person.username === user);

  if (!foundedUser) return res.sendStaus(401); // Unauthorized

  const matchedPassword = await bcrypt.compare(pwd, foundedUser.password);

  if (!matchedPassword) return res.status(401);

  // create JWT
  const accessToken = jwt.sign(
    { username: foundedUser.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '30s' }
  );

  const refreshToken = jwt.sign(
    { username: foundedUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }
  );

  // Saving current user with refresh token
  const otherUsers = usersDB.users.filter(
    (person) => person.username !== foundedUser.username
  );
  const currentUser = { ...foundedUser, refreshToken };

  usersDB.setUsers([...otherUsers, currentUser]);
  await fsPromise.writeFile(
    path.join(__dirname, '..', 'model', 'users.json'),
    JSON.stringify(usersDB.users)
  );

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.json({ accessToken });
}

module.exports = { handleLogin };
