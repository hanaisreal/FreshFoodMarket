import {User} from "./../../../models/User";
import mongoose from 'mongoose';

export async function POST(req){
    //mongoose.connect('mongodb://localhost:3000').catch(err);

    const body = await req.json();
    mongoose.connect(process.env.MONGO_URL);
    const createdUser = await User.create(body);
    // const pass = body.password;
    // if (!pass?.length || pass.length < 5) {
    //     throw new Error('password must be at least 5 characters');
    // }
    return Response.json(createdUser);
}