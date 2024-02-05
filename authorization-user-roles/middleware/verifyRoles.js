const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);

    const allowedRolesArr = [...allowedRoles];
    console.log(allowedRolesArr, 'allowed');

    const result = allowedRolesArr.some((role) => req.roles.includes(role));

    if (!result) {
      return res
        .status(401)
        .json({ message: 'this user is not allowed to perform this action' });
    }

    next();
  };
};

module.exports = verifyRoles;
