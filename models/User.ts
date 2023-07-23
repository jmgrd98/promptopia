import {Schema, model, models} from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username already exists"],
        match: [/^[a-zA-Z0-9]+$/, "Username must be alphanumeric"],
    },
    image: {
        type: String,
    },
});


const User = models.User || model("User", UserSchema);

export default User;