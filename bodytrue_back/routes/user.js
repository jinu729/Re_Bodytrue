const express = require('express');
const router = express.Router();
const db = require('../db.js');
const sql = require('../sql.js');

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

    //pro_no을 통해서 pro_detail 가져옴 
    db.query(sql.pro_detail,
        [pro_no], function(error, results, fields){
            if(error){
                console.error(error);
                return response.status(500).json({ error : '상품 정보 에러' });
            }
            response.json(results);
        }
    )
    
});

//은미작성완


//재영작성


//재영작성완


//회창작성


//회창작성완


module.exports = router;