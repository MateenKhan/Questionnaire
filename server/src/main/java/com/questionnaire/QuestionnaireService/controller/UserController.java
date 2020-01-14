package com.questionnaire.QuestionnaireService.controller;

import com.questionnaire.QuestionnaireService.model.User;
import com.questionnaire.QuestionnaireService.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Optional;

@RestController
@Transactional
public class UserController {


    @Autowired
    UserRepository userRepository;

    @PostMapping("/users")
    public User create(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
    }

    @GetMapping("/users")
    public Iterable<User> getAll(){
        return userRepository.findAll();
    }

    @GetMapping("/users/{id}")
    public Optional<User> getById(@PathVariable("id") int id) {
        return userRepository.findById(id);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity deleteById(@PathVariable("id") int id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
