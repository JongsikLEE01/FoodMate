package com.project.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "DIET_DATA")
@Getter
@NoArgsConstructor
public class DietData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "DATA_ID")
    private Long dataId;
    @Column(name = "DISEASE_NAME", unique = true, nullable = false)
    private String diseaseName;
    // @Column(name = "DATA_JSON", columnDefinition = "JSON", nullable = false)
    private String dataJson;
    @Column(name= "INS_DT")
    private LocalDateTime insDt;
    @Column(name= "UPD_DT")
    private LocalDateTime updDt;

    @PrePersist
    private void onCreate(){
        this.insDt = LocalDateTime.now();
        this.updDt = LocalDateTime.now();
    }

    @PreUpdate
    private void onUpdate(){
        this.updDt = LocalDateTime.now();
    }
}
