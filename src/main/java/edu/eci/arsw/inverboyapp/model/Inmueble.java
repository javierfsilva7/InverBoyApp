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

public class Inmueble implements Serializable{
    public String _id;
    public String seccion;
    public String numero;
    public String tipo;
    public String valor;
    public String estado;

    public Inmueble(String seccion, String numero, String tipo, String valor) {
        this.seccion = seccion;
        this.numero = numero;
        this.tipo = tipo;
        this.valor=valor;
        
    }

    public Inmueble(String _id, String seccion, String numero, String tipo, String valor, String estado) {
        this._id = _id;
        this.seccion = seccion;
        this.numero = numero;
        this.tipo = tipo;
        this.valor = valor;
        this.estado = estado;
    }
    

    public Inmueble() {
    }

    public String getId() {
        return _id;
    }

    public void setId(String id) {
        this._id = id;
    }
    

    public String getSeccion() {
        return seccion;
    }

    public void setSeccion(String seccion) {
        this.seccion = seccion;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getValor() {
        return valor;
    }

    public void setValor(String valor) {
        this.valor = valor;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
    
    
    
}
