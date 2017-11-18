/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.controllers;

import edu.eci.arsw.inverboyapp.model.Proyecto;
import edu.eci.arsw.inverboyapp.model.ProyectoApartamentos;
import edu.eci.arsw.inverboyapp.model.Sesion;
import edu.eci.arsw.inverboyapp.services.InverboyServicesException;
import edu.eci.arsw.inverboyapp.services.Servicios;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.logging.Level;
import java.util.logging.Logger;
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
@RequestMapping("/sesiones")
public class SesionController {
    
    @Autowired
    Servicios services;
    
    @Autowired
    SimpMessagingTemplate msmt;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> getAllSesiones() {
        try {
            return new ResponseEntity<>(services.getAllSesiones(), HttpStatus.ACCEPTED);
        } catch (InverboyServicesException ex) {
            return new ResponseEntity<>(ex.getLocalizedMessage(), HttpStatus.NOT_FOUND);
        }
    }
    
    @RequestMapping(path = "/{sesion}", method = RequestMethod.GET)
    public ResponseEntity<?> getProyectosByName(@PathVariable int sesion) {
        System.out.println(sesion);
        try {
            return new ResponseEntity<>(services.getSesionById(sesion), HttpStatus.ACCEPTED);
        } catch (InverboyServicesException ex) {
            return new ResponseEntity<>(ex.getLocalizedMessage(), HttpStatus.NOT_FOUND);
        }
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> setSesiones(@RequestBody Sesion sesion) {
        try {
            Sesion s = new Sesion(sesion.getCliente());
            services.setSesion(s);
            //LOG.log(Level.INFO, "Getting letter from client {0}:{1}", new Object[]{cotizacion.getId(), cotizacion.getCliente(), cotizacion.getInmueble()});
            //msmt.convertAndSend("/topic/wupdate." + gameid.toString(), tmp);

            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (InverboyServicesException ex) {
            Logger.getLogger(SesionController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("No existe el juego", HttpStatus.BAD_REQUEST);
        }
    }
    
    @RequestMapping(path = "/usuario/{usuario}", method = RequestMethod.GET)
    public ResponseEntity<?> getLastSesionByUser(@PathVariable String usuario) {
        try {
            return new ResponseEntity<>(services.getLastSesionByUser(usuario), HttpStatus.ACCEPTED);
        } catch (InverboyServicesException ex) {
            return new ResponseEntity<>(ex.getLocalizedMessage(), HttpStatus.NOT_FOUND);
        }
    }
    
    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<?> setProyectoBySesion(@RequestBody Sesion sesion) {
        try {
            System.out.println("PUT AAA SESION");
            Sesion pr = services.updateSesion(sesion);
            //ProyectoApartamentos apto = (ProyectoApartamentos) pr.getProyecto();
            //String res = '{"id":'+pr.getId()+', "username":'+pr.getCliente().getNombre()+',"proyectname":'+pr.getProyecto().getNombre()+', "logo": '+pr.getProyecto().getLogo()+', "torres":'+apto.getTorres()+'}';
            System.out.println(pr.getId()+" "+pr.getProyecto());
            msmt.convertAndSend("/topic/sesion." + sesion.getId(), pr);
           
            return new ResponseEntity<>(HttpStatus.CREATED);
            
        } catch (InverboyServicesException ex) {
            Logger.getLogger(SesionController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("No existe la sesion", HttpStatus.BAD_REQUEST);
        }
    }
}
