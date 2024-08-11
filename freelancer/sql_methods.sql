create or replace function comment_increment (row_id int ,count int) 
returns void as
$$
  update posts
  set reply_count = reply_count + count
  where id = row_id
$$ 
language sql;