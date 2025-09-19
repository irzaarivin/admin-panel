const socketRoutes = require('./socket-route');
const userRoutes = require('./user-route');
const authRoutes = require('./auth-route');
const moduleRoutes = require('./module-route');

const routes = async (app, controllers, middlewares) => {
  const { usersController, authController, moduleController } = await controllers
  const { ErrorHandler, AuthChecker, RoleChecker } = middlewares
  
  app.use(await ErrorHandler)

  app.use('/user', await userRoutes(usersController, AuthChecker));
  app.use('/module', await moduleRoutes(moduleController, { AuthChecker, RoleChecker }));
  app.use('/auth', await authRoutes(authController));

  return app;
};

const socket = async (socket, io, controllers) => {
  const { socketController } = await controllers

  await socketRoutes(socket, io, socketController)
};

module.exports = { routes, socket };
