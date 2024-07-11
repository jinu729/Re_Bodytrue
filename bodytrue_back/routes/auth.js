const express = require('express');
const router = express.Router();
const db = require('../db.js');
const sql = require('../sql.js');
const fs = require('fs');
const multer = require('multer');
const path = require("path");
const { log } = require('console');

//승호작성

//회원가입
router.post("/join", async (req, res) => {
  console.log(req.body)

  const email = req.body.email1 + '@' + req.body.email2;
  const tel = req.body.number1 + '-' + req.body.number2 + '-' + req.body.number3;
  const user = {
    //프론트에서 전달해주는 데이터
    USER_EMAIL: req.body.email,
    USER_PWD: req.body.user_password,
    USER_NAME : req.body.username,
    USER_SEX: req.body.gender,
    USER_ADDNO: req.body.postcode,
    USER_ADD1: req.body.address,
    USER_ADD2: req.body.address_detail,
    USER_TEL : req.body.user_tel,
  };
  console.log(user)

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


router.post("/email_check", async (req, res) => {

    const email = req.body.email; //확인하려는 이메일

    // console.log(`확인하려는 이메일: ${email}`);
  
    db.query("select * from user where USER_EMAIL= ? ",[email],(err, results) => {

      // console.log(`Querying user email: ${email}`);
        //user테이블에 보내준 이메일을 select했을때 데이터가 있다면
        if (err) {
          // console.error(`Error occurred during email check: ${err}`);
          res.send({
            // 에러 발생 시
            code: 400,
            failed: "error occurred",
            error: err,
          });
        } else {
          if (results.length > 0) {
            //결과값이 있으면 //쿼리 실행결과는 배열로 나와서 length를 이용하여 데이터를 파악함
            // console.log(`Email exists: ${email}`);
            res.send({
              code: 200,
              message: "존재하는 이메일입니다.",
              exists: true,
            });
          } else {
            //결과값이 없으면
            // console.log(`Email available: ${email}`);
            res.send({
              code: 200,
              message: "사용가능한 이메일입니다.",
              exists: false,
            });
          }
        }
      }
    );
});

//유저 임시비밀번호 저장

router.post("/findPw_user",async(req,res)=>{
  console.log("req.body",req.body);
    const data = {
        tmp_pwd : Math.random().toString(36).slice(2),
        user_name : req.body.user_name,
        user_tel : req.body.user_tel,
        user_email: req.body.user_email
      };
      console.log(data);

    db.query('update user set user_pwd = ? where user_name = ? and user_tel = ? and user_email=?',
        [data.tmp_pwd,data.user_name,data.user_tel,data.user_email],
        function(err,results,fields){
        if (err) {
                res.send({
                // 에러 발생 시
                code: 400,
                failed: "error occurred",
                error: err,
                });
                console.log(err);
            } else {
              if (results.affectedRows > 0) {
                res.send({
                    // 쿼리 실행 성공시
                    code: 200,
                    message: "임시비밀번호 부여 성공",
                    tmp_pwd: data.tmp_pwd,
                });
                console.log("임시 비밀번호:", data.tmp_pwd);
              } else {
                  res.send({
                      // 일치하는 사용자가 없을 경우
                      code: 404,
                      message: "일치하는 사용자가 없습니다.",
                  });
              }
            }
    });
});


//트레이너 임시비밀번호 저장

router.post("/findPw_tr",async(req,res)=>{
  console.log("req.body",req.body);
    const data = {
        tmp_pwd : Math.random().toString(36).slice(2),
        user_name : req.body.user_name,
        user_tel : req.body.user_tel,
        user_email: req.body.user_email
      };
      console.log(data);

    db.query('update trainer set tr_pwd = ? where tr_name = ? and tr_tel = ? and tr_email=?',
        [data.tmp_pwd,data.user_name,data.user_tel,data.user_email],
        function(err,results,fields){
        if (err) {
                res.send({
                // 에러 발생 시
                code: 400,
                failed: "error occurred",
                error: err,
                });
                console.log(err);
            } else {
              if (results.affectedRows > 0) {
                res.send({
                    // 쿼리 실행 성공시
                    code: 200,
                    message: "임시비밀번호 부여 성공",
                    tmp_pwd: data.tmp_pwd,
                });
                console.log("임시 비밀번호:", data.tmp_pwd);
              } else {
                  res.send({
                      // 일치하는 사용자가 없을 경우
                      code: 404,
                      message: "일치하는 사용자가 없습니다.",
                  });
              }
            }
    });
});

//회원 아이디찾기

router.post("/findId_user",async(req,res)=>{
    console.log(req.body);
    const data = {
        user_name : req.body.user_name,
        user_tel : req.body.user_tel,
        user_email : req.body.user_email
      };
      console.log("data",data);

    db.query('select user_email from user where user_name = ? and user_tel = ?',
        [data.user_name,data.user_tel],
        function(err,results,fields){
          console.log(results.length);
        if (err) {
            res.send({
            // 에러 발생 시
            code: 400,
            failed: "error occurred",
            error: err,
            });
        } else {
          if (results.length > 0) {
            const user_email = results[0].user_email;
            res.send({
                code: 200,
                message: "아이디(이메일) 찾기 성공",
                user_email: user_email
            });
            console.log("user__email",user_email);
            console.log("result.legnth",results.length);
        } else {
            res.send({
                code: 404,
                message: "일치하는 사용자가 없습니다."
            });
            console.log(res.send.code);
          }
        }
    });
});


//트레이너 아이디찾기

router.post("/findId_tr",async(req,res)=>{
  console.log(req.body);
  const data = {
      tr_name : req.body.user_name,
      tr_tel : req.body.user_tel
    };
    console.log("tr.data",data);

  db.query('select tr_email from trainer where tr_name = ? and tr_tel = ?',
      [data.tr_name,data.tr_tel],
      function(err,results,fields){
      if (err) {
          res.send({
          // 에러 발생 시
          code: 400,
          failed: "error occurred",
          error: err,
          });
      } else {
        if (results.length > 0) {
          const tr_email = results[0].tr_email;
          res.status(200).json({
              code: 200,
              message: "아이디(이메일) 찾기 성공",
              tr_email: tr_email
          });
          console.log(results);
      } else {
          res.status(404).json({
              code: 404,
              message: "일치하는 사용자가 없습니다."
          });
        }
      }
  });
});

//회원 로그인

// router.post("/login_user",async(req,res)=>{

//   const data={
//     user_email : req.body.email,
//     user_pwd : req.body.pwd
//   }

//   console.log(data.user_email);
//   console.log(data.user_pwd);
//   console.log("------------");

//   db.query('select user_no, user_email, user_name from user where user_email = ? and user_pwd = ?',
//     [data.user_email,data.user_pwd],
//     function(err,results,fields){

//       console.log(results.length);
//       console.log(data.user_email);

//     if (err) {
//         res.send({
//         // 에러 발생 시
//         code: 400,
//         failed: "error occurred",
//         error: err,x
//         });
//     } else {
//         if( results.length === 0){
//             res.send({
//             //쿼리 실행 성공시
//             code: 401,
//             message: "로그인실패",
//             });
//           }else{
//             res.send({
//               //쿼리 실행 성공시
//               code: 200,
//               message: "로그인성공",
//               email: results[0].user_email,
//               user_no: results[0].user_no
//               });
            
//         }
        
//     }
//   });
// });

//트레이너 로그인

router.post("패스명",async(req,res)=>{

  const data={
    tr_email : req.body.email,
    tr_pwd : req.body.pwd
  }

  db.query('select tr_no, tr_email, tr_name from trainer where tr_email = ? and tr_pwd = ?',
    [data.tr_email,data.tr_pwd],
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
        message: "로그인성공",
        });
    }
  });

});

