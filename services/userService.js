const Factory = require("./handlersFactory");
const userModel = require("../moduls/userModel");

// @desc get list of user
// @route GET /api/v1/users
// @access Public
exports.getUsers = Factory.getAll(userModel);

// @desc Get specific user by id
// @route GET /api/v1/users/:id
// @access public
exports.getUser = Factory.getOne(userModel);

// @desc Create user
// @route POST /api/v1/users
// @access Private
exports.createUser = Factory.create(userModel);

// @desc Update specific user
// @route PUT /api/v1/users
// @access Private
exports.updateUser = Factory.update(userModel);

// @desc Delete specific user
// @route DELETE /api/v1/users
// @access Private
exports.deleteUser = Factory.delete(userModel);
