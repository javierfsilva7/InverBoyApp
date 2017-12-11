/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import java.io.Serializable;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author javierfsilva7
 */
@Document(collection = "proyectos")
public class Proyecto implements Serializable {
    @Id
    public String _id;
    public String direccion;
    public String tipo;
    public String logo;
    public List<Inmueble> inmuebles;
    public int torres;
    public int pisos;
    public String imp;

    public Proyecto(String _id, String direccion, String tipo, String logo) {
        this._id = _id;
        this.direccion = direccion;
        this.tipo = tipo;
        this.logo=logo;
        
        
    }

    public Proyecto(String _id, String direccion, String tipo, String logo, List<Inmueble> inmuebles, int torres, int pisos, String imp) {
        this._id = _id;
        this.direccion = direccion;
        this.tipo = tipo;
        this.logo = logo;
        this.inmuebles = inmuebles;
        this.torres = torres;
        this.pisos = pisos;
        this.imp = imp;
    }
    
    

    public Proyecto() {
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

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getId() {
        return _id;
    }

    public void setId(String _id) {
        this._id = _id;
    }

    public List<Inmueble> getInmuebles() {
        return inmuebles;
    }

    public void setInmuebles(List<Inmueble> inmuebles) {
        this.inmuebles = inmuebles;
    }

    public int getTorres() {
        return torres;
    }

    public void setTorres(int torres) {
        this.torres = torres;
    }

    public int getPisos() {
        return pisos;
    }

    public void setPisos(int pisos) {
        this.pisos = pisos;
    }

    public String getImp() {
        return imp;
    }

    public void setImp(String imp) {
        this.imp = imp;
    }

       
    
}
