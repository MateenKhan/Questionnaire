package com.questionnaire.QuestionnaireService.model;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@Entity
public class User {

    private static final long serialVersionUID = -1798070786993154676L;

    @Id
    private String email;
    private String password;
    private String name;
    private String field;
    private Long loginAt;
    private String band;
    private Long questionsToCompleteTimeInSeconds;
}
