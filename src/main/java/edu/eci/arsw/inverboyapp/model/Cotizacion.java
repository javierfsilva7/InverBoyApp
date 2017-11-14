/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.model;

/**
 *
 * @author javierfsilva7
 */

public class Cotizacion {
    
    public Usuario cliente;
    public Inmueble inmueble;
    public int id;

    public Cotizacion(Usuario cliente, Inmueble inmueble, int id) {
        this.cliente = cliente;
        this.inmueble = inmueble;
        this.id = id;
    }

    public Usuario getCliente() {
        return cliente;
    }

    public void setCliente(Usuario cliente) {
        this.cliente = cliente;
    }

    public Inmueble getInmueble() {
        return inmueble;
    }

    public void setInmueble(Inmueble inmueble) {
        this.inmueble = inmueble;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    
    
    
}
