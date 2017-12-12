/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.model;

import java.io.Serializable;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author javierfsilva7
 */
@Document(collection = "conversaciones")
public class Conversacion implements Serializable{
    @Id
    private String _id;
    private List<Mensaje> mensajes;

    public Conversacion(String _id, List<Mensaje> mensajes) {
        this._id = _id;
        this.mensajes = mensajes;
    }

    public Conversacion() {
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public List<Mensaje> getMensajes() {
        return mensajes;
    }

    public void setMensajes(List<Mensaje> mensajes) {
        this.mensajes = mensajes;
    }
    
    
}
