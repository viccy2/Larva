require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");

app.use(express.json());
app.use('/api/users', userRouter);

// app.get('/api', (req, res) => {
//     res.json({
//         success : 1,
//         message : "rest api working"
//     });
// });

app.listen(process.env.APP_PORT, () => {
    console.log("app running on port ", process.env.APP_PORT);
});