//소셜 로그인


//카카오가입
// router.post("/kakaologin",async(req,res)=>{
//   console.log("req.body",req.body);
//     const user ={
//         user_email : req.body.email, 
//         user_name : req.body.name,
//         user_social : 1,
//         user_auth : 1
//     };

//     db.query("insert into user (user_email,user_name,user_auth,user_social) values (?,?,?,?)",
//         [user.user_email,user.user_name,user.user_auth,user.user_social],
//         (err)=>{
//             if (err) {
//                 res.send({
//                   // 에러 발생 시
//                   code: 400,
//                   failed: "error occurred",
//                   error: err,
//                 });
//               } else {
//                 res.send({
//                   //쿼리 실행 성공시
//                   code: 200,
//                   message: "회원가입 성공",
//                 });
//               }
//         })
// });

//카카오로그인후
router.post("/kakaologin", async (req, res) => {
    console.log("req.body",req.body);
    const email = req.body.user_email;
    const user_name = req.body.user_name;
  
    db.query(
      "select user_no, user_email, user_name, user_pwd, user_auth from user where user_email = ?",
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
          if (results.length > 0) {
            console.log("results",results[0]);            
            console.log("res.data",results[0].user_no);
            // 이미 회원인 경우, 해당 정보를 클라이언트에게 응답합니다.
            res.status(200).json({
              user_no: results[0].user_no,
              email: results[0].user_email,
              user_name: results[0].user_name
            });
            // console.log(user_no);
          } else {
            // 회원이 아닌 경우, 회원가입을 수행합니다.
            const user = {
              user_email: email,
              user_name: user_name,
              user_social: 1, // 소셜 로그인 유저 구분 (예: 카카오)
              user_auth: 1 // 사용자 권한 설정 (예: 일반 사용자)
            };
            console.log("user",user);
            db.query(
              'insert into user (user_email, user_name, user_auth, user_social) values (?, ?, ?, ?)',
              [user.user_email, user.user_name, user.user_auth, user.user_social],
              async (err, results) => {
                console.log(results);
                if (err) {
                  res.status(400).json({
                    code: 400,
                    failed: 'error occurred',
                    error: err
                  });
                } else {
                  res.status(200).json({
                    code: 200,
                    message: '회원가입 및 로그인 성공',
                    user_no: results.insertId, // 새로 생성된 회원 번호 반환
                    email: user.user_email,
                    user_name: user.user_name,
                    user_auth: user.user_auth,
                  });
                  
                }
              }
            );
          }
        }
      }
    );
  });



