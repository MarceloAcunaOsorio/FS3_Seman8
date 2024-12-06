package com.nuevo.proyecto.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nuevo.proyecto.Model.UserEntity;


@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long>{
    
    Optional<UserEntity> findByEmail(String email);
    Boolean existsByEmail(String email);
}
