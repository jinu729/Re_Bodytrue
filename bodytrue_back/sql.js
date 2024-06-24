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


//은미작성완


//재영작성


//재영작성완


//회창작성


//회창작성완


    
}