USE questionnaire;

CREATE TABLE answer
  (
     question_id INTEGER NOT NULL auto_increment,
     user_email  VARCHAR(755) NOT NULL,
     answer      VARCHAR(755),
     is_correct  BOOLEAN NOT NULL,
     user_answer VARCHAR(755),
     PRIMARY KEY (question_id, user_email)
  );

CREATE TABLE question
  (
     id             INTEGER auto_increment,
     answers        MEDIUMTEXT,
     hyper_link     TEXT,
     question       MEDIUMTEXT,
     question_type  VARCHAR(255),
     user_field     VARCHAR(255),
     verify_details MEDIUMTEXT,
     PRIMARY KEY (id)
  );

CREATE TABLE user
  (
     email                                 VARCHAR(755) NOT NULL,
     band                                  VARCHAR(255),
     field                                 VARCHAR(255),
     login_at                              BIGINT,
     name                                  VARCHAR(255),
     password                              VARCHAR(255),
     questions_to_complete_time_in_seconds BIGINT,
     PRIMARY KEY (email)
  );

INSERT INTO user
            (email,
             field,
             name,
             password,
             band,
             questions_to_complete_time_in_seconds)
VALUES      ('anand@gmail.com',
             'dev_ops',
             'Anand',
             'baigan',
             'SSE',
             3600),
            ('asdf',
             'dev_ops',
             'asdf',
             'asdf',
             'SSE',
             3600);

INSERT INTO question
            (answers,
             hyper_link,
             question,
             question_type,
             user_field,
             verify_details)
VALUES      ('["10","20","18","16"]',
             NULL,
             'latest ubuntu version ?',
             'plain',
             'dev_ops',
             NULL),
            ('["paint","memory cleaner","gcc","program"]',
             NULL,
             'what is kernel ?',
             'plain',
             'dev_ops',
             NULL),
            (NULL,
             'http://3.84.163.197:3000/',
             'command to print hello word',
             'kernal',
             'dev_ops',
             '{"url":"http://3.84.163.197:8080/check","verb":"POST","body":{}}')
;

INSERT INTO answer
            (answer,
             user_email,
             question_id,
             is_correct)
VALUES      ('18',
             'anand@gmail.com',
             1,
             true),
            ('program',
             'anand@gmail.com',
             2,
             true);