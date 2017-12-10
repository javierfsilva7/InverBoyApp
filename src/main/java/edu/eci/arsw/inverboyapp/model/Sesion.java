/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.model;

import java.io.Serializable;
import java.util.ArrayList;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author javierfsilva7
 */
@Document(collection = "sesiones")
public class Sesion implements Serializable{
    
    @Id
    public int id;
    public Usuario cliente;
    public Usuario asesor;
    public Cotizacion cotizacion;
    public String estado;
    public Proyecto proyecto;
    public Inmueble inmuebleSeleccionado;
    public int torreSeleccionada;
    
    public Sesion() {
    }

    public Sesion(Usuario cliente) {
        this.cliente = cliente;
    }

    public Sesion(int id, Usuario cliente, Usuario asesor, Cotizacion cotizacion, String estado,Proyecto proyecto) {
        this.id = id;
        this.cliente = cliente;
        this.asesor = asesor;
        this.cotizacion = cotizacion;
        this.estado = estado;
        this.proyecto=proyecto;
    }

    public Sesion(int id, Usuario cliente, Usuario asesor, Cotizacion cotizacion, String estado, Proyecto proyecto, Inmueble inmuebleSeleccionado, int torreSeleccionada) {
        this.id = id;
        this.cliente = cliente;
        this.asesor = asesor;
        this.cotizacion = cotizacion;
        this.estado = estado;
        this.proyecto = proyecto;
        this.inmuebleSeleccionado = inmuebleSeleccionado;
        this.torreSeleccionada = torreSeleccionada;
    }
        

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Usuario getCliente() {
        return cliente;
    }

    public void setCliente(Usuario cliente) {
        this.cliente = cliente;
    }

    public Usuario getAsesor() {
        return asesor;
    }

    public void setAsesor(Usuario asesor) {
        this.asesor = asesor;
    }

    public Cotizacion getCotizacion() {
        return cotizacion;
    }

    public void setCotizacion(Cotizacion cotizacion) {
        this.cotizacion = cotizacion;
    }

   
    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Proyecto getProyecto() {
        return proyecto;
    }

    public void setProyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
    }

    public Inmueble getInmuebleSeleccionado() {
        return inmuebleSeleccionado;
    }

    public void setInmuebleSeleccionado(Inmueble inmuebleSeleccionado) {
        this.inmuebleSeleccionado = inmuebleSeleccionado;
    }

    public int getTorreSeleccionada() {
        return torreSeleccionada;
    }

    public void setTorreSeleccionada(int torreSeleccionada) {
        this.torreSeleccionada = torreSeleccionada;
    }
    
    
    
}
