package com.nuevo.proyecto.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nuevo.proyecto.Model.Producto;
import com.nuevo.proyecto.Service.ProductoService;


@RestController
@RequestMapping("/api/productos")
public class VerifyTokenController {
    
    @Autowired
    private ProductoService productoService;

    @RequestMapping("/token")
    public String token() {
        return "Hola si funciona el token de acceso!";
    }
    
    //Seccion de admin
    @RequestMapping("/admin")
    public String admin() {
        return "Hola bienvenido Admin!";
    }

    //Crear
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/crearproducto")
    public ResponseEntity<Producto> createProducto(@RequestBody Producto producto) {
    return new ResponseEntity<>(productoService.createProducto(producto), HttpStatus.CREATED);
  }
    
    /*public Producto createProductoAdmin(@RequestBody Producto producto){
      return productoService.createProducto(producto);
    }*/

    //Actualizar actualizar
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Producto> updateProducto(@PathVariable Long _idProducto, @RequestBody Producto producto) {
    return new ResponseEntity<>(productoService.updateProducto(_idProducto, producto), HttpStatus.OK);
}

    /*@PutMapping("/actualizar/{id}")
    public Producto updateProductoAdmin(@PathVariable Long id, @RequestBody Producto producto){
        return productoService.updateProducto(id, producto);
    }*/



    //Eliminar producto
  
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/eliminar/{_idProducto}")
    public ResponseEntity<Void> deleteProducto(@PathVariable Long _idProducto) {
        productoService.deleteProducto(_idProducto);
        return ResponseEntity.noContent().build();
    }
    /*@DeleteMapping("/eliminar/{id}")
    public void deleteProductoAdmin(@PathVariable Long id){
        productoService.deleteProducto(id);
    }*/



    //Listar producto
    
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/listado")
    public List<Producto>getAllProductoadmin(){
        return productoService.getAllProductos();
    }

    //buscar producto

    @GetMapping("/{id}")
    public Optional<Producto>getProductoAdminById(@PathVariable Long id){
        return productoService.getProductoById(id);
    }


    @GetMapping("/home")
    public List<Producto>getAllProductosadmin(){
        return productoService.getAllProductos();
    }


    @RequestMapping("/user")
    public String user() {
        return "Hola bienvenido User!";
    }
}
