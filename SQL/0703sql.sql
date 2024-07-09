use bodytrue;

select * from user;
select * from img;

select * from trainer;	


INSERT INTO PROGRAM (pro_tr_no,PRO_NAME,PRO_STARTDATE,PRO_ENDDATE,PRO_COMMENT1,PRO_COMMENT2,PRO_TAG)values (1,'프로','2024-07-03','2024-07-17','설1','설2','4');

select pro_no from program where pro_name= '프로';

select * from program;

select * from img;

delete from program where pro_name = '프로';

select * from img where img_user_no = 1 and img_type = 0;
update img set img_path = "패스수정2" where img_user_no = 1 and img_type = 0;

insert into img (img_type,img_path,img_user_no) values(0,"패스",1);

insert into img (img_type,img_path,img_user_no) values(0,'1.jpg',1);

select * from user;

SELECT RE_NO,DATE_FORMAT(RE_DATE,"%y-%m-%d") as RE_DATE ,PRO_NAME,USER_NAME,TR_NAME 
FROM REVIEW R left JOIN PROGRAM P ON R.RE_PRO_NO = P.PRO_NO left JOIN USER U ON R.RE_USER_NO = U.USER_NO left JOIN TRAINER T ON R.RE_TR_NO = T.TR_NO;