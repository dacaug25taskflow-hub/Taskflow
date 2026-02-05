package com.example.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "domain")
public class Domain {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "domain_id")
    private int domainId;
    @Column(name = "dname")
    private String dname;

    public int getDomainId() { return domainId; }
    public void setDomainId(int domainId) { this.domainId = domainId; }
    public String getDname() { return dname; }
    public void setDname(String dname) { this.dname = dname; }
}
