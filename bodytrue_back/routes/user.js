const express = require('express');
const router = express.Router();
const db = require('../db.js');
const sql = require('../sql.js');
const fs = require('fs');
const multer = require('multer');
const path = require("path");

//승호작성

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

//내 정보 확인
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

//내가 예약한 정보 확인
router.post('/mycalcheck', function(request, response, next){
    const cal_user_no = request.body.user_no; //요청 본문에서 user_no값 가져와야됨 그래서 vue에서 user_no : user_no 값 포함시키고있는거
    
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

    db.query(`select pro_no, pro_name, tr_name, date_format(cal_startdate,'%y년%m월%d일 %H시') as cal_startdate, re_rate 
            from calendar c 
            join program p on c.cal_pro_no = p.pro_no 
            join trainer t on c.cal_tr_no = t.tr_no 
            left join review r on c.cal_user_no = r.re_user_no and p.pro_no = r.re_pro_no 
            where cal_user_no = ? order by c.cal_startdate DESC`,[cal_user_no], function(error, result, field){
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

    db.query(`select pro_no, pro_name,tr_name,round(avg(re_rate),1) as rate_avg , date_format(pro_startdate,'%y-%m-%d') as pro_startdate, 
        date_format(pro_enddate,'%y-%m-%d') as pro_enddate
        from program p 
        join trainer t on p.pro_tr_no = t.tr_no join review r on p.pro_no = r.re_pro_no
        where pro_no in(
                    select plike_pro_no from plike where plike_user_no=?)
        group by re_pro_no`, [plike_user_no], function(error, result, field){
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
router.post('/makereview', function(request, response, next){
    const {re_comment, re_user_no, re_pro_no, re_tr_no, re_rate} = request.body;

    db.query(`insert into review (re_comment, re_user_no, re_pro_no, re_tr_no, re_rate) values (?, ?, ?, ?, ?)`,
        [re_comment, re_user_no, re_pro_no, re_tr_no, re_rate], function(error, result){
            if(error){
                console.error(error);
                return response.status(500).json({ error: '리뷰 작성 오류' });
            }
            response.json(result);
            console.log(result);
        })
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
router.get('/programlist/:sortOption', (req, res) => {
  const { sortOption } = req.params;

  let sqlQuery = '';

  switch (sortOption) {
    case 'sortbyenddate':
      sqlQuery = `
        SELECT P.PRO_NO, P.PRO_NAME, T.TR_NAME AS PRO_TRAINER, ROUND(AVG(R.RE_RATE), 1) AS PRO_RATE_AVG, substring_index(GROUP_CONCAT(I.IMG_PATH), ',', 1) AS IMG_PATH
        FROM PROGRAM P
        LEFT JOIN TRAINER T ON P.PRO_TR_NO = T.TR_NO
        LEFT JOIN REVIEW R ON P.PRO_NO = R.RE_PRO_NO
        LEFT JOIN IMG I ON P.PRO_NO = I.IMG_PRO_NO
        GROUP BY P.PRO_NO
        ORDER BY P.PRO_ENDDATE, P.PRO_NAME;
      `;
      break;
    case 'sortbyviews':
      sqlQuery = `
        SELECT P.PRO_NO, P.PRO_NAME, T.TR_NAME AS PRO_TRAINER, ROUND(AVG(R.RE_RATE), 1) AS PRO_RATE_AVG, substring_index(GROUP_CONCAT(I.IMG_PATH), ',', 1) AS IMG_PATH
        FROM PROGRAM P
        LEFT JOIN TRAINER T ON P.PRO_TR_NO = T.TR_NO
        LEFT JOIN REVIEW R ON P.PRO_NO = R.RE_PRO_NO
        LEFT JOIN IMG I ON P.PRO_NO = I.IMG_PRO_NO
        GROUP BY P.PRO_NO
        ORDER BY COUNT(R.RE_PRO_NO) DESC, P.PRO_NAME;
      `;
      break;
    case 'sortbyrating':
      sqlQuery = `
        SELECT P.PRO_NO, P.PRO_NAME, T.TR_NAME AS PRO_TRAINER, ROUND(AVG(R.RE_RATE), 1) AS PRO_RATE_AVG, substring_index(GROUP_CONCAT(I.IMG_PATH), ',', 1) AS IMG_PATH
        FROM PROGRAM P
        LEFT JOIN TRAINER T ON P.PRO_TR_NO = T.TR_NO
        LEFT JOIN REVIEW R ON P.PRO_NO = R.RE_PRO_NO
        LEFT JOIN IMG I ON P.PRO_NO = I.IMG_PRO_NO
        GROUP BY P.PRO_NO
        ORDER BY PRO_RATE_AVG DESC, P.PRO_NAME;
      `;
      break;
    default:
      sqlQuery = `
        SELECT P.PRO_NO, P.PRO_NAME, T.TR_NAME AS PRO_TRAINER, ROUND(AVG(R.RE_RATE), 1) AS PRO_RATE_AVG, substring_index(GROUP_CONCAT(I.IMG_PATH), ',', 1) AS IMG_PATH
        FROM PROGRAM P
        LEFT JOIN TRAINER T ON P.PRO_TR_NO = T.TR_NO
        LEFT JOIN REVIEW R ON P.PRO_NO = R.RE_PRO_NO
        LEFT JOIN IMG I ON P.PRO_NO = I.IMG_PRO_NO
        GROUP BY P.PRO_NO;
      `;
      break;
  }

  db.query(sqlQuery, (error, results, fields) => {
    if (error) {
      console.error('데이터베이스에서 프로그램 목록을 가져오는 중 오류 발생:', error);
      return res.status(500).json({ error: '데이터베이스 오류' });
    }
    res.json(results); // 정렬된 결과를 JSON 형태로 응답
  });
});






//     //조회-이름순//
// SELECT PRO_NAME, ROUND(AVG(RE_RATE),1) AS RATE_AVG, PRO_CNT
// FROM REVIEW R JOIN PROGRAM P ON R.RE_PRO_NO = P.PRO_NO
// GROUP BY RE_PRO_NO
// ORDER BY PRO_CNT DESC, PRO_NAME;

// /* 평점-이름순으로 정렬 */
// SELECT PRO_NAME, ROUND(AVG(RE_RATE),1) AS RATE_AVG
// FROM REVIEW R JOIN PROGRAM P ON R.RE_PRO_NO = P.PRO_NO
// GROUP BY RE_PRO_NO
// ORDER BY RATE_AVG DESC, PRO_NAME;

// //마감-이름순//
// SELECT PRO_NAME, TR_NAME,  ROUND(AVG(RE_RATE),1) AS RATE_AVG, PRO_ENDDATE
// FROM PROGRAM P JOIN REVIEW R ON P.PRO_NO = R.RE_PRO_NO JOIN TRAINER T ON PRO_TR_NO = T.TR_NO JOIN CALENDAR C ON PRO_NO = C.CAL_PRO_NO
// GROUP BY RE_PRO_NO
// ORDER BY PRO_ENDDATE, PRO_NAME;
  
//재영작성완


//회창작성


//회창작성완


module.exports = router;