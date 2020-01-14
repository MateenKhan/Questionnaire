package com.questionnaire.QuestionnaireService.controller;

import com.questionnaire.QuestionnaireService.model.Answer;
import com.questionnaire.QuestionnaireService.model.User;
import com.questionnaire.QuestionnaireService.repository.AnswerRepository;
import com.questionnaire.QuestionnaireService.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Optional;

@RestController
@Transactional
public class AnswerController {

    public AnswerController(AnswerRepository answerRepository){
        this.answerRepository = answerRepository;
    }

    private AnswerRepository answerRepository;

    @PostMapping("/answers")
    public Answer create(@RequestBody Answer answer) {
        return answerRepository.save(answer);
    }

    @GetMapping("/answers")
    public Iterable<Answer> getAll(){
        return answerRepository.findAll();
    }

    @PostMapping("/answers/multiple")
    public Iterable<Answer> createAllAll(@RequestBody Iterable<Answer> answers){
        return answerRepository.saveAll(answers);
    }

    @GetMapping("/answers/{id}")
    public Optional<Answer> getById(@PathVariable("id") int id) {
        return answerRepository.findById(id);
    }

    @DeleteMapping("/answers/{id}")
    public ResponseEntity deleteById(@PathVariable("id") int id) {
        answerRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
