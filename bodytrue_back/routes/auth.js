const express = require('express');
const router = express.Router();
const db = require('../db.js');
const sql = require('../sql.js');

//승호작성

//유저 회원가입
router.post("/패스명(bodytrue_join.html)", async (req, res) => {

    const email = req.body.email1 + '@' + req.body.email2;
    const tel = req.body.number1 + '-' + req.body.number2 + '-' + req.body.number3;
    const user = {
      //프론트에서 전달해주는 데이터
      USER_EMAIL: email,
      USER_PWD: req.body.password1,
      USER_NAME : req.body.username,
      USER_SEX: req.body.sex,
      USER_ADDNO: req.body.postcode,
      USER_ADD1: req.body.address,
      USER_ADD2: req.body.address_detail,
      USER_TEL : tel
    };
  
    db.query("insert into user (user_email,user_pwd,user_name,user_sex,user_addno,user_add1,user_add2,user_tel) values (?,?,?,?,?,?,?,?)",
        [user.USER_EMAIL, user.USER_PWD, user.USER_NAME, user.USER_SEX, user.USER_ADDNO, user.USER_ADD1, user.USER_ADD2, user.USER_TEL], 
        (err, results, fields) => {
            //쿼리 실행
            if (err) {
                res.send({
                // 에러 발생 시
                code: 400,
                failed: "error occurred",
                error: err,
                });
            } else {
                res.send({
                //쿼리 실행 성공시
                code: 200,
                message: "회원가입 성공",
                });
            }
    });
});

//트레이너 회원가입
router.post("/패스명(bodytrue_join.html)", async (req, res) => {

  const email = req.body.email1 + '@' + req.body.email2;
  const tel = req.body.number1 + '-' + req.body.number2 + '-' + req.body.number3;
  const tr = {
    //프론트에서 전달해주는 데이터
    tr_email: email,
    tr_pwd: req.body.password1,
    tr_name : req.body.username,
    tr_sex: req.body.sex,
    tr_addno: req.body.postcode,
    tr_add1: req.body.address,
    tr_add2: req.body.address_detail,
    tr_tel : tel
  };

  db.query("insert into trainer (tr_email,tr_pwd,tr_name,tr_sex,tr_addno,tr_add1,tr_add2,tr_tel) values (?,?,?,?,?,?,?,?)",
      [tr.tr_email, user.tr_pwd, user.tr_name, user.tr_sex, user.tr_addno, user.tr_add1, user.tr_add2, user.tr_tel], 
      (err, results, fields) => {
          //쿼리 실행
          if (err) {
              res.send({
              // 에러 발생 시
              code: 400,
              failed: "error occurred",
              error: err,
              });
          } else {
              res.send({
              //쿼리 실행 성공시
              code: 200,
              message: "회원가입 성공",
              });
          }
  });
});

//아이디 유효성 검사

router.post("/패스명(bodytrue_join.html)", async (req, res) => {

    const email = req.body.email; //확인하려는 이메일
  
    db.query("select * from user where USER_EMAIL= ? ",email,(err, results) => {
        //user테이블에 보내준 이메일을 select했을때 데이터가 있다면
        if (err) {
          res.send({
            // 에러 발생 시
            code: 400,
            failed: "error occurred",
            error: err,
          });
        } else {
          if (results.length > 0) {
            //결과값이 있으면 //쿼리 실행결과는 배열로 나와서 length를 이용하여 데이터를 파악함
            res.send({
              code: 200,
              message: "존재하는 이메일입니다.",
            });
          } else {
            //결과값이 없으면
            res.send({
              code: 200,
              message: "사용가능한 이메일입니다.",
            });
          }
        }
      }
    );
});

//임시비밀번호 저장

router.post("/패스명(bodytrue_findPw.html)",async(req,res)=>{

    const data = {
        tmp_pwd : Math.random().toString(36).slice(2),
        user_name : req.body.username,
        user_tel : req.body.number1 + '-' + req.body.number2 + '-' + req.body.number3
      };

    db.query('update user set user_pwd = ? where user_name = ? and user_tel = ?',
        [data.tmp_pwd,data.user_name,data.user_tel],
        function(err,results,fields){
        if (err) {
                res.send({
                // 에러 발생 시
                code: 400,
                failed: "error occurred",
                error: err,
                });
            } else {
                res.send({
                //쿼리 실행 성공시
                code: 200,
                message: "임시비밀번호 부여 성공",
                });
            }
    });
});

//아이디찾기

router.post("/패스명(bodytrue_findId.html)",async(req,res)=>{

    const data = {
        user_name : req.body.username,
        user_email : req.body.number1 + '-' + req.body.number2 + '-' + req.body.number3
      };

    db.query('select user_email from user where user_name = ? and user_tel = ?',
        [data.user_name,data.user_tel],
        function(err,results,fields){
        if (err) {
            res.send({
            // 에러 발생 시
            code: 400,
            failed: "error occurred",
            error: err,
            });
        } else {
            res.send({
            //쿼리 실행 성공시
            code: 200,
            message: "아이디(이메일)찾기 성공",
            });
        }
    });
});

//소셜 로그인


//카카오가입
router.post("/패스명",async(req,res)=>{

    const user ={
        user_email : req.body.email, 
        user_name : req.body.name,
        user_social : 1
    };

    db.query("insert into user (user_email,user_name,user_social) values (?,?,?)",
        [user.user_email,user.user_name,user.user_social],
        (err)=>{
            if (err) {
                res.send({
                  // 에러 발생 시
                  code: 400,
                  failed: "error occurred",
                  error: err,
                });
              } else {
                res.send({
                  //쿼리 실행 성공시
                  code: 200,
                  message: "회원가입 성공",
                });
              }
        })
});

//카카오로그인후
router.post("/패스명", async (req, res) => {

    const email = req.body.email;
  
    db.query(
      "select * from user where USER_EMAIL = ?",
      email,
      async (err, results) => {
        if (err) {
          res.send({
            // 에러 발생 시
            code: 400,
            failed: "error occurred",
            error: err,
          });
        } else {
          res.send({
            email: results[0].USER_EMAIL,
            name: results[0].USER_NAME,
          });
        }
      }
    );
  });

//네이버가입
router.post("/패스명",async(req,res)=>{

    const user ={
        user_email : req.body.email, 
        user_name : req.body.name,
        user_social : 2
    };

    db.query("insert into user (user_email,user_name,user_social) values (?,?,?)",
        [user.user_email,user.user_name,user.user_social],
        (err)=>{
            if (err) {
                res.send({
                  // 에러 발생 시
                  code: 400,
                  failed: "error occurred",
                  error: err,
                });
              } else {
                res.send({
                  //쿼리 실행 성공시
                  code: 200,
                  message: "회원가입 성공",
                });
              }
        })
});

//네이버로그인후
router.post("/패스명", async (req, res) => {

    const email = req.body.email;
  
    db.query(
      "select * from user where USER_EMAIL = ?",
      email,
      async (err, results) => {
        if (err) {
          res.send({
            // 에러 발생 시
            code: 400,
            failed: "error occurred",
            error: err,
          });
        } else {
          res.send({
            email: results[0].USER_EMAIL,
            name: results[0].USER_NAME,
          });
        }
      }
    );
  });


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