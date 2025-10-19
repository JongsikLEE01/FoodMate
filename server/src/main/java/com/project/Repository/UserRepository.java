package com.project.Repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByKakaoId(String userId);
}
