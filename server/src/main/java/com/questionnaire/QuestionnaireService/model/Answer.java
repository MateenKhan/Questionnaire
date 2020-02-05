package com.questionnaire.QuestionnaireService.model;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@Entity
@IdClass(AnswerId.class)
public class Answer {

    @Id
    private int questionId;
    private String answer;
    @Id
    private String userEmail;
    private String userAnswer;
    private boolean isCorrect;
}
