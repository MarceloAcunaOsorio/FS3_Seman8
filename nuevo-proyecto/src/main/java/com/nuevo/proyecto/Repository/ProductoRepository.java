package com.nuevo.proyecto.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nuevo.proyecto.Model.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto , Long>{
    
}
