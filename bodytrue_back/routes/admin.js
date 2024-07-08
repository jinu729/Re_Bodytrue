const express = require('express');
const router = express.Router();
const db = require('../db.js');
const sql = require('../sql.js');
const fs = require('fs');
const multer = require('multer');
const path = require("path");
const { error } = require('console');

//승호작성

//회원리스트 불러오기

router.get("/userlist",async(req,res)=>{
    db.query("select user_no,user_email,user_pwd,user_name,user_tel,user_sex,user_add1,user_add2 from user",(err,results)=>{
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
    const name = "req.query.name";

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

router.post('/deleteuser', (req, res, next) => {
  const { user_no} = req.body;

  // console.log('Received request to delete trainer:', tr_name, tr_email); // 로그 추가

  const sql = 'UPDATE USER SET USER_BAN = 1 WHERE USER_NO=?';

  db.query(sql, [user_no], function(err, results, fields) {
    if (err) {
      // console.error('Database error:', err); // 오류 로그 추가

      return res.status(500).json({ error: '회원 정지 에러' });
    }
    return res.status(200).json({ message: '회원 정지' });
  });
});

//트레이너리스트 불러오기

router.get("/trainerlist",async(req,res)=>{
    db.query("select tr_no,tr_email,tr_pwd,tr_name,tr_tel,tr_sex,tr_add1,tr_add2 from trainer",(err,results)=>{
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

router.post('/trupdate', (req, res, next) => {
  const { tr_no,tr_admit} = req.body;

  // console.log('Received request to delete trainer:', tr_name, tr_email); // 로그 추가

  const sql = 'UPDATE TRAINER SET TR_ADMIT = ? WHERE TR_NO=?';

  db.query(sql, [tr_admit,tr_no], function(err, results, fields) {
    if (err) {
      // console.error('Database error:', err); // 오류 로그 추가

      return res.status(500).json({ error: '승인 상태 업데이트 에러' });
    }
    return res.status(200).json({ message: '승인 상태 업데이트' });
  });
  
});

//트레이너 정지

router.post('/trban', (req, res, next) => {
  const { tr_no, tr_ban } = req.body;

  // console.log('Received request to delete trainer:', tr_name, tr_email); // 로그 추가



  const sql = 'UPDATE TRAINER SET tr_ban=? WHERE tr_no=?';

  db.query(sql, [tr_ban, tr_no], function(err, results, fields) {
    if (err) {
      // console.error('Database error:', err); // 오류 로그 추가

      return res.status(500).json({ error: '트레이너 정지 에러' });
    }
    return res.status(200).json({ message: '트레이너 정지' });
  });
});


//트레이너 삭제

// router.post('/trdelete', (req, res, next) => {
//   const { tr_no, tr_ban } = req.body;

//   // console.log('Received request to delete trainer:', tr_name, tr_email); // 로그 추가

//   const sql = 'DELETE FROM trainer WHERE tr_no = ?';

//   db.query(sql, [tr_ban, tr_no], function(err, results, fields) {
//     if (err) {
//       // console.error('Database error:', err); // 오류 로그 추가

//       return res.status(500).json({ error: '트레이너 정지 에러' });
//     }
//     return res.status(200).json({ message: '트레이너 정지' });
//   });
// });



module.exports = router;


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

router.get('/reviewdetail/:re_no', function(request, response, next){
    
  const re_no = request.params.re_no;

  // console.log(re_no);
 

  //쿼리문 여러개 실행해야해서 async/await 사용
  async function getreviewDetail(re_no){
      try{

          //리뷰 상세정보 가져오기
          const reviewDetails = await new Promise((resolve, reject) => {
              db.query(`select re_pro_no from review where re_no = ?`,
                 [re_no], 
                 (error, results) => {
                  if(error) {
                      return reject(error);
                  }else{
                    const pro_no = results[0].re_pro_no

                    db.query(`SELECT PRO_NAME,TR_NAME,USER_NAME,DATE_FORMAT(RE_DATE,"%y-%m-%d"),RE_COMMENT
                         FROM PROGRAM P JOIN TRAINER T ON P.PRO_TR_NO = T.TR_NO JOIN REVIEW R ON P.PRO_NO = R.RE_PRO_NO JOIN USER U ON R.RE_USER_NO = U.USER_NO
                         where pro_no = ?`,
                        [pro_no], 
                        (error, results) => {
                          if(error) {
                              return reject(error);
                          }
                          resolve(results);
                              }); 
                  }
              });
          }); 

          //프로그램 썸네일사진 가져오기
          const proImg = await new Promise((resolve, reject) => {
            db.query(`select re_pro_no from review where re_no = ?`,
              [re_no], 
              (error, results) => {
               if(error) {
                   return reject(error);
               }else{
                
                const pro_no = results[0].re_pro_no
                 console.log(results);

                        db.query(`SELECT IMG_PATH FROM IMG 
                                WHERE IMG_PRO_NO = ? AND IMG_TYPE = 0`,
                            [pro_no],
                            (error, results) => {
                    if(error){
                        return reject(error);
                    }
                    resolve(results);
                });
               }
           });
          });

          //리뷰 사진 가져오기
          const reviewImg = await new Promise((resolve, reject) => {
            db.query(`SELECT IMG_PATH FROM IMG
                      WHERE IMG_RE_NO = ?;`,
                        [re_no],
                        (error, results) => {
                if(error){
                    return reject(error);
                }
                resolve(results);
            });
        });

          //쿼리문 결과 합쳐서 응답보내기
          response.json({
            reviewDetails,
            proImg,
            reviewImg
          });

      } catch(error){
          console.error(error);
          response.status(500).json({ error: '서버에러'});
      }
  }
  getreviewDetail(re_no);
})

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

// 질문&답변 불러오기
  router.get("/faqlist",async(req,res) => {
    db.query("select faq_no,faq_q,faq_a from faq",(err,results) => {
      if (err) {
        res.send({
          //에러 발생 시
          code: 400,
          failed: "error occurred",
          error: err,
        });
      } else {
        res.send(results);
      }
    });
  })


// //질문 불러오기

// router.get("/qlist",async(req,res)=>{
    
//     db.query("select faq_q from faq",(err,results)=>{
//         if (err) {
//             res.send({
//               // 에러 발생 시
//               code: 400,
//               failed: "error occurred",
//               error: err,
//             });
//           } else {
//             console.log(results);
//             res.send(results);
//           }
//     });
// });


// //답글 불러오기

// router.get("/alist",async(req,res)=>{
    
//     db.query("select faq_a from faq",(err,results)=>{
//         if (err) {
//             res.send({
//               // 에러 발생 시
//               code: 400,
//               failed: "error occurred",
//               error: err,
//             });
//           } else {
//             res.send(results);
//           }
//     });
// });

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

router.post('/delfaq', function(request, response, next) {
  const faq_no = request.body.faq_no;

  db.query("delete from faq where faq_no = ?", [faq_no], function(error, result) {
    if(error) {
      console.error(error);
      return response.status(500).json({ error: '리뷰 삭제 중 오류'});
    }
    response.json(result);
    console.log(result);
  });
});

// router.post("/delFAQ", async (req, res) => {
//   const { faq_no } = req.body;
//   console.log("req.body",req.body);
//   db.query("DELETE FROM faq WHERE faq_no = ?", [faq_no], (err, results) => {
//       if (err) {
//         console.log("faq_no",faq_no);
//           res.send({
//               code: 400,
//               failed: "error occurred",
//               error: err,
//           });
//       } else {
//           res.send({ message: "faq 삭제", results });
//       }
//   });
// });

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