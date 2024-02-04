const usersDB = {
  users: require('../model/users.json'),
  setUsers: function (data) {
    this.users = data;
  },
};

const jwt = require('jsonwebtoken');
require('dotenv').config();

function handleRefreshToken(req, res) {
  const cookies = req.cookies;

  if (!cookies?.refreshToken) return res.sendStatus(401);

  const refreshToken = cookies.refreshToken;

  const foundedUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );

  if (!foundedUser) return res.sendStaus(401); // Unauthorized

  // evaluate refreshToken
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    // error : token not valid or expired
    if (err || foundedUser.username !== decoded.username) {
      return res.sendStatus(403);
    }

    // Otherwise, issue new access token
    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    );

    res.json({ accessToken });
  });
}

module.exports = { handleRefreshToken };
