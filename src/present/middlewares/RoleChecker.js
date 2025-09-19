module.exports = function roleChecker(...allowedRoles) {
  return (req, res, next) => {
    try {
      const user = req.user
      if (!user) {
        return res.status(401).json({
          status: "failed",
          message: "Unauthorized, user not found",
        })
      }

      console.log("User role:", user)

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({
          status: "failed",
          message: "Forbidden: You don't have access to this resource",
        })
      }

      next()
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        message: "Internal Server Error",
        error: error.message,
      })
    }
  }
}
