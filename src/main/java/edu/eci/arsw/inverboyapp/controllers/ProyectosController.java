/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.controllers;

import edu.eci.arsw.inverboyapp.model.Inmueble;
import edu.eci.arsw.inverboyapp.model.Proyecto;
import edu.eci.arsw.inverboyapp.model.Sesion;
import edu.eci.arsw.inverboyapp.services.InverboyServicesException;
import edu.eci.arsw.inverboyapp.services.Servicios;
import java.util.ArrayList;
import java.util.List;
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
@RequestMapping("/proyectos")
public class ProyectosController {

    @Autowired
    Servicios services;
    
    @Autowired
    SimpMessagingTemplate msmt;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> getAllProyectos() {
        try {
            return new ResponseEntity<>(services.getAllProyectos(), HttpStatus.ACCEPTED);
        } catch (InverboyServicesException ex) {
            return new ResponseEntity<>(ex.getLocalizedMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(path = "/{proyecto}", method = RequestMethod.GET)
    public ResponseEntity<?> getProyectosByName(@PathVariable String proyecto) {
        System.out.println(proyecto);
        try {
            return new ResponseEntity<>(services.getProyectoByName(proyecto), HttpStatus.ACCEPTED);
        } catch (InverboyServicesException ex) {
            return new ResponseEntity<>(ex.getLocalizedMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<?> putProyecto(@RequestBody Proyecto proyecto) {
        try {
            services.updateProyecto(proyecto);
            return new ResponseEntity<>(HttpStatus.CREATED);

        } catch (InverboyServicesException ex) {
            Logger.getLogger(SesionController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("No existe la sesion", HttpStatus.BAD_REQUEST);
        }
    }

}
