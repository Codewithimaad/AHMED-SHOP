import userModel from '../models/userModel.js'
import Validator from 'validator';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

//Route for userLogin
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // To Check if User is Exist or Not
        const isUserRegistered = await userModel.findOne({ email });

        if (!isUserRegistered) {
            return res.json({ success: false, message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, isUserRegistered.password);

        if (isMatch) {

            const token = createToken(isUserRegistered._id);
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, message: 'Invalid Credentials' })
        }
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


const getUser = async (req, res) => {
    try {
        const { userId } = req.body; // Extract user ID from the token (decoded in middleware)

        // Fetch user from database, excluding password for security
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};



//Route for userRegistration
const registerUser = async (req, res) => {

    try {

        const { name, password, email } = req.body;

        // Checking user if already exist or not
        const existUser = await userModel.findOne({ email });
        if (existUser) {
            return res.json({ success: false, message: 'User Already Exist' });
        }

        // Validating email format
        if (!Validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please enter a valid Email' });
        }

        // Validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: 'Please enter a strong Password' });
        }

        // Using bcrypt to hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating new User
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();

        const token = createToken(user._id);

        res.json({ success: true, token });


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}





// Route for Admin Login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const payload = { email, role: 'admin' }; // Create a payload with the email and role
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generate the token with the payload and a expiration time
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}



export { loginUser, registerUser, adminLogin, getUser }