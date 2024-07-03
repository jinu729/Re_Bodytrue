const express = require('express');
const router = express.Router();
const db = require('../db.js');
const sql = require('../sql.js');

const fs = require('fs');
const multer = require('multer');
const path = require("path");



//승호작성

//프로그램 사진저장/프로그램 정보 저장

router.post('/createprogram', function (req, res) {

    const data = {
      //프론트에서 전달해주는 데이터
      pro_name : req.body.prcn_text,
      pro_tel : req.body.phn_text,
      pro_add : req.body.adddress_text,
      pro_startdate : req.body.start_date,
      pro_enddate : req.body.end_date,
      pro_comment1 : req.body.img_textarea1,
      pro_comment2 : req.body.img_textarea2,
      pro_tag : req.body.tags,

      pro_img : req.body.programImage[0],
      pro_img1 : req.body.programImage[1],
      pro_img2 : req.body.programImage[2],
      pro_imgprice : req.body.programImage[3],
    };
    console.log(goods);

        try {
                // 이미지를 제외한 굿즈 정보 먼저 입력
                db.query("INSERT INTO PROGRAM (PRO_NAME, PRO_TEL,PRO_ADD1,PRO_STARTDATE,PRO_ENDDATE,PRO_COMMENT1,PRO_COMMENT2,PRO_TAG)values (?,?,?,?,?,?,?,?)", 
                    [data.pro_name, data.pro_tel, data.pro_add, data.pro_startdate, data.pro_enddate, data.pro_comment1, data.pro_comment2, data.pro_tag],
                     function (error, results, fields) {
                    if (error) {
                        return response.status(200).json({
                            message: 'fail'
                        })
                    }
                    try {
                        const pastDir0 = `${__dirname}` + `../../uploads/` + data.pro_img
                        const pastDir1 = `${__dirname}` + `../../uploads/` + data.pro_img1
                        const pastDir2 = `${__dirname}` + `../../uploads/` + data.pro_img2
                        const pastDir3 = `${__dirname}` + `../../uploads/` + data.pro_imgprice

                        const newDir = `${__dirname}` + `../../uploads/uploadGoods/`;
                        if (!fs.existsSync(newDir)) fs.mkdirSync(newDir);

                        const extension = data.pro_img.substring(data.pro_img.lastIndexOf('.'))

                        // 등록 상품의 번호 불러오기
                        db.query("select pro_no from program where = ?", 
                            [data.pro_name], 
                            function (error, results, fields) {

                            const filename = results[0].pro_no

                            // 이미지 폴더 및 이름(상품번호-타입) 변경
                            // 타입 0: 메인 이미지 1: 상세 이미지1 2: 상세 이미지2 3: 가격이미지
                            fs.rename(pastDir0, newDir + filename + '-0' + extension, (err) => {
                                if (err) {
                                    throw err;
                                }
                            });
                            fs.rename(pastDir1, newDir + filename + '-1' + extension, (err) => {
                                if (err) {
                                    throw err;
                                }
                            });
                            fs.rename(pastDir2, newDir + filename + '-2' + extension, (err) => {
                                if (err) {
                                    throw err;
                                }
                            });
                            fs.rename(pastDir3, newDir + filename + '-3' + extension, (err) => {
                                if (err) {
                                    throw err;
                                }
                            });

                            // 파일 변경 모두 성공했으면 바뀐 이름으로 DB에 입력 
                            db.query(`insert into img (img_type,img_path,img_pro_no) values (?,?,?)`,
                                 [0,filename + '-0' + extension,filename], 
                                 function (error, results, fields) {
                                if (error) {
                                    throw error;
                                }db.query(`insert into img (img_type,img_path,img_pro_no) values (?,?,?)`,
                                         [1,filename + '-1' + extension,filename], 
                                         function (error, results, fields) {
                                        if (error) {
                                            throw error;
                                        }db.query(`insert into img (img_type,img_path,img_pro_no) values (?,?,?)`,
                                                 [2,filename + '-2' + extension,filename], 
                                                 function (error, results, fields) {
                                                if (error) {
                                                    throw error;
                                                }db.query(`insert into img (img_type,img_path,img_pro_no) values (?,?,?)`,
                                                         [3,filename + '-3' + extension,filename], 
                                                         function (error, results, fields) {
                                                        if (error) {
                                                            throw error;
                                                        }
                                        
                                    })
                                
                            })

                        })

                    })
                })
            }catch(err){
                console.log(err);
            }
                    
                })

    } catch {
        return response.status(200).json({
            message: 'DB_error'
        })
    }
})
        

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


});


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