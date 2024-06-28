const express = require('express');
const router = express.Router();
const db = require('../db.js');
const sql = require('../sql.js');
const fs = require('fs');
const multer = require('multer');
const path = require("path");

//승호작성

//회원리스트 불러오기

router.get("/userlist",async(req,res)=>{
    db.query("select user_email,user_pwd,user_name,user_tel,user_sex,user_add1,user_add2 from user",(err,results)=>{
        if (err) {
            res.send({
              // 에러 발생 시
              code: 400,
              failed: "error occurred",
              error: err,
            });
          } else {
            res.send(results);
            console.log(results);
          }
    });
});

//이름 검색하기

router.get("/searchname",async(req,res)=>{

    // const name = req.body.name;
    const name = req.query.name;

    db.query("select user_email,user_pwd,user_name,user_tel,user_sex,user_add1,user_add2 from user where user_name = ?",
        name,
        (err,results)=>{
        if (err) {
            res.send({
              // 에러 발생 시
              code: 400,
              failed: "error occurred",
              error: err,
            });
          } else {
            res.send(results);
            console.log(results);
          }
    });
});

//회원 정지하기

router.post("/userban",async(req,res)=>{

    const ban_user_no = req.body;

    db.query("update user set user_ban = 1 where user_no = ?",
        ban_user_no,
        (err,results)=>{
        if (err) {
            res.send({
              // 에러 발생 시
              code: 400,
              failed: "error occurred",
              error: err,
            });
          } else {
            res.send(results);
          }
    });
    
});

//트레이너리스트 불러오기

router.get("/trainerlist",async(req,res)=>{
    db.query("select tr_email,tr_pwd,tr_name,tr_tel,tr_sex,tr_add1,tr_add2 from trainer",(err,results)=>{
        if (err) {
            res.send({
              // 에러 발생 시
              code: 400,
              failed: "error occurred",
              error: err,
            });
          } else {
            res.send(results);
          }
    });
});

//트레이너이름 검색하기

router.get("/search_tr_name",async(req,res)=>{

  // const name = req.body.name;
  const name = req.query.name;

  db.query("select tr_email,tr_pwd,tr_name,tr_tel,tr_sex,tr_add1,tr_add2 from trainer where tr_name = ?",
      name,
      (err,results)=>{
      if (err) {
          res.send({
            // 에러 발생 시
            code: 400,
            failed: "error occurred",
            error: err,
          });
        } else {
          res.send(results);
        // console.log(results);
        }
  });
});


//승인권한 변경

router.post("/updatetr", async (req, res) => {
  const { trainer_no } = req.body;

  console.log(`Updating trainer no: ${trainer_no}`);  // 로그 추가
  console.log(req.body);

  db.query("UPDATE trainer SET tr_admit = 1 WHERE tr_no = ?", [trainer_no], (err, results) => {
      if (err) {
          console.error('Error occurred:', err);  // 에러 로그 추가
          res.status(400).send({
              code: 400,
              failed: "error occurred",
              error: err,
          });
      } else {
          console.log('Trainer updated successfully:', results);  // 성공 로그 추가
          res.status(200).send({
              code: 200,
              success: "Trainer updated successfully",
              data: results,
          });
      }
  });
});

//트레이너 삭제

router.post("/trban", async (req, res) => {
    const { trainer_no } = req.body;

    console.log(`Deleting trainer no: ${trainer_no}`);  // 로그 추가

    db.query("DELETE FROM trainer WHERE tr_no = ?", [trainer_no], (err, results) => {
        if (err) {
            console.error('Error occurred:', err);  // 에러 로그 추가
            res.status(400).send({
                code: 400,
                failed: "error occurred",
                error: err,
            });
        } else {
            console.log('Trainer deleted successfully:', results);  // 성공 로그 추가
            res.status(200).send({
                code: 200,
                success: "Trainer deleted successfully",
                data: results,
            });
        }
    });
});

//리뷰리스트 불러오기

router.get("/reviewlist",async(req,res)=>{

    db.query("select tr_email,tr_pwd,tr_name,tr_tel,tr_sex,tr_add1,tr_add2 from trainer",(err,results)=>{
        if (err) {
            res.send({
              // 에러 발생 시
              code: 400,
              failed: "error occurred",
              error: err,
            });
          } else {
            res.send(results);
          }
    });
});

//리뷰 상세내용 불러오기

//삭제하기

//질문 등록하기

router.post("/insertQ",async(req,res)=>{

    const Q = req.body.Q

    db.query("insert into faq faq_q values ?",
        Q,
        (err,results)=>{
        if (err) {
            res.send({
              // 에러 발생 시
              code: 400,
              failed: "error occurred",
              error: err,
            });
          } else {
            res.send(results);
          }
    });
    
});

//답글 등록하기     얘 좀 이상함 동네사람들 이것좀보세요

router.post("/insertA",async(req,res)=>{

    const data={
        A : req.body.A,
        faq_no : req.body
    }

    db.query("update faq set faq_a = ? where faq_no = ?",
        [data.A , data.faq_no],
        (err,results)=>{
        if (err) {
            res.send({
            // 에러 발생 시
            code: 400,
            failed: "error occurred",
            error: err,
            });
        } else {
            res.send(results);
        }
    });
})


//질문 불러오기

router.get("/loadQ",async(req,res)=>{
    
    db.query("select faq_q from faq",(err,results)=>{
        if (err) {
            res.send({
              // 에러 발생 시
              code: 400,
              failed: "error occurred",
              error: err,
            });
          } else {
            res.send(results);
          }
    });
});


//답글 불러오기

router.get("/loadA",async(req,res)=>{
    
    db.query("select faq_a from faq",(err,results)=>{
        if (err) {
            res.send({
              // 에러 발생 시
              code: 400,
              failed: "error occurred",
              error: err,
            });
          } else {
            res.send(results);
          }
    });
});

//질문 수정하기

router.post("/updateQ",async(req,res)=>{

    const data={
        Q : req.body.Q,
        faq_no : req.body
    }

    db.query("update faq set faq_q = ? where faq_no = ?",
        [data.Q , data.faq_no],
        (err,results)=>{
        if (err) {
            res.send({
            // 에러 발생 시
            code: 400,
            failed: "error occurred",
            error: err,
            });
        } else {
            res.send(results);
        }
    });
})

//답글 수정하기

router.post("/updateA",async(req,res)=>{

    const data={
        A : req.body.A,
        faq_no : req.body
    }

    db.query("update faq set faq_a = ? where faq_no = ?",
        [data.A , data.faq_no],
        (err,results)=>{
        if (err) {
            res.send({
            // 에러 발생 시
            code: 400,
            failed: "error occurred",
            error: err,
            });
        } else {
            res.send(results);
        }
    });
})

//FAQ 삭제하기

router.post("/delFAQ",async(req,res)=>{

    const faq_no = req.body

    db.query("delete from faq where faq_no = ?",
        faq_no,
        (err,results)=>{
        if (err) {
            res.send({
            // 에러 발생 시
            code: 400,
            failed: "error occurred",
            error: err,
            });
        } else {
            res.send(results);
        }
    });
})

//승호작성완


//진우작성


//진우작성완


//은미작성


//은미작성완


//재영작성


//재영작성완


//회창작성


//회창작성완



module.exports = router;