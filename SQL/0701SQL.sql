use bodytrue;

select * from review;

select 
  p.pro_name, 
  t.tr_name, 
  date_format(r.re_date, '%y년 %m월 %d일 %h시') as re_date, 
  r.re_rate,
  c.cal_user_no
from 
  calendar c 
join 
  program p on c.cal_pro_no = p.pro_no 
join 
  trainer t on c.cal_tr_no = t.tr_no 
left join 
  review r on c.cal_pro_no = r.re_pro_no and c.cal_user_no = r.re_user_no 
where 
  c.cal_user_no = 3
  and r.re_rate is not null;
  -----
  select 
 count(re_no)
from 
  calendar c 
join 
  program p on c.cal_pro_no = p.pro_no 
join 
  trainer t on c.cal_tr_no = t.tr_no 
left join 
  review r on c.cal_pro_no = r.re_pro_no and c.cal_user_no = r.re_user_no;

select * from program;
  
INSERT INTO REVIEW (RE_COMMENT,RE_USER_NO,RE_PRO_NO,RE_TR_NO,RE_RATE)values("3번 회원의 1번프로그램의 리뷰입니다2.",3,1,2,2);
INSERT INTO REVIEW (RE_COMMENT,RE_USER_NO,RE_PRO_NO,RE_TR_NO,RE_RATE)values("3번 회원의 2번프로그램의 리뷰입니다2.",3,2,1,5);


delete from review where re_no = 3; 