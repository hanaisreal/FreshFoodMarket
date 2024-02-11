import {Schema, models, model} from "mongoose";
import bcrypt from 'bcrypt';

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

UserSchema.post('validate', function(user) {
    const notHashedPassword = user.password;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(notHashedPassword, salt);
    user.password = bcrypt.hashSync(notHashedPassword, salt);
} )

export const User = models?.User || model('User', UserSchema);