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
            cb(null, path.join(__dirname, '..', 'uploads'));
        },
        filename(req, file, cb) {
            console.log('Uploaded File:', file.originalname); // 업로드된 파일 이름 확인
            cb(null, file.originalname);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/upload_img', upload.single('img'), (request, response) => {
    setTimeout(() => {
        return response.status(200).json({
            message: 'success'
        });
    }, 0);
});

router.post('/createprogram/:tr_no', function (req, res) {
    const data = {
        tr_no: req.params.tr_no,
        pro_name: req.body.prcn_text,
        pro_add: req.body.address_text,
        pro_startdate: req.body.start_date,
        pro_enddate: req.body.end_date,
        pro_comment1: req.body.img_textarea1,
        pro_comment2: req.body.img_textarea2,
        pro_tag: req.body.tags,
        pro_img: req.body.pro_img,
        pro_img1: req.body.pro_img1,
        pro_img2: req.body.pro_img2,
        pro_imgprice: req.body.pro_imgprice
    };

    console.log(data);
    console.log('Dirname-------------------');
    console.log(__dirname);
    console.log('-------------------');

    try {
        // 이미지를 제외한 프로그램 정보 먼저 입력
        db.query(`INSERT INTO PROGRAM (pro_tr_no, pro_add1, PRO_NAME, PRO_STARTDATE, PRO_ENDDATE, PRO_COMMENT1, PRO_COMMENT2, PRO_TAG) values (?, ?, ?, ?, ?, ?, ?, ?);`, 
            [data.tr_no, data.pro_add, data.pro_name, data.pro_startdate, data.pro_enddate, data.pro_comment1, data.pro_comment2, data.pro_tag],
            function (error, results, fields) {
                if (error) {
                    return res.status(200).json({
                        message: 'fail'
                    });
                }

                try {
                    const pastDir0 = path.resolve(__dirname, '../uploads', data.pro_img);
                    const pastDir1 = path.resolve(__dirname, '../uploads', data.pro_img1);
                    const pastDir2 = path.resolve(__dirname, '../uploads', data.pro_img2);
                    const pastDir3 = path.resolve(__dirname, '../uploads', data.pro_imgprice);

                    console.log('pastDir-------------------');
                    console.log(pastDir0);
                    console.log(pastDir1);
                    console.log(pastDir2);
                    console.log(pastDir3);
                    console.log('-------------------');

                    const newDir = path.resolve(__dirname, '../uploads/program');
                    if (!fs.existsSync(newDir)) fs.mkdirSync(newDir);

                    const extension = path.extname(data.pro_img);
                    const extension1 = path.extname(data.pro_img1);
                    const extension2 = path.extname(data.pro_img2);
                    const extension3 = path.extname(data.pro_imgprice);

                    console.log('Extension-------------------');
                    console.log(extension);
                    console.log(extension1);
                    console.log(extension2);
                    console.log(extension3);
                    console.log('-------------------');

                    // 등록 상품의 번호 불러오기
                    db.query("select pro_no from program where pro_name = ?", [data.pro_name], function (error, results, fields) {
                        if (error) {
                            return res.status(200).json({
                                message: 'fail'
                            });
                        }

                        const filename = results[0].pro_no;
                        console.log('filename-------------------');
                        console.log(filename);
                        console.log('-------------------');

                        const renameFile = (oldPath, newPath, callback) => {
                            if (fs.existsSync(oldPath)) {
                                fs.rename(oldPath, newPath, (err) => {
                                    if (err) {
                                        console.error(err);
                                        callback(err);
                                    } else {
                                        console.log(`File moved from ${oldPath} to ${newPath}`);
                                        callback(null);
                                    }
                                });
                            } else {
                                console.error(`File not found: ${oldPath}`);
                                callback(`File not found: ${oldPath}`);
                            }
                        };

                        // 이미지 폴더 및 이름(상품번호-타입) 변경
                        renameFile(pastDir0, path.join(newDir, `${filename}-0${extension}`), (err) => {
                            if (err) {
                                console.error(err);
                                return res.status(500).json({
                                    message: 'Failed to move image file'
                                });
                            }

                            renameFile(pastDir1, path.join(newDir, `${filename}-1${extension1}`), (err) => {
                                if (err) {
                                    console.error(err);
                                    return res.status(500).json({
                                        message: 'Failed to move image file'
                                    });
                                }

                                renameFile(pastDir2, path.join(newDir, `${filename}-2${extension2}`), (err) => {
                                    if (err) {
                                        console.error(err);
                                        return res.status(500).json({
                                            message: 'Failed to move image file'
                                        });
                                    }

                                    renameFile(pastDir3, path.join(newDir, `${filename}-3${extension3}`), (err) => {
                                        if (err) {
                                            console.error(err);
                                            return res.status(500).json({
                                                message: 'Failed to move image file'
                                            });
                                        }

                                        // 모든 파일 변경 성공 시 DB에 데이터 입력
                                        db.query(`insert into img (img_type, img_path, img_pro_no) values (?, ?, ?)`, [0, `${filename}-0${extension}`, filename], function (error, results, fields) {
                                            if (error) {
                                                console.error(error);
                                                return res.status(500).json({
                                                    message: 'DB insertion failed'
                                                });
                                            }

                                            db.query(`insert into img (img_type, img_path, img_pro_no) values (?, ?, ?)`, [1, `${filename}-1${extension1}`, filename], function (error, results, fields) {
                                                if (error) {
                                                    console.error(error);
                                                    return res.status(500).json({
                                                        message: 'DB insertion failed'
                                                    });
                                                }

                                                db.query(`insert into img (img_type, img_path, img_pro_no) values (?, ?, ?)`, [2, `${filename}-2${extension2}`, filename], function (error, results, fields) {
                                                    if (error) {
                                                        console.error(error);
                                                        return res.status(500).json({
                                                            message: 'DB insertion failed'
                                                        });
                                                    }

                                                    db.query(`insert into img (img_type, img_path, img_pro_no) values (?, ?, ?)`, [3, `${filename}-3${extension3}`, filename], function (error, results, fields) {
                                                        if (error) {
                                                            console.error(error);
                                                            return res.status(500).json({
                                                                message: 'DB insertion failed'
                                                            });
                                                        }

                                                        // 모든 DB 삽입 작업이 완료되면 성공을 클라이언트에 응답
                                                        res.status(200).json({
                                                            message: 'success'
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });

                } catch (err) {
                    console.log(err);
                }
            });
    } catch {
        return res.status(200).json({
            message: 'DB_error'
        });
    }
});
//프로필사진 업로드용
router.post('/upload_Timg', upload.single('img'), (req, res) => {
    console.log('File Uploaded:', req.file); // 업로드된 파일 정보 확인

    const tr_no = req.body.tr_no;
    const img = req.file.filename;
    console.log("tr_no : ",tr_no);
    console.log("img : ",img);

    try {
        const pastDir = `${__dirname}` + `../../uploads/` + img

        console.log('pastDir-------------------');
        console.log(pastDir);
        console.log('-------------------');

        const newDir = `${__dirname}` + `../../uploads/trainer/`;
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
        fs.rename(pastDir, newDir + tr_no + '-0' + extension, (err) => {
            if (err) {
                throw err;
            }
        });
        try{
            db.query(`select count(*) as num from img where img_tr_no = ? and img_type = 0;`,
            [tr_no],
            function (error, results, fields){

                // console.log("results[0] : ",results[0]);
                // console.log("results[0].num === 0 : ",results[0].num === 0);

                if(results[0].num === 0){
                        db.query(`insert into img (img_type,img_path,img_tr_no) values(0,?,?);`,
                        [tr_no+'-0'+extension,tr_no],
                        function (error, results, fields){
                            if(error){
                                throw error;
                            }
                        })
                }else{
                    db.query(`update img set img_path = ? where img_tr_no = ? and img_type = 0;`,
                        [tr_no+'-0'+extension,tr_no],
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
        img  // 업로드된 파일명 반환
    });
});

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
        select tr_no, tr_name, tr_email, tr_tel
        from trainer t
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

//트레이너 프사
router.post('/getimg',function(request,response,next){
    const tr_no = request.body.tr_no;

    db.query(`select img_path from img where img_tr_no = ? and img_type = 0`,
        [tr_no], function(error, result, field){
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
//트레이너 정보수정


//승호작성완


//진우작성


//진우작성완


//은미작성


//은미작성완


//재영작성

//트레이너 정보 확인
router.post('/trainerupdate/:tr_no', function(request, response, next){
    const tr_no = request.params.tr_no;
    
    db.query(`select tr_name, tr_email, tr_tel, tr_sex from trainer where tr_no = ?`,
        [tr_no],
         function(error, result, field){
        if(error){
            console.error(error);
            return response.status(500).json({ error: '트레이너정보 에러'});
        }
        response.json(result);
        console.log(result);
    });
});

//트레이너 정보 수정하기
router.post('/updatetrainer', function(request, response, next){


    const tel = request.body.number1 + '-' + request.body.number2 + '-' + request.body.number3;
    const tr_no = request.body.tr_no;
    const tr_tel = request.body.tr_tel;
    const tr_add1 = request.body.tr_add1;
    const tr_add2 = request.body.tr_add2;
    const tr_addno = request.body.tr_addno;
    const tr_pwd = request.body.tr_pwd;
    
    console.log('Updating trainer with tr_no:', tr_no);

    db.query(`update trainer set tr_pwd = ?, tr_addno = ?, tr_add1 = ?, tr_add2 = ?, tr_tel = ?
where tr_no = ?;`,[tr_pwd, tr_addno, tr_add1, tr_add2, tr_tel, tr_no], function(error, result){
            
        if(error){
            console.error(error);
            return response.status(500).json({ error: '트레이너 정보 수정 중 오류' });
        }
        response.json(result);
        console.log(result);
    })
});

//재영작성완


//회창작성


//회창작성완


module.exports = router;