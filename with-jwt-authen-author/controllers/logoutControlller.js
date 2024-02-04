const usersDB = {
  users: require('../model/users.json'),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require('fs').promises;
const path = require('path');

function handleLogout(req, res) {
  // On Client ALSO NEED TO delete the accessToken
  const cookies = req.cookies;

  if (!cookies?.refreshToken) return res.sendStatus(204); // No content to send back

  const refreshToken = cookies.refreshToken;

  // is refreshToken in DB?
  const foundedUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );

  if (!foundedUser) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.sendStatus(204); // No content to send back
  }

  // Delete refreshtoken in the DB;
  const otherUsers = usersDB.users.filter(
    (person) => person.refreshToken !== foundedUser.refreshToken
  );
  const currentUser = { ...foundedUser, refreshToken: '' };
  usersDB.setUsers([...otherUsers, currentUser]);

  await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json')
    JSON.stringify(usersDB.users)
  ),

  res.clearCookie('refreshToken', {httpOnly: true, maxAge: 24 * 60}) // secure: true, only servers on https
  res.sendStatus(204);
}

module.exports = { handleLogout };
