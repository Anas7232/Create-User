const jwtToken = require('../config/token');
const User = require('../models/userMdl');
const asyncHandler = require('express-async-handler');
const mongodbId = require('../utils/mongodbid');
const jwtRefreshToken = require('../config/tokenRefresh');

const createUser = asyncHandler(async (req, res) => {

    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {

        const newUser = await User.create(req.body);
        res.json(newUser)

    } else {
        throw new Error('User Allready Exists...!!!!!')
    }

});


const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {

        const resfresToken = await jwtRefreshToken(findUser?._id);
        const updateUser = await User.findOneAndUpdate(
            findUser.id,
            {
                resfresToken: resfresToken
            },
            {
                new: true
            }
        );
        res.cookie('resfresToken', resfresToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000
        })

        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            token: jwtToken(findUser?._id)
        })

    } else {
        throw new Error('Wrong user Data...!!!!')
    }

});

const handlerCookie = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    console.log(cookie);
})

const getAllUser = asyncHandler(async (req, res) => {
    try {

        const getUser = await User.find()
        res.json(getUser)

    } catch (error) {
        throw new Error(error)
    }
});


const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    mongodbId(_id);
    try {

        const updateaUser = await User.findByIdAndUpdate(_id, {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile
        },
            {
                new: true
            }
        );

        res.json(updateaUser)

    } catch (error) {
        throw new Error(error)
    }
})


const getSingleUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    mongodbId(id);
    try {
        const getAUser = await User.findById(id);
        res.json({
            getAUser
        })

    } catch (error) {
        throw new Error(error)
    }
})

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    mongodbId(id);
    try {
        const deleteAUser = await User.findByIdAndDelete(id);
        res.json({
            deleteAUser
        })

    } catch (error) {
        throw new Error(error)
    }
})


const blockUser = asyncHandler(async (req, res) => {

    const { id } = req.params;
    mongodbId(id);
    try {

        const blocked = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: true
            },
            {
                new: true
            }
        );
        res.json({
            message: 'User Blocked....!!!!'
        })

    } catch (error) {
        throw new Error(error)
    }

});
const unBlockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    mongodbId(id);
    try {

        const unblocked = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: false
            },
            {
                new: true
            }
        );
        res.json({
            message: 'User UnBlocked....!!!!'
        })

    } catch (error) {
        throw new Error(error)
    }
});

module.exports = { 
    createUser, 
    login, 
    getAllUser, 
    getSingleUser,
    deleteUser, 
    updateUser, 
    blockUser, 
    unBlockUser, 
    handlerCookie 
};