router.post("/naverlogin", async (req, res) => {
  console.log("req.body",req.body);
  const email = req.body.user_email;
  const user_name = req.body.user_name;
  console.log(user_name);
  db.query(
    "select user_no, user_email, user_name, user_pwd, user_auth from user where user_email = ?",
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
        if (results.length > 0) {
          console.log("results",results[0]);            
          console.log("res.data",results[0].user_no);
          console.log("res.data22",results[0].user_name);
          // 이미 회원인 경우, 해당 정보를 클라이언트에게 응답합니다.
          res.status(200).json({
            user_no: results[0].user_no,
            email: results[0].user_email,
            user_name: results[0].user_name
          });
          // console.log(user_no);
        } else {
          // 회원이 아닌 경우, 회원가입을 수행합니다.
          const user = {
            user_email: email,
            user_name: user_name,
            user_social: 2, // 소셜 로그인 유저 구분 (예: 카카오)
            user_auth: 1 // 사용자 권한 설정 (예: 일반 사용자)
          };
          console.log("user",user);
          db.query(
            'insert into user (user_no,user_email, user_name, user_auth, user_social) values (?, ?, ?, ?, ?)',
            [user.user_no,user.user_email, user.user_name, user.user_auth, user.user_social],
            async (err, results) => {
              if (err) {
                res.status(400).json({
                  code: 400,
                  failed: 'error occurred',
                  error: err
                });
              } else {
                res.status(200).json({
                  code: 200,
                  message: '회원가입 및 로그인 성공',
                  user_no: results.insertId, // 새로 생성된 회원 번호 반환
                  email: user.user_email,
                  user_name: user.user_name,
                  user_auth: user.user_auth,
                });
              }
            }
          );
        }
      }
    }
  );
});

// const CLIENT_ID = 'Ozm1PPMPASRIBq508on0';
// const CLIENT_SECRET = 'XoLi2skUt3';
// const REDIRECT_URI = 'http://localhost:3000/naverlogin'; // 클라이언트에서 설정한 콜백 URL


// // 네이버 로그인 처리 엔드포인트
// router.post('/naverlogin', async (req, res) => {
//   const code = req.body.code;
//   console.log(req.body);

//   try {
//     // 액세스 토큰 요청
//     const tokenResponse = await axios.post(
//       'https://nid.naver.com/oauth2.0/token',
//       querystring.stringify({
//         grant_type: 'authorization_code',
//         client_id: CLIENT_ID,
//         client_secret: CLIENT_SECRET,
//         code: code,
//         redirect_uri: REDIRECT_URI,
//       }),
//       {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//         },
//       }
//     );

