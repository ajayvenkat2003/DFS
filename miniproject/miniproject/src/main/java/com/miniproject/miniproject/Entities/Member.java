package com.miniproject.miniproject.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Member implements Comparable<Member>{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer mId;
    private String employeeId;
    private String firstName;
    private String lastName;
    private String dob;
    private String level;
    private String location;
    private Integer experience;
    private boolean status;
    private HashMap<String,Integer> skills;


    @Override
    public int compareTo(Member o) {
        if(LocalDate.parse(this.dob).isAfter(LocalDate.parse(o.getDob())))
            return 1;
        if(LocalDate.parse(this.dob).isBefore(LocalDate.parse(o.getDob())))
            return -1;
        if(LocalDate.parse(this.dob).isEqual(LocalDate.parse(o.getDob())))
            return ((Integer)this.skills.keySet().size()).compareTo(o.getSkills().keySet().size());
        return 0;
    }
}
