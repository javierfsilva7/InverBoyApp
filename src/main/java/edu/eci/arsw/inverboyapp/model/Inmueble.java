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
public class Inmueble {
    public String seccion;
    public String numero;
    public String tipo;
    public String valor;

    public Inmueble(String seccion, String numero, String tipo, String valor) {
        this.seccion = seccion;
        this.numero = numero;
        this.tipo = tipo;
        this.valor=valor;
        
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
    
    
    
}
