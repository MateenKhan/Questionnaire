package com.questionnaire.QuestionnaireService.model;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@Entity
public class Question {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String userField;
    @Lob
    private String answers;
    @Lob
    private String question;
    private String questionType;
    private String hyperLink;
}
