import {Schema, models, model} from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }, 
}, {timestamps: true});

export const User = models?.User || model('User', UserSchema);