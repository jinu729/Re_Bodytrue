module.exports = {
    join : `INSERT INTO USER (USER_EMAIL,USER_PWD,USER_NAME,USER_AUTH,USER_SEX,USER_ADDNO,USER_ADD1,USER_ADD2,USER_TEL) VALUES ("?","?","?","?","?","?","?","?","?");`,
    email_check : `SELECT * FROM USER WHERE USER_EMAIL = ?`,
    get_user_no : `SELECT USER_NO FROM USER WHERE USER_EMAIL = ?`,
    login :
    id_find :
    pw_find :
    pw_tmp : 

    admin_check : 
    
}