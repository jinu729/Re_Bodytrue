const express = require('express');
const router = express.Router();
const db = require('../db.js');
const sql = require('../sql.js');

const fs = require('fs');
const multer = require('multer');
const path = require("path");



//승호작성

//프로그램 사진저장/프로그램 정보 저장

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            cb(null, file.originalname);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});


router.post('/upload_img', upload.single('img'), (request, response) => {
    setTimeout(() => {
        return response.status(200).json({
            message: 'success'
        })
    }, 2000);
})

// router.post('/createprogram/:tr_no', function (req, res) {

//     const data = {
//       //프론트에서 전달해주는 데이터
//       tr_no : req.params.tr_no,
//       pro_name : req.body.prcn_text,
//     //   pro_tel : req.body.phn_text,
//     //   pro_add : req.body.adddress_text,S
//       pro_startdate : req.body.start_date,
//       pro_enddate : req.body.end_date,
//       pro_comment1 : req.body.img_textarea1,
//       pro_comment2 : req.body.img_textarea2,
//       pro_tag : req.body.tags,

//       pro_img : req.body.pro_img,
//       pro_img1 : req.body.pro_img1,
//       pro_img2 : req.body.pro_img2,
//       pro_imgprice : req.body.pro_imgprice
//     };
//     console.log(data);

//     const test = `${__dirname}`;
//     console.log('Dirname-------------------');
//     console.log(test);
//     console.log('-------------------');

//         try {
//                 // 이미지를 제외한 프로그램 정보 먼저 입력
//                 db.query(`INSERT INTO PROGRAM (pro_tr_no,PRO_NAME,PRO_STARTDATE,PRO_ENDDATE,PRO_COMMENT1,PRO_COMMENT2,PRO_TAG)
//                     values (?,?,?,?,?,?,?);`, 
//                     [data.tr_no,data.pro_name, data.pro_startdate, data.pro_enddate, data.pro_comment1, data.pro_comment2, data.pro_tag],
//                      function (error, results, fields) {
//                     if (error) {
//                         return res.status(200).json({
//                             message: 'fail'
//                         })
//                     }
//                     try {
//                         const pastDir0 = `${__dirname}` + `../uploads/` + data.pro_img
//                         const pastDir1 = `${__dirname}` + `../uploads/` + data.pro_img1
//                         const pastDir2 = `${__dirname}` + `../uploads/` + data.pro_img2
//                         const pastDir3 = `${__dirname}` + `../uploads/` + data.pro_imgprice
                        
//                         console.log('pastDir-------------------');
//                         console.log(pastDir0);
//                         console.log('-------------------');

//                         const newDir = `${__dirname}` + `../../uploads/program/`;
//                         if (!fs.existsSync(newDir)) fs.mkdirSync(newDir);

//                         const extension = data.pro_img.substring(data.pro_img.lastIndexOf('.'))

//                         console.log('Extenstion-------------------');
//                         console.log(extension);
//                         console.log('-------------------');

//                         // 등록 상품의 번호 불러오기
//                         db.query("select pro_no from program where pro_name = ?", 
//                             [data.pro_name], 
//                             function (error, results, fields) {

//                             const filename = results[0].pro_no

//                             console.log('filename-------------------');
//                             console.log(filename);
//                             console.log('-------------------');

//                             // 이미지 폴더 및 이름(상품번호-타입) 변경
//                             // 타입 0: 메인 이미지 1: 상세 이미지1 2: 상세 이미지2 3: 가격이미지
//                             fs.rename(pastDir0, newDir + filename + '-0' + extension, (err) => {
//                                 if (err) {
//                                     throw err;
//                                 }
//                             });
//                             fs.rename(pastDir1, newDir + filename + '-1' + extension, (err) => {
//                                 if (err) {
//                                     throw err;
//                                 }
//                             });
//                             fs.rename(pastDir2, newDir + filename + '-2' + extension, (err) => {
//                                 if (err) {
//                                     throw err;
//                                 }
//                             });
//                             fs.rename(pastDir3, newDir + filename + '-3' + extension, (err) => {
//                                 if (err) {
//                                     throw err;
//                                 }
//                             });

