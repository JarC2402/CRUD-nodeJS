const catchError = require('../utils/catchError');
const User = require('../Models/User');

const getAll = catchError(async(req, res) => {
    // Operaciones...
    const users = await User.findAll();
    return res.json(users);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id)
    return res.json(user);
});

const createUser = catchError(async(req, res) => {
    const { first_name, last_name, email, password, birthday } = req.body;
    const userNew = await User.create({
        first_name,
        last_name,
        email,
        password,
        birthday
    })
return res.status(201).json(userNew)
});


const removeUser = catchError(async(req, res) => {
    const { id } = req.params;
    const userDelete = await User.destroy({ where: {id}})
    if (userDelete === 0) return res.status(404).json({message: "user no found"})
    return res.sendStatus(204);
});

const updateUser = catchError(async(req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, password, birthday } = req.body;
const user = await User.update(
            { first_name, last_name, email, password, birthday }, 
            { where: {id}, returning: true }) 
            if(user[0] === 0)  return res.status(404).json({message: "user no found"})
return res.json(user[1][0]);
});


module.exports = {
    getAll,
    createUser,
    removeUser,
    updateUser,
    getOne
}