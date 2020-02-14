insert into user (email, field, name, password, band, questions_to_complete_time_in_seconds) values
('anand@gmail.com','dev_ops','Anand','baigan', 'SSE', 3600),
('asdf','dev_ops','asdf','asdf','SSE', 3600);
insert into question (answers,hyper_link,question,question_type,user_field,verify_details) values
            ('["10","20","18","16"]',null,'latest ubuntu version ?','plain','dev_ops', null),
            ('["paint","memory cleaner","gcc","program"]',null,'what is kernel ?','plain','dev_ops', null),
            (null,'http://3.84.163.197:3000/','command to print hello word','kernal','dev_ops', '{"url":"http://3.84.163.197:8080/check","verb":"POST","body":{}}');

insert into answer (answer,user_email,question_id,is_correct) values
                ('18','anand@gmail.com', 1, true),
                ('program','anand@gmail.com', 2,true);