//                             // 파일 변경 모두 성공했으면 바뀐 이름으로 DB에 입력 
//                             db.query(`insert into img (img_type,img_path,img_pro_no) values (?,?,?)`,
//                                  [0,filename + '-0' + extension,filename], 
//                                  function (error, results, fields) {
//                                 if (error) {
//                                     throw error;
//                                 }db.query(`insert into img (img_type,img_path,img_pro_no) values (?,?,?)`,
//                                          [1,filename + '-1' + extension,filename], 
//                                          function (error, results, fields) {
//                                         if (error) {
//                                             throw error;
//                                         }db.query(`insert into img (img_type,img_path,img_pro_no) values (?,?,?)`,
//                                                  [2,filename + '-2' + extension,filename], 
//                                                  function (error, results, fields) {
//                                                 if (error) {
//                                                     throw error;
//                                                 }db.query(`insert into img (img_type,img_path,img_pro_no) values (?,?,?)`,
//                                                          [3,filename + '-3' + extension,filename], 
//                                                          function (error, results, fields) {
//                                                         if (error) {
//                                                             throw error;
//                                                         }
                                        
//                                     })
                                
//                             })

//                         })

//                     })
//                 })
//             }catch(err){
//                 console.log(err);
//             }
                    
//                 })

//     } catch {
//         return response.status(200).json({
//             message: 'DB_error'
//         })
//     }
// })
     

