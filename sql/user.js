/*
 * @Descripttion: 
 * @version: 
 * @Author: 向北
 * @Date: 2021-01-07 16:17:57
 * @LastEditors: 向北
 * @LastEditTime: 2021-01-07 17:40:55
 */

const db = require('./db.js')

const adminSchema = new db.mongoose.Schema({
    "username": { type: String },
    "password": { type: String }

})
module.exports = db.mongoose.model("users", adminSchema)