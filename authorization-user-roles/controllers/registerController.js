const userDB = {
  users: require('../model/users.json'),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromise = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res.status(400).json({
      message: 'Username and password are required',
    });

  // Check for duplicate username in db
  const duplicate = userDB.users.find((person) => person.username === user);
  if (duplicate) return res.status(409).json({ message: 'Duplicate username' });

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const newUser = {
      username: user,
      password: hashedPwd,
      roles: {
        User: 2001,
      },
    };

    userDB.setUsers([...userDB.users, newUser]);

    await fsPromise.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(userDB.users)
    );

    res.status(201).json({ message: `New user ${user} is created!!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
