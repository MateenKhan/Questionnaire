package com.questionnaire.QuestionnaireService.repository;


import com.questionnaire.QuestionnaireService.model.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer, Integer> {


}