router.post('/createprogram/:tr_no', function (req, res) {

    const data = {
      //프론트에서 전달해주는 데이터
      tr_no : req.params.tr_no,
      pro_name : req.body.prcn_text,
    //   pro_tel : req.body.phn_text,
    //   pro_add : req.body.adddress_text,S
      pro_startdate : req.body.start_date,
      pro_enddate : req.body.end_date,
      pro_comment1 : req.body.img_textarea1,
      pro_comment2 : req.body.img_textarea2,
      pro_tag : req.body.tags,

      pro_img : req.body.pro_img,
      pro_img1 : req.body.pro_img1,
      pro_img2 : req.body.pro_img2,
      pro_imgprice : req.body.pro_imgprice
    };
    console.log(data);

    const test = `${__dirname}`;
    console.log('Dirname-------------------');
    console.log(test);
    console.log('-------------------');

        try {
                // 이미지를 제외한 프로그램 정보 먼저 입력
                db.query(`INSERT INTO PROGRAM (pro_tr_no,PRO_NAME,PRO_STARTDATE,PRO_ENDDATE,PRO_COMMENT1,PRO_COMMENT2,PRO_TAG)
                    values (?,?,?,?,?,?,?);`, 
                    [data.tr_no,data.pro_name, data.pro_startdate, data.pro_enddate, data.pro_comment1, data.pro_comment2, data.pro_tag],
                     function (error, results, fields) {
                    if (error) {
                        return res.status(200).json({
                            message: 'fail'
                        })
                    }
                    try {
                        const pastDir0 = `${__dirname}` + `../../uploads/` + data.pro_img
                        const pastDir1 = `${__dirname}` + `../../uploads/` + data.pro_img1
                        const pastDir2 = `${__dirname}` + `../../uploads/` + data.pro_img2
                        const pastDir3 = `${__dirname}` + `../../uploads/` + data.pro_imgprice
                        
                        console.log('pastDir-------------------');
                        console.log(pastDir0);
                        console.log(pastDir1);
                        console.log(pastDir2);
                        console.log(pastDir3);
                        console.log('-------------------');

                        const newDir = `${__dirname}` + `../../uploads/program/`;
                        if (!fs.existsSync(newDir)) fs.mkdirSync(newDir);

                        const extension = data.pro_img.substring(data.pro_img.lastIndexOf('.'))
                        const extension1 = data.pro_img1.substring(data.pro_img1.lastIndexOf('.'))
                        const extension2 = data.pro_img2.substring(data.pro_img2.lastIndexOf('.'))
                        const extension3 = data.pro_imgprice.substring(data.pro_imgprice.lastIndexOf('.'))

                        console.log('Extenstion-------------------');
                        console.log(extension);
                        console.log(extension1);
                        console.log(extension2);
                        console.log(extension3);
                        console.log('-------------------');

                        // 등록 상품의 번호 불러오기
                        db.query("select pro_no from program where pro_name = ?", 
                            [data.pro_name], 
                            function (error, results, fields) {

                            const filename = results[0].pro_no

                            console.log('filename-------------------');
                            console.log(filename);
                            console.log('-------------------');

                            // 이미지 폴더 및 이름(상품번호-타입) 변경
                            // 타입 0: 메인 이미지 1: 상세 이미지1 2: 상세 이미지2 3: 가격이미지
                            fs.rename(pastDir0, newDir + filename + '-0' + extension, (err) => {
                                if (err) {
                                    throw err;
                                }
                            });
                            fs.rename(pastDir1, newDir + filename + '-1' + extension1, (err) => {
                                if (err) {
                                    throw err;
                                }
                            });
                            fs.rename(pastDir2, newDir + filename + '-2' + extension2, (err) => {
                                if (err) {
                                    throw err;
                                }
                            });
                            fs.rename(pastDir3, newDir + filename + '-3' + extension3, (err) => {
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
                                         [1,filename + '-1' + extension1,filename], 
                                         function (error, results, fields) {
                                        if (error) {
                                            throw error;
                                        }db.query(`insert into img (img_type,img_path,img_pro_no) values (?,?,?)`,
                                                 [2,filename + '-2' + extension2,filename], 
                                                 function (error, results, fields) {
                                                if (error) {
                                                    throw error;
                                                }db.query(`insert into img (img_type,img_path,img_pro_no) values (?,?,?)`,
                                                         [3,filename + '-3' + extension3,filename], 
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

router.post("/trprolist", async(req,res)=>{

    const tr_no = req.body.tr_no

    db.query(`select pro_no, pro_name, pro_tag, date_format(pro_startdate,'%y년%m월%d일') as pro_startdate, date_format(pro_enddate,'%y년%m월%d일')as pro_enddate
        from program
        where pro_tr_no = ?
        `,[tr_no],(err,results)=>{
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

//내 예약 리스트
router.post('/trcallist', function(request, response, next){
    const tr_no = request.body.tr_no;

    db.query(`select pro_no, pro_name, user_name, date_format(cal_startdate,'%y년%m월%d일 %H시') as cal_startdate
            from calendar c 
            join program p on c.cal_pro_no = p.pro_no 
            join user u on c.cal_user_no = u.user_no 
            join trainer t on c.cal_tr_no = t.tr_no 
            where tr_no = ?`, [tr_no], function(error, result){
                if(error){
                    console.error(error);
                    return response.status(500).json({ error: '트레이너 예약리스트 에러'});
                }
                response.json(result);
                console.log(result);
        });
});

//내 리뷰 리스트
router.post("/trrelist", async (req, res) => {
    const tr_no = req.body.tr_no;
  
    const query = `
      select u.user_name, p.pro_name, date_format(re_date,'%y년%m월%d일') as re_date, r.re_comment, r.re_rate, r.re_no, i.img_path 
      from review r 
      join user u on r.re_user_no = u.user_no 
      join program p on r.re_pro_no = p.pro_no 
      join trainer t on r.re_tr_no = t.tr_no 
      left join img i on r.re_no = i.img_re_no 
      where t.tr_no = ?;`;
    db.query(query, [tr_no], (err, results) => {
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
  

// router.post("/trrelist", async(req,res)=>{

//     const tr_no = req.body.tr_no;

//     db.query(`select user_name, pro_name, re_date, re_comment, re_rate 
//             from review r 
//             join user u on r.re_user_no = u.user_no 
//             join program p on r.re_pro_no = p.pro_no 
//             join trainer t on r.re_tr_no = t.tr_no 
//             where tr_no = ?;
//             `,[tr_no],(err,results)=>{
//         if (err) {
//             res.send({
//             // 에러 발생 시
//             code: 400,
//             failed: "error occurred",
//             error: err,
//             });
//         } else {
//             res.send(results);
//             console.log(results);
//         }
//     })
// });

    // db.query("이미지 가져오는거 만들어야 해양")

//리뷰 사진 업로드/패스저장

//트레이너 정보 가져오기

//정보
router.post("/trmypage/:tr_no", async(req,res)=>{

    const tr_no = req.params.tr_no;
    console.log("tr_no",tr_no);
    
    db.query(`
        select tr_name, tr_email, tr_tel, img_path
        from trainer t
        join img i on t.tr_no = i.img_tr_no
        where tr_no = ?`,[tr_no],(err,results)=>{
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