/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.model;

import java.util.ArrayList;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

/**
 *
 * @author javierfsilva7
 */
public abstract class Proyecto {
    public String nombre;
    public String direccion;
    public String tipo;
    public String logo;
    

    public Proyecto(String nombre, String direccion, String tipo, String logo) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.tipo = tipo;
        this.logo=logo;
        
        
    }
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

       
    
}
