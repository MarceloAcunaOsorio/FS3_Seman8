package com.nuevo.proyecto.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@RequestMapping("/admin")
@CrossOrigin("http://localhost:4200")
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
    @PostMapping("/crearproducto")
    public Producto createProductoAdmin(@RequestBody Producto producto){
      return productoService.createProducto(producto);
    }

    //Actualizar actualizar
    @PutMapping("/actualizar/{id}")
    public Producto updateProductoAdmin(@PathVariable Long id, @RequestBody Producto producto){
        return productoService.updateProducto(id, producto);
    }

    //Eliminar producto

    @DeleteMapping("/eliminar/{id}")
    public void deleteProductoAdmin(@PathVariable Long id){
        productoService.deleteProducto(id);
    }

    //Listar producto

    @GetMapping("/listado")
    public List<Producto>getAllProductoadmin(){
        return productoService.getAllProductos();
    }

    //buscar producto

    @GetMapping("/{id}")
    public Optional<Producto>getProductoAdminById(@PathVariable Long id){
        return productoService.getProductoById(id);
    }


    @GetMapping("admin/home")
    public List<Producto>getAllProductosadmin(){
        return productoService.getAllProductos();
    }




    
    //Seccion de usuario
    @GetMapping("user/home")
    public List<Producto>getAllProductosUser(){
        return productoService.getAllProductos();
    }

    @GetMapping("/user/{id}")
    public Optional<Producto>getProductoById(@PathVariable Long id){
        return productoService.getProductoById(id);
    }

    @RequestMapping("/user")
    public String user() {
        return "Hola bienvenido User!";
    }
}
