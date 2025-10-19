package com.project.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "DIET_DATA")
@Getter
@Setter
public class DietData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dataId;

    @Column(unique = true, nullable = false)
    private String diseaseName;

    @Column(columnDefinition = "json")
    private String dataJson;

    private LocalDateTime insDt;
    private LocalDateTime updDt;
}
