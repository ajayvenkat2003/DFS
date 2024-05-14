package com.miniproject.miniproject.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Demand {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer pId;
    private String level;
    private String skills;
    private String pName;
    private String managerName;
    private String city;
    private boolean status;
    private double duration;
    private String date;


}
