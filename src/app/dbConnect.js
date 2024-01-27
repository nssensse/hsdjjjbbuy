const mongoose = require('mongoose')

export default async function dbConnect(){
    await mongoose.connect("mongodb+srv://admin:dsfdsf3eewww@cluster0.s1ptv1e.mongodb.net/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}