import mongoose from 'mongoose';
import 'dotenv/config';

let connection = undefined;

/**
 * This function connects to the MongoDB server.
 */
async function connect() {
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        connection = mongoose.connection;
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true },
}, { collection: 'exercises' });

const Exercise = mongoose.model('Exercise', exerciseSchema);

async function create(params) {
    const exercise = new Exercise(params);
    return exercise.save();
}

async function find(filter) {
    return Exercise.find(filter).exec();
}

async function getById(id) {
    return Exercise.findById(id).exec();
}

async function updateById(id, params) {
    return Exercise.findByIdAndUpdate(id, params, { new: true }).exec();
}

async function deleteById(id) {
    return Exercise.findByIdAndDelete(id).exec();
}

async function deleteMany(filter) {
    return Exercise.deleteMany(filter).exec();
}

export { connect, create, find, getById, updateById, deleteById, deleteMany };
