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
public class Mensaje implements Serializable{
    private String remitente;
    private String mensaje;

    public Mensaje(String remitente, String mensaje) {
        this.remitente = remitente;
        this.mensaje = mensaje;
    }

    public Mensaje() {
    }

    public String getRemitente() {
        return remitente;
    }

    public void setRemitente(String remitente) {
        this.remitente = remitente;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
    
    
    
}
