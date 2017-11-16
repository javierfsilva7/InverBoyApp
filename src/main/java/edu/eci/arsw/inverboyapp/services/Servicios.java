/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.services;

import edu.eci.arsw.inverboyapp.model.Cotizacion;
import edu.eci.arsw.inverboyapp.model.Inmueble;
import edu.eci.arsw.inverboyapp.model.Proyecto;
import edu.eci.arsw.inverboyapp.model.Usuario;
import edu.eci.arsw.inverboyapp.persistence.PersistenceException;
import edu.eci.arsw.inverboyapp.persistence.RepositorioCotizaciones;
import edu.eci.arsw.inverboyapp.persistence.RepositorioProyectos;
import edu.eci.arsw.inverboyapp.persistence.RepositorioUsuarios;
import java.util.ArrayList;
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

    @Autowired
    RepositorioProyectos proyectos;

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

    public Set<Proyecto> getAllProyectos() throws InverboyServicesException {
        try {
            return proyectos.getAllProyectos();
        } catch (PersistenceException ex) {
            throw new InverboyServicesException("Error loading User Data:" + ex.getLocalizedMessage(), ex);
        }
    }

    public Proyecto getProyectoByName(String name) throws InverboyServicesException {
        try {
            return proyectos.getProyectoByName(name);
        } catch (PersistenceException ex) {
            throw new InverboyServicesException("Error loading User Data:" + ex.getLocalizedMessage(), ex);
        }
    }
    
    public Set<Inmueble> getInmueblesByProyecto(String proyecto)throws InverboyServicesException{
    
        try {
            return proyectos.getInmuelesByProyecto(proyecto);
        } catch (PersistenceException ex) {
            throw new InverboyServicesException("Error loading User Data:" + ex.getLocalizedMessage(), ex);
        }
    
    }
    
    public ArrayList<Inmueble> getInmueblesByTorre(String proyecto, int torre) throws InverboyServicesException{
    try {
            return proyectos.getInmuebleByTorre(proyecto, torre);
        } catch (PersistenceException ex) {
            throw new InverboyServicesException("Error loading User Data:" + ex.getLocalizedMessage(), ex);
        }
    }

    public void addCotizacion(Cotizacion cotizacion) throws InverboyServicesException{
        try{
            cotizaciones.setCotizacion(cotizacion);            
        }catch(PersistenceException ex){        
            throw new InverboyServicesException("Error loading User Data:" + ex.getLocalizedMessage(), ex);
        }
    }
}
