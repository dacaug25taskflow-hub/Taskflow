package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Domain;
import com.example.demo.repositories.DomainRepository;

@RestController
@RequestMapping("/domain")
@CrossOrigin(origins = "*")
public class DomainController {

    @Autowired
    private DomainRepository domainRepository;

    // CREATE domain
    @PostMapping("/save")
    public Domain saveDomain(@RequestBody Domain domain) {
        return domainRepository.save(domain);
    }

    // GET domain by id
    @GetMapping("/get/{id}")
    public Domain getDomainById(@PathVariable int id) {
        return domainRepository.findById(id).orElse(null);
    }

    // GET domain by name
    @GetMapping("/getbyname/{name}")
    public Domain getDomainByName(@PathVariable String name) {
        return domainRepository.findBydname(name).orElse(null);
    }

    // GET all domains
    @GetMapping("/all")
    public List<Domain> getAllDomains() {
        return domainRepository.findAll();
    }

    // DELETE domain
    @DeleteMapping("/delete/{id}")
    public String deleteDomain(@PathVariable int id) {
        domainRepository.deleteById(id);
        return "Domain deleted successfully";
    }
}