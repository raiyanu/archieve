import mongoose from 'mongoose';
import {log as p} from "console";
await mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
    }).catch((err) => {
    console.log('Error: ', err);
    }
);

const testDB =  mongoose.Schema({
    name: String,
    age: Number
});
const testModel = mongoose.model('testModel', testDB);
try {
    p(await testModel.findOne());
    p('Success');
} catch (error) {
    p(error);
}