package net.registerapi.api.rest.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import  net.registerapi.api.rest.model.Person;
import net.registerapi.api.rest.repository.PersonRepository;
@RestController
@RequestMapping("/api")
public class PersonController {
    @Autowired
    private PersonRepository personRepository;

    @PostMapping("/register")
    public Person createPerson(@RequestBody Person person){
        return personRepository.save(person);
    }

    @PostMapping("/update") //update gender
    public Person updatePerson(@RequestBody Person person){
        Person personInDb = personRepository.findByDni(person.getDni());
        
        person.setId(personInDb.getId());
        person.setName(personInDb.getName());
        person.setSurname(personInDb.getSurname());
        person.setBirthdate(personInDb.getBirthdate());

        return personRepository.save(person);
    }

    @GetMapping("/findByDni/{dni}")
    public Person findByDni(@PathVariable int dni){
        return personRepository.findByDni(dni);
    }

    @GetMapping("/findLikeSurname/{surname}")
    public List<Person> findLikeSurname(@PathVariable String surname){
        return personRepository.searchBySurnameStartsWithIgnoreCase(surname);
    }
}