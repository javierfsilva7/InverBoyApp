/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.controllers;

import edu.eci.arsw.inverboyapp.model.Conversacion;
import edu.eci.arsw.inverboyapp.model.Proyecto;
import edu.eci.arsw.inverboyapp.model.Sesion;
import edu.eci.arsw.inverboyapp.services.InverboyServicesException;
import edu.eci.arsw.inverboyapp.services.Servicios;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author javierfsilva7
 */
@RestController
@RequestMapping("/conversaciones")
public class ConversacionesController {

    @Autowired
    Servicios services;

    @Autowired
    SimpMessagingTemplate msmt;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> getAllConversaciones() {
        try {
            return new ResponseEntity<>(services.getAllConversaciones(), HttpStatus.ACCEPTED);
        } catch (InverboyServicesException ex) {
            return new ResponseEntity<>(ex.getLocalizedMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(path = "/{sesion}", method = RequestMethod.GET)
    public ResponseEntity<?> getConversacionById(@PathVariable int sesion) {
        System.out.println(sesion);
        try {
            return new ResponseEntity<>(services.getConversacionById(sesion), HttpStatus.ACCEPTED);
        } catch (InverboyServicesException ex) {
            return new ResponseEntity<>(ex.getLocalizedMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> setConversacion(@RequestBody Conversacion conversacion) {
        try {
            services.setConversacion(conversacion);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (InverboyServicesException ex) {
            Logger.getLogger(SesionController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("No existe la sesion", HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<?> putConversacion(@RequestBody Conversacion conversacion) {
        try {
            Conversacion pr = services.setConversacion(conversacion);
            msmt.convertAndSend("/topic/chat." + conversacion.get_id(), pr);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (InverboyServicesException ex) {
            Logger.getLogger(SesionController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("No existe la sesion", HttpStatus.BAD_REQUEST);
        }
    }

}
