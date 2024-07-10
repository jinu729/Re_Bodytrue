const express = require('express');
const router = express.Router();
const db = require('../db.js');
const sql = require('../sql.js');
const fs = require('fs');
const multer = require('multer');
const path = require("path");

//승호작성

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
  

router.post('/upload_Uimg', upload.single('img'), (req, res) => {
    console.log('File Uploaded:', req.file); // 업로드된 파일 정보 확인

    const user_no = req.body.user_no;
    const img = req.file.filename;
    console.log("user_no : ",user_no);
    console.log("img : ",img);

    try {
        const pastDir = `${__dirname}` + `../../uploads/` + img

        console.log('pastDir-------------------');
        console.log(pastDir);
        console.log('-------------------');

        const newDir = `${__dirname}` + `../../uploads/user/`;
        if (!fs.existsSync(newDir)) fs.mkdirSync(newDir);

        const extension =img.substring(img.lastIndexOf('.'))

        console.log('Extenstion-------------------');
        console.log(extension);
        console.log('-------------------');


        console.log('newDir-------------------');
        console.log(newDir);
        console.log('-------------------');

        // 이미지 폴더 및 이름(상품번호-타입) 변경
        // 타입 0: 메인 이미지 1: 상세 이미지1 2: 상세 이미지2 3: 가격이미지
        fs.rename(pastDir, newDir + user_no + '-0' + extension, (err) => {
            if (err) {
                throw err;
            }
        });
        try{
            db.query(`select count(*) as num from img where img_user_no = ? and img_type = 0;`,
            [user_no],
            function (error, results, fields){

                // console.log("results[0] : ",results[0]);
                // console.log("results[0].num === 0 : ",results[0].num === 0);

                if(results[0].num === 0){
                        db.query(`insert into img (img_type,img_path,img_user_no) values(0,?,?);`,
                        [user_no+'-0'+extension,user_no],
                        function (error, results, fields){
                            if(error){
                                throw error;
                            }
                        })
                }else{
                    db.query(`update img set img_path = ? where img_user_no = ? and img_type = 0;`,
                        [user_no+'-0'+extension,user_no],
                        function (error, results, fields){
                            if(error){
                                throw error;
                            }
                        
                        })
                }
        }
        
    )}
    catch(err){
        console.log(err);

    }       
        }catch(err){
             console.log(err);
        }
   
    return res.status(200).json({
        message: 'success',
        img // 업로드된 파일명 반환
    });
});

router.get('/programlist1', (req, res) => {
    
db.query(`SELECT P.PRO_NO, P.PRO_NAME, T.TR_NAME AS PRO_TRAINER, ROUND(AVG(R.RE_RATE), 1) AS PRO_RATE_AVG, substring_index(GROUP_CONCAT(I.IMG_PATH),',',1) AS IMG_PATH
            FROM PROGRAM P
            LEFT JOIN TRAINER T ON P.PRO_TR_NO = T.TR_NO
            LEFT JOIN REVIEW R ON P.PRO_NO = R.RE_PRO_NO
            LEFT JOIN IMG I ON P.PRO_NO = I.IMG_PRO_NO
            GROUP BY P.PRO_NO;`,
         (error, results, fields) => {
    if (error) {
        console.error('데이터베이스에서 프로그램 목록을 가져오는 중 오류 발생:', error);
        return res.status(500).json({ error: '데이터베이스 오류' });
    }
    res.json(results); // 결과를 JSON 형태로 응답
});
});


//승호작성완


//진우작성

//진우작성완


//은미작성

