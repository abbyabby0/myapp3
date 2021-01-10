/*
 * @Descripttion:
 * @version:
 * @Author: 向北
 * @Date: 2021-01-09 10:01:33
 * @LastEditors: 向北
 * @LastEditTime: 2021-01-09 12:12:01
 */
var express = require('express');
var router = express.Router();
const people = require('../sql/people')
/* GET home page. */
router.get('/', function (req, res, next) {
  people.find({}, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)

    res.render('people', {
      index: 3,
      data: data
    });
  })
  router.get("/add", function (req, res, next) {
    res.render("peopleAdd", {
      index: 3,
    });
  });

  router.post("/addAction", function (req, res, next) {

    console.log('进入/addAction里面了')
    let obj = req.body;
    //调用方法转数字
    obj.money = Number(obj.money);
    // //隐形转换
    // obj.discount = obj.discount - 0;
    // //隐形转换
    // obj.score = obj.score * 1;
    console.log(obj);
    people.insertMany(obj, (err, data) => {
      if (err) {
        console.log(err)
      }
      console.log(data)
      res.redirect("/people");
    })

  });

  //删除操作
  router.get("/delete", function (req, res, next) {
    //get来的数据在req.query.id
    // const id = req.query.id;
    console.log('我现在进入/delete里面了')
    console.log(req.query)

    people.deleteOne({ '_id': req.query._id }, (err, data) => {
      if (err) {
        console.log(err)
      }
      console.log(data)
      res.redirect("/people");
    })

    // production.findOneAndRemove({'_id' : req.query._id},(err,data)=>{
    //    if(err) {
    //      console.log(err)
    //    }
    //    console.log(data)
    //    res.redirect("/pro");
    // })


    //   production.findOneAndDelete({'_id' : req.query._id},(err,data)=>{
    //     if(err) {
    //       console.log(err)
    //     }
    //     console.log(data)
    //     res.redirect("/pro");
    //  })

  });

  //修改操作
  router.get("/update", function (req, res, next) {
    //get来的数据在req.query.id    拿到宇宙唯一id
    console.log(req.query)

    const _id = req.query._id;
    console.log("_id", _id);

    people.findById({ "_id": _id }, (err, data) => {
      if (err) {
        console.log(err)
      }
      console.log('我现在到了/update修改数据路由')
      console.log(data)
      console.log(data._id)
      res.render('peopleUpdate', {
        index: 2,
        data: data
      })
    })


  });

  // 修改操作 - 更新数据
  router.post("/updateAction", function (req, res, next) {
    console.log('我在/updateAction里面')
    // 接收当前商品的数据
    const obj = req.body;

    // 处理数据类型，符合数据集合的字段类型
    obj.money = Number(obj.money);
    // obj.stock = parseFloat(obj.stock);
    // obj.discount = obj.discount - 0;
    // obj.sales = obj.sales - 0;
    // obj.score = obj.score * 1;
    // console.log('obj_id', obj)
    people.findByIdAndUpdate(obj._id, obj, (err, data) => {
      if (err) {
        console.log(err)
      }
      console.log(data)
      res.redirect("/people");

    })
  });

  //sort 排序
  router.get("/sort1", (req, res, next) => {
    const obj = req.query;
    people.find({}).sort({ money: 1 }).exec((err, data) => {
      if (err) {
        console.log(err)
      }
      console.log(data)
      res.render("people", {
        index: 3,
        data,
      })
    })

  });

  router.get("/sort2", (req, res, next) => {
    const obj = req.query;
    people.find({}).sort({ money: -1 }).exec((err, data) => {
      if (err) {
        console.log(err)
      }
      console.log(data)
      res.render("people", {
        index: 3,
        data,
      })
    })
    // sql.sort(production, {}, {}, obj).then((data) => {
    //   res.render("pro", {
    //     index: 1,
    //     data,
    //   });
    // });
  });

  //员工搜索
  router.get("/search", (req, res, next) => {
    console.log("员工搜索路由 搜索数据")
    const obj = req.query;

    let reg = new RegExp(obj.search);
    people.find({ peoplename: reg }, (err, data) => {
      if (err) {
        console.log(err)
      }
      console.log(data)
      res.render("people", {
        index: 3,
        data,
      });
    })
  });
});

module.exports = router;
