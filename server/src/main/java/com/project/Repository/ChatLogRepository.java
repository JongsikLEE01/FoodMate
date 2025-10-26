package com.project.repository;

import java.util.List; // List 임포트 추가
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.entity.ChatLog;

@Repository
public interface ChatLogRepository extends JpaRepository<ChatLog, Long>{
    // List<ChatLog>를 반환
    List<ChatLog> findByUserNum(Long userNum);
    
    // 만약 가장 최근의 1개만 필요할 경우
    Optional<ChatLog> findTopByUser(Long userNum);
}