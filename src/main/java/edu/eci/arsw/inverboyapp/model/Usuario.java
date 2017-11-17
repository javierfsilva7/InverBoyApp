/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.model;

import java.io.Serializable;

/**
 *
 * @author javierfsilva7
 */
public class Usuario implements Serializable{
    
    public String nombre; 
    public String celular;
    public String correo;
    public String rol;
    
    public Usuario(){
    }

    public Usuario(String nombre, String celular, String correo, String rol) {
        this.nombre = nombre;
        this.celular = celular;
        this.correo = correo;
        this.rol=rol;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
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
