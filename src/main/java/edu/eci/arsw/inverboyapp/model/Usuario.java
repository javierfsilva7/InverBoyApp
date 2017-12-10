/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.model;

import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author javierfsilva7
 */
@Document(collection = "usuarios")
public class Usuario implements Serializable {

    @Id
    public String _id;
    public String nombre;
    public String correo;
    public String rol;

    public Usuario() {
    }

    public Usuario(String _id, String nombre, String correo, String rol) {
        this._id = _id;
        this.nombre = nombre;
        this.correo = correo;
        this.rol = rol;
    }
    public String getId() {
        return _id;
    }

    public void setId(String _id) {
        this._id = _id;
    }
    
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getRol() {
        return rol;
    }


}
