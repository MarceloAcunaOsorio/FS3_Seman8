package com.nuevo.proyecto.Service;


import java.util.List;
import java.util.Optional;

import com.nuevo.proyecto.Model.Producto;

public interface ProductoService {
    
    //listar producto
    List<Producto> getAllProductos();

    //buscar producto por id
    Optional<Producto> getProductoById(Long _IdProducto);
 
    //metodo para actualizar, crear y eliminar
    Producto createProducto(Producto _IdProducto);
    Producto updateProducto(Long _IdProducto, Producto producto);
    void deleteProducto(Long _IdProducto);
}
