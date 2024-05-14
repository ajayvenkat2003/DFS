package com.miniproject.miniproject.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberRequest {
    private Integer projectId;
    private  Boolean level;
    private Boolean city;
    private Boolean skills;
    private Integer exp;
}
