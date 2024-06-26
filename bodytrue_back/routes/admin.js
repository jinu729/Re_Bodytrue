const express = require('express');
const router = express.Router();
const db = require('../db.js');
const sql = require('../sql.js');
const fs = require('fs');
const multer = require('multer');
const path = require("path");

//승호작성

//회원리스트 불러오기

router.post("/패스명",async(req,res)=>{
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
          }
    });
});

//이름 검색하기

router.get("/2",async(req,res)=>{

    // const name = req.body.name;
    const name = "민승호";

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

router.post("/패스명",async(req,res)=>{

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

router.post("/패스명",async(req,res)=>{


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


//승인권한 변경

router.post("/패스명",async(req,res)=>{

    const admit_tr_no = req.body;

    db.query("update user set tr_admit = 1 where tr_no = ?",
        admit_tr_no,
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

//트레이너 삭제

router.post("/패스명",async(req,res)=>{

    const del_tr_no = req.body;

    db.query("delete from trainer where tr_no = ?",
        del_tr_no,
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

//리뷰리스트 불러오기

router.post("/패스명",async(req,res)=>{

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

router.post("/패스명",async(req,res)=>{

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

router.post("/패스명",async(req,res)=>{

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

router.post("/패스명",async(req,res)=>{
    
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

router.post("/패스명",async(req,res)=>{
    
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

router.post("/패스명",async(req,res)=>{

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

router.post("/패스명",async(req,res)=>{

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

router.post("/패스명",async(req,res)=>{

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