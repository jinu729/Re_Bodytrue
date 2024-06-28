const express = require('express');
const router = express.Router();
const db = require('../db.js');
const sql = require('../sql.js');
const fs = require('fs');
const multer = require('multer');
const path = require("path");

//승호작성


//승호작성완


//진우작성
router.post('/myrecheck', function(request, response, next){
    const cal_user_no = request.body.user_no;

    db.query(`select pro_name, tr_name, date_format(cal_startdate,'%y년%m월%d일 %h시') as cal_startdate, re_rate 
            from calendar c 
            join program p on c.cal_pro_no = p.pro_no 
            join trainer t on c.cal_tr_no = t.tr_no 
            left join review r on c.cal_user_no = r.re_user_no and p.pro_no = r.re_pro_no 
            where cal_user_no = ?`,[cal_user_no], function(error, result, field){
                if(error){
                    console.error(error);
                    return response.status(500).json({ error: '마이페이지 리뷰정보 에러' });
                }
                response.json(result);
                console.log(result);
            });
});

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

            //리뷰 정보 가져오기
            const reviews = await new Promise((resolve, reject) => {
                db.query(`select user_name, pro_name, re_rate, re_comment, date_format(re_date,'%y-%m-%d') as re_date
                            from review r
                            join user u on r.re_user_no = u.user_no
                            join program p on r.re_pro_no = p.pro_no
                            where pro_no = ?`,[pro_no],(error, results) => {
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

//예약하기
router.post('/calendarin', function(request, response, next) {

    const cal_pro_no = request.body.pro_no;
    const cal_user_no = request.body.user_no;
    const cal_tr_no = request.body.tr_no;
    const cal_startdate = request.body.startdate;
    const cal_enddate = request.body.enddate;

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
router.post('/mypage/:user_no', function(request, response, next){
    const user_no = request.params.user_no;
    
    db.query(`select user_name, user_email, user_tel from user where user_no = ?`,[user_no], function(error, result, field){
        if(error){
            console.error(error);
            return response.status(500).json({ error: '마이페이지 유저정보 에러'});
        }
        response.json(result);
        console.log(result);
    });
});

/* 마이페이지 끝 */

//은미작성완


//재영작성
// GET /programs 라우트 정의
router.get('/programlist', (req, res) => {

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
        console.log(results);
        res.json(results); // 결과를 JSON 형태로 응답
    });
    });


// Multer 설정: 이미지 업로드를 위한 미들웨어
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/program'); // 프로그램 이미지를 저장할 디렉토리
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, 'image-' + Date.now() + ext); // 파일 이름 설정 (유니크하게 설정하는 것이 좋음)
    }
  });
  
  const upload = multer({ storage: storage });
  
  // 이미지 업로드 API
  router.post('/uploadImage', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    // 이미지가 업로드된 경로 (저장된 경로)를 데이터베이스에 저장할 수 있음
    const imagePath = '/uploads/program/' + req.file.filename;
  
    // 여기서 imagePath를 데이터베이스에 저장하는 로직을 추가해야 함
    // 예를 들어 IMG 테이블에 이미지 경로를 INSERT하는 쿼리를 실행
  
    // DB에 저장된 이미지 경로를 클라이언트에 응답할 수도 있음
    res.json({ imagePath: imagePath });
  });
  
//재영작성완


//회창작성


//회창작성완


module.exports = router;