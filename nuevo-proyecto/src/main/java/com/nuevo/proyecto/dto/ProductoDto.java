package com.nuevo.proyecto.dto;

public class ProductoDto {
    
    private Long _IdProducto;
    private String _NombreProducto;
    private String _DescripcionProducto;
    private String _ModeloProducto;
    private String _MarcaProducto;
    private int _TallaProducto;
    private String _ColorProducto;

    
    public ProductoDto() {
    }

    public ProductoDto(Long _IdProducto, String _NombreProducto, String _DescripcionProducto, String _ModeloProducto,
            String _MarcaProducto, int _TallaProducto, String _ColorProducto) {
        this._IdProducto = _IdProducto;
        this._NombreProducto = _NombreProducto;
        this._DescripcionProducto = _DescripcionProducto;
        this._ModeloProducto = _ModeloProducto;
        this._MarcaProducto = _MarcaProducto;
        this._TallaProducto = _TallaProducto;
        this._ColorProducto = _ColorProducto;
    }



    public Long get_IdProducto() {
        return _IdProducto;
    }
    public void set_IdProducto(Long _IdProducto) {
        this._IdProducto = _IdProducto;
    }
    public String get_NombreProducto() {
        return _NombreProducto;
    }
    public void set_NombreProducto(String _NombreProducto) {
        this._NombreProducto = _NombreProducto;
    }
    public String get_DescripcionProducto() {
        return _DescripcionProducto;
    }
    public void set_DescripcionProducto(String _DescripcionProducto) {
        this._DescripcionProducto = _DescripcionProducto;
    }
    public String get_ModeloProducto() {
        return _ModeloProducto;
    }
    public void set_ModeloProducto(String _ModeloProducto) {
        this._ModeloProducto = _ModeloProducto;
    }
    public String get_MarcaProducto() {
        return _MarcaProducto;
    }
    public void set_MarcaProducto(String _MarcaProducto) {
        this._MarcaProducto = _MarcaProducto;
    }
    public int get_TallaProducto() {
        return _TallaProducto;
    }
    public void set_TallaProducto(int _TallaProducto) {
        this._TallaProducto = _TallaProducto;
    }
    public String get_ColorProducto() {
        return _ColorProducto;
    }
    public void set_ColorProducto(String _ColorProducto) {
        this._ColorProducto = _ColorProducto;
    }
}
