package com.questionnaire.QuestionnaireService.repository;


import com.questionnaire.QuestionnaireService.model.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface QuestionRepository extends PagingAndSortingRepository<Question, Integer> {

    Page<Question> findByUserField(String userField, Pageable pageable);

}