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

public class Cotizacion implements Serializable{
    
    public Usuario cliente;
    public Inmueble inmueble;
    public int id;
    public Usuario asesor;
    public String proyecto;
    public int ingresos;
    public int credito;
    public int subsidio;
    public int cesantias;
    public int ahorro;
    public int recpropios;
    public int numcuotas;
    public int cuotas;
    
    public  Cotizacion(){
    }

    public Cotizacion(Usuario cliente) {
        this.cliente = cliente;
    }

    public Cotizacion(Usuario cliente, Inmueble inmueble, int id, Usuario asesor) {
        this.cliente = cliente;
        this.inmueble = inmueble;
        this.id = id;
        this.asesor = asesor;
    }

    public Cotizacion(Usuario cliente, Inmueble inmueble, Usuario asesor, String proyecto, int ingresos, int credito, int subsidio, int cesantias, int ahorro, int recpropios, int numcuotas, int cuotas) {
        this.cliente = cliente;
        this.inmueble = inmueble;
        this.asesor = asesor;
        this.proyecto = proyecto;
        this.ingresos = ingresos;
        this.credito = credito;
        this.subsidio = subsidio;
        this.cesantias = cesantias;
        this.ahorro = ahorro;
        this.recpropios = recpropios;
        this.numcuotas = numcuotas;
        this.cuotas = cuotas;
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

    public Usuario getAsesor() {
        return asesor;
    }

    public void setAsesor(Usuario asesor) {
        this.asesor = asesor;
    }

    public String getProyecto() {
        return proyecto;
    }

    public void setProyecto(String proyecto) {
        this.proyecto = proyecto;
    }

    public int getIngresos() {
        return ingresos;
    }

    public void setIngresos(int ingresos) {
        this.ingresos = ingresos;
    }

    public int getCredito() {
        return credito;
    }

    public void setCredito(int credito) {
        this.credito = credito;
    }

    public int getSubsidio() {
        return subsidio;
    }

    public void setSubsidio(int subsidio) {
        this.subsidio = subsidio;
    }

    public int getCesantias() {
        return cesantias;
    }

    public void setCesantias(int cesantias) {
        this.cesantias = cesantias;
    }

    public int getAhorro() {
        return ahorro;
    }

    public void setAhorro(int ahorro) {
        this.ahorro = ahorro;
    }

    public int getRecpropios() {
        return recpropios;
    }

    public void setRecpropios(int recpropios) {
        this.recpropios = recpropios;
    }

    public int getNumcuotas() {
        return numcuotas;
    }

    public void setNumcuotas(int numcuotas) {
        this.numcuotas = numcuotas;
    }

    public int getCuotas() {
        return cuotas;
    }

    public void setCuotas(int cuotas) {
        this.cuotas = cuotas;
    }
    
    
    
    
}
