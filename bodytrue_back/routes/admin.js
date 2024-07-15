const express = require('express');
const router = express.Router();
const db = require('../db.js');
const sql = require('../sql.js');
const fs = require('fs');
const multer = require('multer');
const path = require("path");
const { error } = require('console');
const { log } = require('util');

//승호작성

//회원리스트 불러오기

router.get("/userlist",async(req,res)=>{
    db.query("select user_no,user_email,user_pwd,user_name,user_tel,user_sex,user_add1,user_add2,user_ban from user",(err,results)=>{
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
    searchname = '%' + name + '%';

    db.query("select user_email,user_pwd,user_name,user_tel,user_sex,user_add1,user_add2 from user where user_name LIKE ?",
      searchname,
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

router.post('/toggleuserban', (req, res) => {
  const { user_no, user_ban } = req.body;

  // 현재 USER_BAN 값에 따라 반대값으로 업데이트
  const newBanStatus = user_ban === 0 ? 1 : 0;
  const sql = 'UPDATE USER SET USER_BAN = ? WHERE USER_NO = ?';

  db.query(sql, [newBanStatus, user_no], function(err, results, fields) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: '회원 정지 에러' });
    }

    const message = newBanStatus === 1 ? '회원 정지' : '회원 정지 해제';
    return res.status(200).json({ message });
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

  searchname = '%' + name + '%';

  db.query("select tr_email,tr_pwd,tr_name,tr_tel,tr_sex,tr_add1,tr_add2 from trainer where tr_name LIKE ?",
      searchname,
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



//리뷰리스트 불러오기

router.get("/adminreview", async (req, res) => {
  db.query(`SELECT re_no, DATE_FORMAT(re_date, "%y-%m-%d") AS re_date, pro_name, user_name, tr_name,img_path
            FROM review r 
            JOIN program p ON r.re_pro_no = p.pro_no 
            JOIN user u ON r.re_user_no = u.user_no
            JOIN trainer t ON r.re_tr_no = t.tr_no
            left join img i on r.re_no = i.img_re_no
            order by re_no;`, (err, results) => {
      if (err) {
          res.send({
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

// 질문 수정하기
router.post("/updatefaq_q", async (req, res) => {
  const data = {
      Q: req.body.Q,
      faq_no: req.body.faq_no
  };

  db.query("UPDATE faq SET faq_q = ? WHERE faq_no = ?",
      [data.Q, data.faq_no],
      (err, results) => {
          if (err) {
              res.send({
                  code: 400,
                  failed: "error occurred",
                  error: err,
              });
          } else {
              res.send(results);
          }
      });
});

// 답글 수정하기
router.post("/updatefaq_a", async (req, res) => {
  const data = {
      A: req.body.A,
      faq_no: req.body.faq_no
  };

  db.query("UPDATE faq SET faq_a = ? WHERE faq_no = ?",
      [data.A, data.faq_no],
      (err, results) => {
          if (err) {
              res.send({
                  code: 400,
                  failed: "error occurred",
                  error: err,
              });
          } else {
              res.send(results);
          }
      });
});

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

//이미지가 있는 리뷰 상세 데이터 불러오기

router.get('/review/:re_no', (req, res) => {
  const re_no = req.params.re_no;
  
  const reviewQuery = `SELECT re_no, re_comment, date_format(re_date,'%Y-%m-%d') as re_date, user_name, pro_name, tr_name, re_rate FROM review r join user u on r.re_user_no = u.user_no join trainer t on r.re_tr_no = t.tr_no join program p on r.re_pro_no = p.pro_no where re_no = ?`;
  const imagesQuery = 'SELECT img_path FROM img WHERE img_re_no = ?';

  db.query(reviewQuery, [re_no],(err, reviewResult) => {
      if (err) {
          console.error('Error fetching review:', err);
          res.status(500).json({ error: 'Failed to fetch review' });
          return;
      }

      if (reviewResult.length === 0) {
          res.status(404).json({ error: 'No review found' });
          return;
      }

      const review = reviewResult[0];
      // console.log("===================================");
      // console.log("review",review);
      // console.log("===================================");
      db.query(imagesQuery, [re_no], (err, imagesResult) => {
          if (err) {
            console.error('Error fetching images:', err);
              res.status(500).json({ error: 'Failed to fetch images' });
              return;
          }
            

          review.images = imagesResult.map(image => image.img_path);
          res.json(review);
          console.log("===================================");
            console.log("reviewimg",review.images);
            console.log("===================================");
      });
  });
});

//이미지가 없는 리뷰 상세 데이터 불러오기

router.get('/review2/:re_no', (req, res) => {
  const re_no = req.params.re_no;
  
  const reviewQuery = `SELECT re_no, re_comment, date_format(re_date,'%Y-%m-%d') as re_date, user_name, pro_name, tr_name, re_rate FROM review r join user u on r.re_user_no = u.user_no join trainer t on r.re_tr_no = t.tr_no join program p on r.re_pro_no = p.pro_no where re_no = ?`;

  db.query(reviewQuery, [re_no],(err, reviewResult) => {
      if (err) {
          console.error('Error fetching review:', err);
          res.status(500).json({ error: 'Failed to fetch review' });
          return;
      }res.json(reviewResult);

  });
});

// 리뷰 삭제하기

router.post('/deletereview', function(request, response, next) {
  const re_no = request.body.re_no;
  
  // 먼저 img 테이블에서 데이터 삭제
  db.query("DELETE FROM img WHERE img_re_no = ?", [re_no], (error, result) => {
    if (error) {
      console.error('Error deleting from img:', error);
      return response.status(500).json({ error: '이미지 삭제 중 오류' });
    }

    db.query("DELETE FROM review WHERE re_no = ?", [re_no], function(error, result) {
      if (error) {
        console.error('Error deleting review:', error);
        return response.status(500).json({ error: '리뷰 삭제 중 오류' });
      }

      if (result.affectedRows === 0) {
        // 해당 re_no를 가진 리뷰가 없을 경우
        return response.status(404).json({ error: 'Review not found' });
      }

      // 삭제 성공
      response.status(200).json({ success: true });
      console.log('Deleted review:', result);
    });
  });
});

//회창작성완



module.exports = router;