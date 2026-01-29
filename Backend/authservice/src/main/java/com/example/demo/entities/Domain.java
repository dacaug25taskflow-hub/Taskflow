package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "domain")
public class Domain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int domain_id;

    @Column(nullable = false, unique = true)
    private String dname;

    public Domain() {
        super();
    }

    public Domain(String dname) {
        this.dname = dname;
    }

    public int getDid() {
        return domain_id;
    }

    public void setDid(int did) {
        this.domain_id = did;
    }

    public String getDname() {
        return dname;
    }

    public void setDname(String dname) {
        this.dname = dname;
    }
}