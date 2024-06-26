select * from img;

update img set img_path = ("1번회원 리뷰사진 수정path") where img_user_no = 1 and img_type = 1; 

update img set img_user_no = 2 where img_no = 3; 

SELECT TR_NAME,TR_EMAIL,TR_TEL,img_path FROM TRAINER t join img i on t.tr_no = i.img_tr_no WHERE TR_NO = 1;

select * from user;