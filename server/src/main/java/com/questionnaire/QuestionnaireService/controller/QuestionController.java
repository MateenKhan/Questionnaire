package com.questionnaire.QuestionnaireService.controller;

import com.questionnaire.QuestionnaireService.model.Question;
import com.questionnaire.QuestionnaireService.model.User;
import com.questionnaire.QuestionnaireService.repository.QuestionRepository;
import com.questionnaire.QuestionnaireService.repository.UserRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Optional;

@RestController
@Transactional
public class QuestionController {

    public QuestionController(QuestionRepository questionRepository){
        this.questionRepository= questionRepository;
    }

    private QuestionRepository questionRepository;

    @PostMapping("/questions")
    public Question create(@RequestBody Question question) {
        return questionRepository.save(question);
    }

    @PostMapping("/questions/multiple")
    public Iterable<Question> createAll(@RequestBody Iterable<Question> questions) {
        return questionRepository.saveAll(questions);
    }


    @GetMapping("/questions")
    public Iterable<Question> getAll(){
        return questionRepository.findAll();
    }

    @GetMapping("/questions/paginated/{userField}")
    public Iterable<Question> getAllByTpe(@RequestParam("page") int page, @RequestParam("size") int size, @PathVariable("userField") String userField){
        Pageable pageable  = PageRequest.of(page,size);
        return questionRepository.findByUserField(userField,pageable);
    }

    @GetMapping("/questions/{id}")
    public Optional<Question> getById(@PathVariable("id") int id) {
        return questionRepository.findById(id);
    }

    @DeleteMapping("/questions/{id}")
    public ResponseEntity deleteById(@PathVariable("id") int id) {
        questionRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/questions/multiple")
    public ResponseEntity deleteAll() {
        questionRepository.deleteAll();
        return ResponseEntity.ok().build();
    }


}
