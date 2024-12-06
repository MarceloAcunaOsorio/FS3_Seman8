package com.nuevo.proyecto.Service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nuevo.proyecto.Model.Rol;

@Service
public interface RolService {
    
     public Optional<Rol> findByname(String name);
}
