/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.services;

import edu.eci.arsw.inverboyapp.model.Cotizacion;
import edu.eci.arsw.inverboyapp.model.Usuario;
import edu.eci.arsw.inverboyapp.persistence.PersistenceException;
import edu.eci.arsw.inverboyapp.persistence.RepositorioCotizaciones;
import edu.eci.arsw.inverboyapp.persistence.RepositorioUsuarios;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author javierfsilva7
 */
@Service
public class Servicios {

    @Autowired
    RepositorioUsuarios usuariosRepositorio;
    
    @Autowired
    RepositorioCotizaciones cotizaciones;

    

    public Usuario getUserById(String id) throws InverboyServicesException {
        try {
            return usuariosRepositorio.getUserByID(id);
        } catch (PersistenceException ex) {
            throw new InverboyServicesException("Error loading User Data:" + ex.getLocalizedMessage(), ex);
        }
    }

    public Set<Usuario> getAllUsers() throws InverboyServicesException {
        try {
            return usuariosRepositorio.getAllUsers();
        } catch (PersistenceException ex) {
            throw new InverboyServicesException("Error loading User Data:" + ex.getLocalizedMessage(), ex);
        }
    }
    
    public Set<Cotizacion> getAllCotizadores() throws InverboyServicesException {
        try {
            return cotizaciones.getAllCotizaciones();
        } catch (PersistenceException ex) {
            throw new InverboyServicesException("Error loading User Data:" + ex.getLocalizedMessage(), ex);
        }
    }

    public Cotizacion getCotizadorById(int id) throws InverboyServicesException {
        try {
            return cotizaciones.getCotizadorByID(id);
        } catch (PersistenceException ex) {
            throw new InverboyServicesException("Error loading User Data:" + ex.getLocalizedMessage(), ex);
        }
    }
}
