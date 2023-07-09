const pool = require("../../config/database");

module.exports = {
    create : (data, callBack) => {
        pool.query(
            "insert into user_tb (firstname, lastname, email, password) values (?,?,?,?)",
            [
                data.first_name,
                data.last_name,
                data.email,
                data.password
            ],
            (error, results, fields) => {
                if (error){
                   return callBack(error);
                }
                return callBack(null, results)
            }
        );
    },

    getUsers : callBack => {
        pool.query(
            "select user_id, firstname, lastname, email, password from user_tb",
            [],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getUserById :(id, callBack) => {
        pool.query(
            "select user_id, firstname, lastname, email, password from user_tb where user_id = ?",
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },

    updateUser : (data, callBack) => {
        pool.query(
            "update user_tb set firstname = ?, lastname = ?, email = ?, password = ? where user_id = ?",
            [
                data.first_name,
                data.last_name,
                data.email,
                data.password,
                data.id
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },

    deleteUser : (data, callBack) => {
        pool.query(
            "delete from user_tb where user_id = ?",
            [data.id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },

    getUserByEmail : (email, callBack) => {
        pool.query(
            "select * from user_tb where email = ?",
            [email],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },

};