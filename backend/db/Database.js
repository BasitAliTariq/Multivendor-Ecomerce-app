const mongoose = require("mongoose");

//Ye us ne tutorial me keraya hai per ab is ki need nai hai
// const connectDatabase = () => {
//   mongoose
//     .connect(process.env.DB_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then((data) => {
//       console.log(`Mongo db connected with server:${data.connection.host} `);
//     });
// };

//Hum jst esay ker saktay hai
const connectDatabase = () => {
  mongoose.connect(process.env.DB_URL).then((data) => {
    console.log(
      `Mongo db connected with server:${data.connection.host} successfully `
    );
  });
};
module.exports = connectDatabase;
