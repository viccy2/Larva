const { create, getUsers, getUserById, updateUser, deleteUser, getUserByEmail } = require("./user.model");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
module.exports = {
    createUser : (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt)
        create(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json(
                    {
                        success : 0,
                        message : "Database connection error"
                    }
                );
            }
    
            return res.status(200).json(
                {
                    success : 1,
                    data : results,
                    message : "account created successfully"
                }
            );
        })
    },

    getUserById : (req, res) =>{
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if (err){
                console.log(err)
            }
            if(!results){
                return res.json({
                    status : 0,
                    message : "User not found"
                });
            }
            return res.json({
                status  : 1,
                data : results
            })
        });
    },

    getUsers : (req, res) =>{
        getUsers((err, results) => {
            if (err){
                console.log(err)
            }
            return res.json({
                status  : 1,
                data : results
            })
        });
    },
    
    updateUser : (req, res) =>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err){
                console.log(err)
            }
            
            return res.json({
                status  : 1,
                message : "user details updated successfully"
            })
        });
    },

    deleteUser : (req, res) =>{
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err){
                console.log(err)
            }
            if(!results){
                return res.json({
                    status : 0,
                    message : "User not found"
                });
            }
            return res.json({
                status  : 1,
                message : "User deleted successfully"
            })
        });
    },

    login : (req, res) =>{
        const body= req.body;
        getUserByEmail(body.email, (err, results) => {
            if (err){
                console.log(err)
            }
            if(!results){
                return res.json({
                    status : 0,
                    message : "Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                const jsonwebtoken = sign({ result : results}, "qwe1234", {
                    expiresIn : "1h"
                });
                return res.json({
                    success : 1,
                    message : "login successfully",
                    token : jsonwebtoken
                });
            }
            else{
                return res.json({
                    status : 0,
                    message : "Invalid email or password"
                });
            }
        });
    },
}