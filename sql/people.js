/*
 * @Descripttion:
 * @version:
 * @Author: 向北
 * @Date: 2021-01-09 09:40:28
 * @LastEditors: 向北
 * @LastEditTime: 2021-01-09 10:52:02
 */

const db = require('./db.js')

const peopleSchema = new db.mongoose.Schema({
  "peoplename": { type: String },
  "sex": { type: String },
  "money": { type: String },
  "year": { type: String },
  "shenfen": { type: String },

})
module.exports = db.mongoose.model("people", peopleSchema)
