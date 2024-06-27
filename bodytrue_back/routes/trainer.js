const express = require('express');
const router = express.Router();
const db = require('../db.js');
const sql = require('../sql.js');

const fs = require('fs');
const multer = require('multer');
const path = require("path");



//승호작성

//프로그램 사진업로드/패스저장



//프로그램 정보 저장

router.post("/패스명(bodytrue_join.html)", async (req, res) => {

    const data = {
      //프론트에서 전달해주는 데이터
      pro_name : req.body.prcn_text,
      pro_tel : req.body.phn_text,
      pro_add : req.body.adddress_text,
      pro_startdate : req.body.start_date,
      pro_enddate : req.body.end_date,
      pro_comment1 : req.body.img_textarea1,
      pro_comment2 : req.body.img_textarea2,
      pro_tag : req.body.tag 
    };
  
    db.query("INSERT INTO PROGRAM (PRO_NAME, PRO_TEL,PRO_ADD1,PRO_STARTDATE,PRO_ENDDATE,PRO_COMMENT1,PRO_COMMENT2,PRO_TAG)values ?,?,?,?,?,?,?,?",
        [data.pro_name, data.pro_tel, data.pro_add, data.pro_startdate, data.pro_enddate, data.pro_comment1, data.pro_comment2, data.pro_tag], 
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
                message: "프로그램등록 성공",
                });
            }
    });
});

//내프로그램 리스트

router.post("/패스명", async(req,res)=>{

    const tr_no = req.params.tr_no

    db.query("SELECT PRO_NAME,PRO_TAG,PRO_STARTDATE,PRO_ENDDATE FROM PROGRAM WHERE PRO_TR_NO = ?;",tr_no,(err,results)=>{
        if (err) {
            res.send({
            // 에러 발생 시
            code: 400,
            failed: "error occurred",
            error: err,
            });
        } else {
            res.send
        }
    })
})

//내 리뷰 리스트

router.post("/패스명", async(req,res)=>{

    const tr_no = req.params.tr_no

    db.query("SELECT USER_NAME,PRO_NAME,RE_DATE,RE_COMMENT,RE_RATE FROM REVIEW R JOIN USER U ON R.RE_USER_NO = U.USER_NO JOIN PROGRAM P ON R.RE_PRO_NO = P.PRO_NO JOIN TRAINER T ON R.RE_TR_NO = T.TR_NO WHERE TR_NO = ?",tr_no,(err,results)=>{
        if (err) {
            res.send({
            // 에러 발생 시
            code: 400,
            failed: "error occurred",
            error: err,
            });
        } else {
            res.send
        }
    })
})

    db.query("이미지 가져오는거 만들어야 해양")

//리뷰 사진 업로드/패스저장

//트레이너 정보 가져오기

//정보
router.get("/1", async(req,res)=>{

    // const tr_no = req.params.tr_no
    const tr_no = 1
console.log(req.params);

    db.query(`SELECT TR_NAME,TR_EMAIL,TR_TEL,img_path FROM TRAINER t join img i on t.tr_no = i.img_tr_no WHERE TR_NO = ?`,tr_no,(err,results)=>{
        if (err) {
            res.send({
            // 에러 발생 시
            code: 400,
            failed: "error occurred",
            error: err,
            });
        } else {
            
            res.send(results)
            console.log(results);
        }
    });


})

//사진은 가져오는걸로





//트레이너 정보수정

router.post("/패스명", async(req,res)=>{

    const tel = req.body.number1 + '-' + req.body.number2 + '-' + req.body.number3;
    const data={
        tr_pwd : req.body.password1,
        tr_addno : req.body.postcode,
        tr_add1 : req.body.address,
        tr_add2 : reqq.body.address-detail,
        tr_tel : tel,
        tr_no : req.params.tr_no
    }

    db.query("UPDATE TRAINER SET TR_PWD = ?, TR_ADDNO=?,TR_ADD1=?,TR_ADD2=?,TR_TEL = ? WHERE TR_NO=?;",
        [data.tr_pwd,data.tr_addno,data.tr_add1,data.tr_add2,data.tr_tel,data.tr_no],
        (err,results)=>{
        if (err) {
            res.send({
            // 에러 발생 시
            code: 400,
            failed: "error occurred",
            error: err,
            });
        } else {
            res.send
        }
    })
})
//사진추가해야해양


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