const { default: mongoose } = require('mongoose');
const { NewUser } = require('../model/authModel');
const bcrypt = require('bcrypt');
const CheckPassword = async (inputPassword, hashedPassword) => {
    try {
        const match = await bcrypt.compare(inputPassword, hashedPassword);
        return match;
    } catch (error) {
        console.error('Error checking password:', error);
        return false;
    }
};

const HashPass = async (password) => {
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error; // Rethrow the error to indicate that password hashing failed
    }
};

const createNewUser = async (req, res) => {
    try {
        const { organizationID } = req.params;
        const { userName, firstName, lastName, password, dateOfBirth, emailId } = req.body;
        const hashedPassword = await HashPass(password);
        const newUser = new NewUser({
            _id: new mongoose.Types.ObjectId(),
            userName,
            firstName,
            lastName,
            password:hashedPassword, // Corrected: Use the hashedPassword
            dateOfBirth,
            emailId,
            organizationID,
        });

        await newUser.save();
        res.json({ success: true, message: 'NewUser created successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};



const deleteUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await NewUser.findByIdAndDelete(userId);
        if (!result) {
            return res.json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};



const login = async (req, res) => {
    try {
        const { organizationID } = req.params;
        const { emailId, password } = req.body;
        const user = await NewUser.findOne({ emailId, organizationID });
        if (!user) {
            res.json({ success: false, message: 'No user found. Sign up.' });
        } else {
            const passwordMatch = await CheckPassword(password, user.password);
            if (user.organizationID === organizationID && passwordMatch) {
                res.json({ success: true, message: `User found: ${user.emailId}`,Password:password });
            } else {
                res.json({ success: false, message: 'Incorrect password.' });
            }
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

const admin = async (req, res) => {
    try {
        const allusers = await NewUser.find(); // Corrected: Added 'await'
        res.json(allusers);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error.', error: error });
    }
};

const getUserById = async(req,res) => {
    const {userId} = req.params;
    try{

        const user = await NewUser.findById({userId});
        if(!user){
            res.json({ success: false, message: 'No user found. Sign up.' });
        }

    }catch(error){

        res.status(500).json({ success: false, message: 'Internal server error.', error: error });

    }
};

module.exports = { createNewUser, login, admin, deleteUserById, getUserById };
