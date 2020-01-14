insert into user (email, field, name, password) values ('anand@gmail.com','dev_ops','Anand','baigan');
insert into question (answers,hyper_link,question,question_type,user_field) values
            ('["10","20","18","16"]',null,'latest ubuntu version ?','plain','dev_ops'),
            ('["paint","memory cleaner","gcc","program"]',null,'what is kernel ?','plain','dev_ops');

insert into answer (answer,question_id,is_correct) values
                ('18',1, false),
                ('program',2,false);