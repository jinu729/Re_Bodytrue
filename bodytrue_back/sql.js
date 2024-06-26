module.exports = {
    join : `INSERT INTO USER (USER_EMAIL,USER_PWD,USER_NAME,USER_AUTH,USER_SEX,USER_ADDNO,USER_ADD1,USER_ADD2,USER_TEL) VALUES ("?","?","?","?","?","?","?","?","?");`,
    email_check : `SELECT * FROM USER WHERE USER_EMAIL = ?`,
    get_user_no : `SELECT USER_NO FROM USER WHERE USER_EMAIL = ?`,

//승호작성

    // login :,
    // id_find :
    // pw_find :
    // pw_tmp : 

    // admin_check : 

//승호작성완


//진우작성


//진우작성완


//은미작성
// pro_detail:`SELECT p.pro_comment1, p.pro_comment2, p.pro_comment3,p.pro_tag,p.pro_name,t.tr_name, ROUND(AVG(r.re_rate), 1) AS rate_avg
//             FROM program p
// LEFT JOIN 
//     review r ON p.pro_no = r.re_pro_no
// JOIN 
//     trainer t ON p.pro_tr_no = t.tr_no
// WHERE 
//     p.pro_no = ?
// GROUP BY 
//     p.pro_no;`,

pro_detail:`SELECT 
    p.pro_comment1, 
    p.pro_comment2, 
    p.pro_comment3,
    p.pro_tag,
    p.pro_name,
    p.pro_startdate,
    p.pro_enddate,
    p.pro_tr_no,
    t.tr_name,
    ROUND(AVG(r.re_rate), 1) AS rate_avg
FROM 
    program p
LEFT JOIN 
    review r ON p.pro_no = r.re_pro_no
JOIN 
    trainer t ON p.pro_tr_no = t.tr_no
WHERE 
    p.pro_no = ?
GROUP BY 
    p.pro_no;
    
    `

//은미작성완


//재영작성


//재영작성완


//회창작성


//회창작성완


    
}