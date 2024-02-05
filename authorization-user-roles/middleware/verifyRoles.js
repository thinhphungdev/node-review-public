const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);

    const allowedRolesArr = [...allowedRoles];
    console.log(roles, 'Roles nek');

    const result = req.roles
      .map((role) => allowedRolesArr.inclues(role))
      .find((value) => value === true);

    if (!result) return res.sendStatus(401);

    next();
  };
};

module.exports = verifyRoles;
