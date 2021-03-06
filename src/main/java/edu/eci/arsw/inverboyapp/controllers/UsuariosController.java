/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.controllers;

import edu.eci.arsw.inverboyapp.model.Sesion;
import edu.eci.arsw.inverboyapp.model.Usuario;
import edu.eci.arsw.inverboyapp.persistence.RepositorioUsuarios;
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
@RequestMapping("/usuarios")
public class UsuariosController {

    @Autowired
    Servicios services;

    @Autowired
    SimpMessagingTemplate msmt;

    
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> getAllUsers() {
        try {
            return new ResponseEntity<>(services.getAllUsers(), HttpStatus.ACCEPTED);
        } catch (InverboyServicesException ex) {
            return new ResponseEntity<>(ex.getLocalizedMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getUserById(@PathVariable String id) {
        System.out.println(id);
        return new ResponseEntity<>(services.getUserById(id), HttpStatus.ACCEPTED);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> setUsuario(@RequestBody Usuario usuario) {
        try {
            Usuario s = new Usuario(usuario.getId(), usuario.getNombre(), usuario.getCorreo(),usuario.getRol());
            services.addCliente(usuario);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (InverboyServicesException ex) {
            Logger.getLogger(SesionController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("No existe la sesion", HttpStatus.BAD_REQUEST);
        }
    }

}