//     const accessToken = tokenResponse.data.access_token;

//     // 사용자 정보 요청
//     const profileResponse = await axios.get('https://openapi.naver.com/v1/nid/me', {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     const userData = profileResponse.data.response;

//     // 클라이언트에게 액세스 토큰과 사용자 데이터 전송
//     res.status(200).json({ accessToken: accessToken, userData: userData });
//   } catch (error) {
//     console.error('네이버 로그인 처리 중 오류:', error.response.data);
//     res.status(500).json({ message: '네이버 로그인 처리 중 오류 발생' });
//   }
// });





//승호작성완


//진우작성
// router.post("/join", async (req, res) => {
//   console.log('Header:', req.headers)
//   console.log('Receieved data',req.body)

//   if (!req.body) {
//     return res.status(400).send({ message: 'No data received' });
//   }

//   const {
//     user_email,
//     user_password,
//     user_name,
//     gender,
//     user_addno,
//     user_add1,
//     user_add2,
//     user_tel
//   } = req.body;

//   const email = req.body.email1 + '@' + req.body.email2;
//   const tel = req.body.number1 + '-' + req.body.number2 + '-' + req.body.number3;
//   const user = {
//     //프론트에서 전달해주는 데이터
//     USER_EMAIL: req.body.user_email,
//     USER_PWD: req.body.user_password,
//     USER_NAME: req.body.user_name,
//     USER_SEX: req.body.gender,
//     USER_ADDNO: req.body.user_addno,
//     USER_ADD1: req.body.user_add1,
//     USER_ADD2: req.body.user_add2,
//     USER_TEL: req.body.user_tel
//   };
//   console.log(user);

//   db.query("insert into user (user_email,user_pwd,user_name,user_sex,user_addno,user_add1,user_add2,user_tel) values (?,?,?,?,?,?,?,?)",
//       [user.USER_EMAIL, user.USER_PWD, user.USER_NAME, user.USER_SEX, user.USER_ADDNO, user.USER_ADD1, user.USER_ADD2, user.USER_TEL], 
//       (err, results, fields) => {
//           //쿼리 실행
//           if (err) {
//               res.send({
//               // 에러 발생 시
//               code: 400,
//               failed: "error occurred",
//               error: err,
//               });
//           } else {
//               res.send({
//               //쿼리 실행 성공시
//               code: 200,
//               message: "회원가입 성공",
//               });
//           }
//   });
// });

