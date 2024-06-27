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


//진우작성완


//은미작성
//상품 상세 페이지
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

// router.post("/calendarin", function(request, response, next)=>{

// });


//은미작성완


//재영작성
router.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).json({ error: 'Error querying database' });
            return;
        }
        res.json(results);
    });
});

// 사용자 상세 정보 조회
router.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'SELECT * FROM users WHERE id = ?';

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).json({ error: 'Error querying database' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(results[0]);
    });
});


//재영작성완


//회창작성


//회창작성완


module.exports = router;