/* 상품 디테일 시작 */
router.get('/prodetail/:pro_no', function(request, response, next){
    
    const pro_no = request.params.pro_no;
    // console.log(`Received request for PRO_NO: ${request.params.pro_no}`);
    // console.log(pro_no);

    //쿼리문 여러개 실행해야해서 async/await 사용
    async function getProductDetail(pro_no){
        try{
            //상품 상세정보 가져오기
            const productDetails = await new Promise((resolve, reject) => {
                db.query(sql.pro_detail, [pro_no], (error, results) => {
                    if(error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            }); 
            // 리뷰 정보 가져오기
            const reviews = await new Promise((resolve, reject) => {
                db.query(`select user_name, pro_name, re_rate, re_comment, date_format(re_date,'%y-%m-%d') as re_date
                            from review r
                            join user u on r.re_user_no = u.user_no
                            join program p on r.re_pro_no = p.pro_no
                            where pro_no = ?`, [pro_no], (error, results) => {
                    if(error){
                        return reject(error);
                    }
                    resolve(results);
                });
            });

            //두 쿼리문 결과 합쳐서 응답보내기
            response.json({
                productDetails,
                reviews
            });

        } catch(error){
            console.error(error);
            response.status(500).json({ error: '서버에러'});
        }
    } 
    getProductDetail(pro_no);


    //pro_no을 통해서 pro_detail 가져옴 
    // db.query(sql.pro_detail,
    //     [pro_no], function(error, results, fields){
    //         if(error){
    //             console.error(error);
    //             return response.status(500).json({ error : '상품 정보 에러' });
    //         }
    //         response.json(results);
    //     }
    // );
    // db.query(`SELECT USER_NAME,PRO_NAME,RE_RATE,RE_COMMENT,RE_DATE
    // FROM REVIEW R JOIN USER U ON R.RE_USER_NO = U.USER_NO JOIN PROGRAM P ON R.RE_PRO_NO = P.PRO_NO
    // WHERE PRO_NO = ?;`, [pro_no], function(error, results, fields){
    // if(error){
    //     console.error(error);
    //     return response.status(500).json({ error: '리뷰 정보 에러'});
    // }
    // response.json(results);
    // });
    
});
//프로그램 메인 이미지 불러오기
router.get('/promain',function(request, response, next){

    db.query(`select img_path from img where img_pro_no = ? and img_type = 1`,)
})

//예약하기
router.post('/calendarin', function(request, response, next) {

    const cal_pro_no = request.body.pro_no;
    const cal_user_no = request.body.user_no;
    const cal_tr_no = request.body.tr_no;
    const cal_startdate = request.body.startdate;
    const cal_enddate = request.body.enddate;

        // 데이터 수신 로그 추가
        console.log("수신된 예약 데이터:", {
            pro_no: cal_pro_no,
            user_no: cal_user_no,
            tr_no: cal_tr_no,
            startdate: cal_startdate,
            enddate: cal_enddate,
          });

    db.query(`insert into calendar (cal_user_no, cal_pro_no, cal_tr_no, cal_startdate, cal_enddate) values (?, ?, ?, ?, ?)`, 
        [cal_user_no, cal_pro_no, cal_tr_no, cal_startdate, cal_enddate], function(error, result, field){

            if(error){
                console.error(error);
                return response.status(500).json({ error : '예약에러' });
            }
            response.json(result);
    });
});

//찜하기
router.post('/makeplike', function(request, response, next) {

    const plike_user_no = request.body.plike_user_no;
    const plike_pro_no = request.body.plike_pro_no;

    db.query(`insert into plike(plike_user_no, plike_pro_no) values (?, ?)`, [plike_user_no, plike_pro_no], function(error, result, field){
        if(error){
            console.error(error);
            return response.status(500).json({ error : '좋아요에러'});
        }
        response.json(result);
        console.log(result);
    });
});
/* 상품 디테일 끝 */

/* 마이페이지 시작 */
//내 이미지 가져오기
// router.post('/getimg',function(request,response,next){
//         const user_no = request.body.user_no;
    
//         db.query(`select img_path from img where img_user_no = ? and img_type = 0`,
//             [user_no], function(error, result, field){
//                     if(error){
//                         console.error(error);
//                         return response.status(500).json({ error: '이미지 정보 에러'});
//                     }
//                     response.json(result);
//                     console.log(result);
                   
//             }
//         )
//     });

router.post('/getimg',function(request,response,next){
    const user_no = request.body.user_no;

    db.query(`select img_path from img where img_user_no = ? and img_type = 0`,
        [user_no], function(error, result, field){
                console.log('aaaaa:', result);

                if (Array.isArray(result) && result.length > 0 && result[0].img_path) {
                    response.json({"img_path": result[0].img_path});
                } else {
                    console.log("널이에용");
                    response.json({"img_path":"noimg.png"});
                }

                if(error){
                    console.error(error);
                    return response.status(500).json({ error: '이미지 정보 에러'});
                }
               
        }
    )
});

//내 정보 확인
router.post('/mypage/:user_no', function(request, response, next){
    const user_no = request.params.user_no;
    
    db.query(`select user_no, user_name, user_email, user_tel from user where user_no = ?`,
        [user_no],
         function(error, result, field){
        if(error){
            console.error(error);
            return response.status(500).json({ error: '마이페이지 유저정보 에러'});
        }
        response.json(result);
        console.log(result);
    });
});

//내가 예약한 정보 확인
router.post('/mycalcheck', function(request, response, next){
    const cal_user_no = request.body.user_no; //요청 본문에서 user_no값 가져와야됨 그래서 vue에서 user_no : user_no 값 포함시키고있는거
    console.log("cal_user_no",cal_user_no);
    db.query(`select pro_no, pro_name, tr_no, tr_name, date_format(cal_startdate,'%y년%m월%d일 %H시') as cal_startdate from calendar c 
            join program p on c.cal_pro_no = p.pro_no 
            join trainer t on c.cal_tr_no = t.tr_no 
            where cal_user_no = ? order by c.cal_startdate`,[cal_user_no], function(error, result, field){
                if(error){
                    console.error(error);
                    return response.status(500).json({ error: '마이페이지 유저정보 에러' });
                }
                response.json(result);
                console.log(result);
            });
});

//내가 작성한 리뷰 정보 확인
router.post('/myrecheck', function(request, response, next){
    const cal_user_no = request.body.user_no;

    db.query(`select 
        distinct r.re_no, p.pro_no, p.pro_name, t.tr_name,t.tr_no, date_format(r.re_date, '%y년 %m월 %d일 %H시') as re_date, r.re_rate
        from program p join trainer t on p.pro_tr_no = t.tr_no 
        join review r on p.pro_no = r.re_pro_no 
        where r.re_user_no = ? and r.re_rate is not null`,[cal_user_no], function(error, result, field){
        if(error){
            console.error(error);
            return response.status(500).json({ error: '마이페이지 리뷰정보 에러' });
        }
            response.json(result);
            console.log(result);
        });
});

//내가 찜한 정보 확인
router.post('/myplike', function(request, response, next){
    const plike_user_no = request.body.user_no;

    db.query(`SELECT p.pro_no, pro_name, tr_name, ROUND(AVG(re_rate), 1) AS rate_avg, DATE_FORMAT(pro_startdate, '%y-%m-%d') AS pro_startdate, DATE_FORMAT(pro_enddate, '%y-%m-%d') AS pro_enddate
            FROM program p 
            JOIN trainer t ON p.pro_tr_no = t.tr_no 
            LEFT JOIN review r ON p.pro_no = r.re_pro_no
            WHERE p.pro_no IN (
                SELECT plike_pro_no 
                FROM plike 
                WHERE plike_user_no = ?
            )
            GROUP BY p.pro_no;`, [plike_user_no], function(error, result, field){
            if(error){
                console.error(error);
                return response.status(500).json({ error: '마이페이지 찜 정보 에러' });
            }
            response.json(result);
            console.log(result);
        });
}); 

//찜 내역 삭제
router.post('/delmyplike', function(request, response, next){
    const plike_user_no = request.body.user_no;
    const plike_pro_no = request.body.pro_no;

    db.query(`delete from plike where plike_user_no = ? and plike_pro_no = ?`,[plike_user_no, plike_pro_no], function(error, result){
        if(error){
            console.error(error);
            return response.status(500).json({ error: '찜삭제 오류' });
        }
        response.json(result);
        console.log(result);
    })
});

//리뷰 작성하기
  
const upload2 = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            const uploadPath = path.join(__dirname, '..', 'uploads');
            console.log('Upload Destination:', uploadPath); // 업로드 경로 확인
            cb(null, uploadPath);
        },
        filename(req, file, cb) {
            console.log('Uploaded File:', file.originalname); // 업로드된 파일 이름 확인
            cb(null, file.originalname);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/upload_img', upload2.single('img'), (req, res) => {
    console.log('File Uploaded:', req.file); // 업로드된 파일 정보 확인
    return res.status(200).json({
        message: 'success',
        filename: req.file.filename  // 업로드된 파일명 반환
    });
});

router.post('/makereview', function(req, res) {
    const { re_comment, re_user_no, re_pro_no, re_tr_no, re_rate, re_img } = req.body;

    db.query(`INSERT INTO review (re_comment, re_user_no, re_pro_no, re_tr_no, re_rate) VALUES (?, ?, ?, ?, ?)`,
        [re_comment, re_user_no, re_pro_no, re_tr_no, re_rate], function(error, result) {
            if (error) {
                console.error('리뷰 작성 오류:', error);
                return res.status(500).json({ error: '리뷰 작성 오류' });
            }

            const re_no = result.insertId;
            const pastDir0 = path.join(__dirname, '..','uploads', re_img);

            console.log('pastDir:', pastDir0);

            const newDir = path.join(__dirname, '..', 'uploads', 'review');
            if (!fs.existsSync(newDir)) fs.mkdirSync(newDir, { recursive: true });

            const extension = path.extname(re_img);
            const newFileName = `${re_no}-0${extension}`;
            const newFilePath = path.join(newDir, newFileName);

            console.log('newDir:', newDir);
            console.log('newFilePath:', newFilePath);

            fs.access(pastDir0, fs.constants.F_OK, (err) => {
                if (err) {
                    console.error('파일 존재하지 않음:', pastDir0);
                    return res.status(500).json({ error: '파일 존재하지 않음' });
                }

                fs.rename(pastDir0, newFilePath, (err) => {
                    if (err) {
                        console.error('파일 이동 오류:', err);
                        return res.status(500).json({ error: '파일 이동 오류' });
                    }

                    db.query(`INSERT INTO img (img_type, img_path, img_re_no) VALUES (?, ?, ?)`,
                        [0, newFileName, re_no], function(error, result) {
                            if (error) {
                                console.error('이미지 저장 오류:', error);
                                return res.status(500).json({ error: '이미지 저장 오류' });
                            }

                            res.json({ message: 'success' });
                        });
                });
            });
        });
});
  
//예약 삭제하기
router.post('/deletecal', function(request, response, next){
    const cal_pro_no = request.body.pro_no;
    const cal_user_no = request.body.user_no;
    const cal_startdate = request.body.cal_startdate;
    console.log("cal_pro_no",cal_pro_no);
    console.log("cal_user_no",cal_user_no);
    console.log("====================================");
    console.log("cal_startdate",cal_startdate);

    const date = new Date(cal_startdate);
    const utcDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    const formatDate = utcDate.toISOString().slice(0, 19).replace('T', ' ');

    db.query(`delete from calendar where cal_pro_no = ? and cal_user_no = ? and cal_startdate = ?`,
        [cal_pro_no, cal_user_no, formatDate], function(error, result){
        if(error){
            console.error(error);
            return response.status(500).json({ error: ' 예약 삭제 중 오류 '});
        }
        response.json(result);
        console.log(result);
    })
});

//리뷰 삭제하기
router.post('/deletere', function(request, response, next){
    const re_no = request.body.re_no;
    
    db.query(`delete from review where re_no = ?`,[re_no], function(error, result){
        if(error){
            console.error(error);
            return response.status(500).json({ error: '리뷰 삭제 중 오류' });
        }
        response.json(result);
        console.log(result);
    })
});

//리뷰 수정하기
router.post('/updatere', function(request, response, next){
    const re_no = request.body.re_no;
    const re_comment = request.body.re_comment;
    const re_rate = request.body.re_rate;
    
    db.query(`update review set re_rate=?,re_comment = ? where re_no = ?`,[re_rate,re_comment, re_no], function(error, result){
        if(error){
            console.error(error);
            return response.status(500).json({ error: '리뷰 수정 중 오류' });
        }
        response.json(result);
        console.log(result);
    })
});

// //리뷰 수정하기
// router.post('/updatere',function(request, response, next){
//     const re_no = request.body.re_no;
//     const re_comment = request.body.re_comment;

//     async function getReview(re_no){
//         try{
//             //리뷰 정보 가져오기
//             const myreview = await new Promise((resolve, reject) => {
//                 db.query(`select * from review where re_no = ?`, [re_no], (error, results) => {
//                     if(error){
//                         return reject(error);
//                     }
//                     resolve(results);
//                 });
//             });
//             //리뷰
//             const reviewupdate = await new Promise((resolve,reject) => {
//                 db.query(`update review set re_comment = ? where re_no = ?`,[re_comment, re_no], function(error, reuslt){
//                     if(error){
//                         return reject(error);
//                     }
//                     resolve(results);
//                 });
//             });

//             response.json({
//                 myreview,
//                 reviewupdate
//             });
//         } catch(error){
//             console.error(error);
//             response.status(500).json({ error: '서버에러' });
//         }
//     }
//     getReview(re_no);
// });

/* 마이페이지 끝 */

/* FAQ */
router.post('/userfaq',function(req,res){
    db.query(`select faq_no, faq_q,faq_a from faq;`,
        (error,result) =>{
            if(error){
                console.log(error);
                return res.status(500).json({error:'faq 리스트 에러'});
            }
            res.json(result);
            console.log(result);
        }
    )

});

//은미작성완


//재영작성
// GET /programs 라우트 정의
// 기본 프로그램 목록 가져오기
router.get('/programlist/:pro_tag', (req, res) => {
    const pro_tag = req.params.pro_tag
    console.log("pro_tag", pro_tag);
    db.query(`
      SELECT P.PRO_NO, P.PRO_NAME, P.PRO_TAG, T.TR_NAME AS PRO_TRAINER, ROUND(AVG(R.RE_RATE), 1) AS PRO_RATE_AVG, substring_index(GROUP_CONCAT(I.IMG_PATH), ',', 1) AS IMG_PATH
      FROM PROGRAM P
      LEFT JOIN TRAINER T ON P.PRO_TR_NO = T.TR_NO
      LEFT JOIN REVIEW R ON P.PRO_NO = R.RE_PRO_NO
      LEFT JOIN IMG I ON P.PRO_NO = I.IMG_PRO_NO
      WHERE PRO_TAG = ?
      GROUP BY P.PRO_NO;
    `,[pro_tag], (error, results, fields) => {
      if (error) {
        console.error('데이터베이스에서 프로그램 목록을 가져오는 중 오류 발생:', error);
        return res.status(500).json({ error: '데이터베이스 오류' });
      }
      res.json(results); // 기본 프로그램 목록을 JSON 형태로 응답
    });
  });
  
  // 정렬된 프로그램 목록 가져오기
  router.get('/programlist/:pro_tag/sortbyenddate', (req, res) => {
    const pro_tag = req.params.pro_tag;
    db.query(`
      SELECT P.PRO_NO, P.PRO_NAME, T.TR_NAME AS PRO_TRAINER, ROUND(AVG(R.RE_RATE), 1) AS PRO_RATE_AVG, substring_index(GROUP_CONCAT(I.IMG_PATH), ',', 1) AS IMG_PATH
      FROM PROGRAM P
      LEFT JOIN TRAINER T ON P.PRO_TR_NO = T.TR_NO
      LEFT JOIN REVIEW R ON P.PRO_NO = R.RE_PRO_NO
      LEFT JOIN IMG I ON P.PRO_NO = I.IMG_PRO_NO
      where pro_tag = ?
      GROUP BY P.PRO_NO
      ORDER BY P.PRO_ENDDATE, P.PRO_NAME;
    `,[pro_tag], (error, results, fields) => {
      if (error) {
        console.error('데이터베이스에서 프로그램 목록을 가져오는 중 오류 발생:', error);
        return res.status(500).json({ error: '데이터베이스 오류' });
      }
      res.json(results); // 정렬된 프로그램 목록을 JSON 형태로 응답
    });
  });
  
  router.get('/programlist/:pro_tag/sortbyviews', (req, res) => {
    const pro_tag = req.params.pro_tag;
    db.query(`
      SELECT P.PRO_NO, P.PRO_NAME, P.PRO_CNT, T.TR_NAME AS PRO_TRAINER, ROUND(AVG(R.RE_RATE), 1) AS PRO_RATE_AVG, substring_index(GROUP_CONCAT(I.IMG_PATH), ',', 1) AS IMG_PATH
      FROM PROGRAM P
      LEFT JOIN TRAINER T ON P.PRO_TR_NO = T.TR_NO
      LEFT JOIN REVIEW R ON P.PRO_NO = R.RE_PRO_NO
      LEFT JOIN IMG I ON P.PRO_NO = I.IMG_PRO_NO
      where pro_tag=?
      GROUP BY P.PRO_NO
      ORDER BY PRO_CNT DESC, P.PRO_NAME;
    `, [pro_tag],(error, results, fields) => {
      if (error) {
        console.error('데이터베이스에서 프로그램 목록을 가져오는 중 오류 발생:', error);
        return res.status(500).json({ error: '데이터베이스 오류' });
      }
      res.json(results); // 정렬된 프로그램 목록을 JSON 형태로 응답
    });
  });
  
  router.get('/programlist/:pro_tag/sortbyrating', (req, res) => {
    const pro_tag = req.params.pro_tag;
    db.query(`
      SELECT P.PRO_NO, P.PRO_NAME, T.TR_NAME AS PRO_TRAINER, ROUND(AVG(R.RE_RATE), 1) AS PRO_RATE_AVG, substring_index(GROUP_CONCAT(I.IMG_PATH), ',', 1) AS IMG_PATH
      FROM PROGRAM P
      LEFT JOIN TRAINER T ON P.PRO_TR_NO = T.TR_NO
      LEFT JOIN REVIEW R ON P.PRO_NO = R.RE_PRO_NO
      LEFT JOIN IMG I ON P.PRO_NO = I.IMG_PRO_NO
      where pro_tag=?
      GROUP BY P.PRO_NO
      ORDER BY PRO_RATE_AVG DESC, P.PRO_NAME;
    `,[pro_tag], (error, results, fields) => {
      if (error) {
        console.error('데이터베이스에서 프로그램 목록을 가져오는 중 오류 발생:', error);
        return res.status(500).json({ error: '데이터베이스 오류' });
      }
      res.json(results); // 정렬된 프로그램 목록을 JSON 형태로 응답
    });
  });

//유저 정보 확인
  router.post('/userupdate/:user_no', function(request, response, next){
    const user_no = request.params.user_no;
    
    db.query(`select user_name, user_email, user_tel, user_sex from user where user_no = ?`,
        [user_no],
         function(error, result, field){
        if(error){
            console.error(error);
            return response.status(500).json({ error: '유저정보 에러'});
        }
        response.json(result);
        console.log(result);
    });
});

//회원정보 삭제하기
router.post('/deleteuser', function(request, response, next){
    const user_no = request.body.user_no;

    // user_no가 숫자인지 확인
    if (typeof user_no !== 'number') {
        console.error('Invalid user_no:', user_no);
        return response.status(400).json({ error: '잘못된 user_no 값' });
    }

    console.log('Deleting user with user_no:', user_no);
    
    db.query('DELETE FROM user WHERE user_no = ?', [user_no], function(error, result){
        if (error) {
            console.error('SQL Error:', error);
            return response.status(500).json({ error: '회원 정보 삭제 중 오류' });
        }
        response.json(result);
        console.log('Delete result:', result);
    });
});

//회원정보 수정하기
router.post('/updateuser', function(request, response, next){


    const tel = request.body.number1 + '-' + request.body.number2 + '-' + request.body.number3;
    const user_no = request.body.user_no;
    const user_tel = request.body.user_tel;
    const user_add1 = request.body.user_add1;
    const user_add2 = request.body.user_add2;
    const user_addno = request.body.user_addno;
    const user_pwd = request.body.user_pwd;
    
    console.log('Updating user with user_no:', user_no);

    db.query(`update user set user_pwd = ?, user_addno = ?, user_add1 = ?, user_add2 = ?, user_tel = ?
where user_no = ?;`,[user_pwd, user_addno, user_add1, user_add2, user_tel, user_no], function(error, result){
            
        if(error){
            console.error(error);
            return response.status(500).json({ error: '회원 정보 수정 중 오류' });
        }
        response.json(result);
        console.log(result);
    })
});


//재영작성완


//회창작성


//회창작성완


module.exports = router;