router.post("/user_join", async (req, res) => {
  console.log(req.body)

  const email = req.body.email1 + '@' + req.body.email2;
  const tel = req.body.number1 + '-' + req.body.number2 + '-' + req.body.number3;
  
  const user = {
    //프론트에서 전달해주는 데이터
    USER_EMAIL: req.body.email,
    USER_PWD: req.body.user_password,
    USER_NAME : req.body.user_name,
    USER_SEX: req.body.gender,
    USER_ADDNO: req.body.postcode,
    USER_ADD1: req.body.user_add1,
    USER_ADD2: req.body.user_add2,
    USER_TEL : req.body.user_tel,
  };
  console.log(user)

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



router.post("/trainer_join", async (req, res) => {
  console.log(req.body)

  const email = req.body.email1 + '@' + req.body.email2;
  const tel = req.body.number1 + '-' + req.body.number2 + '-' + req.body.number3;


  const user = {
    //프론트에서 전달해주는 데이터
    USER_EMAIL: req.body.email,
    USER_PWD: req.body.user_password,
    USER_NAME : req.body.user_name,
    USER_SEX: req.body.gender,
    USER_ADDNO: req.body.postcode,
    USER_ADD1: req.body.user_add1,
    USER_ADD2: req.body.user_add2,
    USER_TEL : req.body.user_tel,
  };
  console.log(user)

  db.query("insert into trainer (tr_email,tr_pwd,tr_name,tr_sex,tr_addno,tr_add1,tr_add2,tr_tel) values (?,?,?,?,?,?,?,?)",
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

//회원 로그인

router.post("/login_user",async(req,res)=>{

  // const data={
  //   user_email : req.body.email,
  //   user_pwd : req.body.pwd
  // }
  const user_email = req.body.email;
  const user_pwd = req.body.pwd;
  console.log("req.body",req.body);
  console.log("req.email",user_email);
  console.log("req.pwd",user_pwd);

  db.query('select user_no, user_email, user_name, user_pwd, user_auth, user_ban from user where user_email = ?',
    [user_email],
    function(err,results,fields){
    if (err) {
        // console.error("Database Query Error:", err);
        res.send({
        // 에러 발생 시
        code: 400,
        failed: "error occurred",
        error: err,
        });
        console.log("res.send",res.send);
    } else {
      // console.log("-------------------------------------------");
      if (results.length > 0) {
        const user = results[0];
        console.log("-------------------------------------------");
        console.log("user",user);
        console.log(user.user_email);
        console.log(user.user_auth);
        if(user.user_ban === 0){
          if (user.user_pwd === user_pwd) {
            if (user.user_auth === 0) {
              res.send({
                code: 200,
                message: "관리자 로그인 성공",
                data: {
                  user_no: user.user_no,
                  user_email: user.user_email,
                  user_name: user.user_name,
                  user_pwd: user.user_pwd,
                  
                },
                email: results[0].user_email,
                user_no: results[0].user_no,
                user_auth: results[0].user_auth,
              });
            } else if (user.user_auth === 1) {
              res.send({
                code: 200,
                message: "회원 로그인 성공",
                data: {
                  user_no: user.user_no,
                  user_email: user.user_email,
                  user_name: user.user_name,
                  user_pwd: user.user_pwd,
                  
                },
                email: results[0].user_email,
                user_no: results[0].user_no,
                user_auth: user.user_auth,
              });
            } else {
              res.send({
                code: 403,
                message: "허가되지 않은 사용자 유형입니다.",
              });
            }
          } else {
            res.send({
              // 비밀번호 불일치 시
              code: 401,
              message: "비밀번호가 일치하지 않습니다.",
            });
          }
        } else {
          res.send({
            // 비밀번호 불일치 시
            code: 402,
            message: "정지되었습니다 관리자에게 문의하시기 바랍니다.",
          });
        }
      } else {
        res.send({
          // 이메일이 존재하지 않을 시
          code: 404,
          message: "사용자를 찾을 수 없습니다.",
        });
      }
    }
  });
});


//트레이너 로그인

router.post("/login_tr",async(req,res)=>{

  // const data={
  //   tr_email : req.body.email,
  //   tr_pwd : req.body.pwd
  // }
  const tr_email = req.body.email;
  const tr_pwd = req.body.pwd;
  const tr_no = req.body.tr_no;

  db.query('select tr_no, tr_email, tr_name, tr_pwd, tr_admit, tr_ban from trainer where tr_email = ?',
    [tr_email],
    function(err,results,fields){
      if (err) {
        // console.error("Database Query Error:", err);
        res.send({
        // 에러 발생 시
        code: 400,
        failed: "error occurred",
        error: err,
        });
        console.log("res.send",res.send);
    } else {
      // console.log("-------------------------------------------");
      if (results.length > 0) {
        const tr = results[0];
        console.log("-------------------------------------------");
        console.log("tr",tr);
        console.log(tr.tr_email);
        console.log(tr.tr_admit);
        console.log(tr.tr_no);
        if(tr.tr_ban === 0){
          if (tr.tr_pwd === tr_pwd) {
            res.send({
              // 로그인 성공 시
              code: 200,
              message: "로그인 성공",
              data: {
                tr_no: tr.tr_no,
                tr_email: tr.tr_email,
                tr_name: tr.tr_name,
                tr_pwd: tr.tr_pwd,
                tr_admit: tr.tr_admit
              },
              email: results[0].tr_email,
              tr_no: results[0].tr_no,
              tr_admit: tr.tr_admit,
            });
          } else {
            res.send({
              // 비밀번호 불일치 시
              code: 401,
              message: "비밀번호가 일치하지 않습니다.",
            });
          }
        } else {
          res.send({
            // 비밀번호 불일치 시
            code: 402,
            message: "정지되었습니다 관리자에게 문의하시기 바랍니다.",
          });
        }
      } else {
        res.send({
          // 이메일이 존재하지 않을 시
          code: 404,
          message: "사용자를 찾을 수 없습니다.",
        });
      }
    }
  
  });


});



//진우작성완


//은미작성


//은미작성완


//재영작성


//재영작성완


//회창작성


//회창작성완

module.exports = router;