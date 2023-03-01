const { getAll, createUser, removeUser, updateUser, getOne } = require('../Controllers/user.controllers');
const express = require('express');

const userRouter = express.Router();

userRouter.route("/")
		.get(getAll)
        .post(createUser);
userRouter.route("/:id")
    .delete(removeUser)
    .put(updateUser)
    .get(getOne)

module.exports = userRouter;