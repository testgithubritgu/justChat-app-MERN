const userModel = require("../models/UserModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

//create new user
exports.newUser = async (req, res) => {
    const { name, email, password, role, address, phone } = req.body
    const userExist = await userModel.findOne({ email })

    if (userExist) {
        return res.status(409).json({ meassage: "user already exist " })
    }

    try {
        const hashPass = await bcrypt.hash(password, 10)
        const user = await userModel.create({
            name, email, password: hashPass, address, phone
        })

        res.status(201).json({ message: "new user created successfully!!" })
    } catch (error) {
        res.status(500).json({ message: "internal server error", er: error })
    }
}

//user login
exports.login = async (req, res) => {
    const { email, password } = req.body
    try {

        const userExist = await userModel.findOne({ email })

        if (!userExist) { return res.status(404).json({ message: "user not exist " }) }

        const checkPass = await bcrypt.compare(password, userExist.password)

        if (!checkPass) { return res.status(400).json({ message: "invalid credintials " }) }

        const token = jwt.sign({ id: userExist._id, role: userExist.role }, process.env.TOKEN_SECRET_KEY)
        res.status(200).json({ message: "user logged in...", token })

    } catch (error) {
        res.status(500).json({ message: "internal server error", error })
    }


}

//update account
exports.userAccountUpdate = async (req, res) => {
    try {
        const { name, email, oldpass, newpass, address, phone } = req.body
        const { id } = req.user
        const findeUser = await userModel.findById(id)
        if (!findeUser) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        findeUser.name = name || findeUser.name
        findeUser.email = email || findeUser.email
        findeUser.address = address || findeUser.address
        findeUser.phone = phone || findeUser.phone

        const pass = oldpass || false
        if (pass) {

            const checkPass = await bcrypt.compare(oldpass, findeUser.password)
            if (!checkPass) {
                return res.status(401).json({ message: "invalid password", success: false })
            }
            if (newpass) {
                const updatePass = await bcrypt.hash(newpass, 10)
                findeUser.password = updatePass
            }
        }
        await findeUser.save()

        res.status(200).json({ message: "Account updated successfully", success: true, data: findeUser });

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Server error", success: false });

    }
}

//get all user
exports.getAllusers = async (req, res) => {
    try {

        const getUsers = await userModel.find()
        res.status(200).json({ message: "all users", users: getUsers })
        
    } catch (error) {
        res.status(500).json({ message: "internal server error ", error })
    }
}