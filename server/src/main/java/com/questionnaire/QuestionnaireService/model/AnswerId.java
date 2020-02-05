package com.questionnaire.QuestionnaireService.model;


import java.io.Serializable;
import java.util.Objects;

public class AnswerId implements Serializable {

    private static final long serialVersionUID = -1798070786993154676L;

    private int questionId;
    private String userEmail;

    public AnswerId(){}

    public AnswerId(int questionId, String userEmail) {
        this.questionId = questionId;
        this.userEmail = userEmail;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AnswerId answerId = (AnswerId) o;
        return questionId == answerId.questionId &&
                Objects.equals(userEmail, answerId.userEmail);
    }

    @Override
    public int hashCode() {
        return Objects.hash(questionId, userEmail);
    }
}
