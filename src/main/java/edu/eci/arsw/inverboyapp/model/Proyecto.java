/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.model;

import java.util.concurrent.ConcurrentHashMap;

/**
 *
 * @author javierfsilva7
 */
public class Proyecto {
    public String nombre;
    public ConcurrentHashMap<String, Inmueble> inmuebles;
    public String direccion;
    public String tipo;

    public Proyecto(String nombre, ConcurrentHashMap<String, Inmueble> inmuebles, String direccion, String tipo) {
        this.nombre = nombre;
        this.inmuebles = inmuebles;
        this.direccion = direccion;
        this.tipo = tipo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public ConcurrentHashMap<String, Inmueble> getInmuebles() {
        return inmuebles;
    }

    public void setInmuebles(ConcurrentHashMap<String, Inmueble> inmuebles) {
        this.inmuebles = inmuebles;
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
