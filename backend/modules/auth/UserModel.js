import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name."],
    },
    email: {
        type: String,
        required: [true, "Please provide your email."],
        unique: true,
        trim: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please add a valid email."],
    },
    password: {
        type: String,
        required: [true, "Please provide your password."],
    },
    photo: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "I'm a new user."
    },
    role: {
        type: String,
        enum: ["user", "admin", "creator"],
        default: "user",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
},
    { timestamps: true, minimize: true }
);

UserSchema.pre("save", async function (next) {

    if (!this.isModified("passowrd")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;

});

const UserModel = new mongoose.model("User", UserSchema);

export default UserModel;