import mongoose from "mongoose";
const { connect, connection } = mongoose;

connect('mongodb://localhost:27017/socialDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export default connection;