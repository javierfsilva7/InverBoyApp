/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.services;

import com.mongodb.DBObject;
import com.mongodb.util.JSON;
import edu.eci.arsw.inverboyapp.model.Cotizacion;
import edu.eci.arsw.inverboyapp.model.Inmueble;
import edu.eci.arsw.inverboyapp.model.Proyecto;
import edu.eci.arsw.inverboyapp.model.Sesion;
import edu.eci.arsw.inverboyapp.model.Usuario;
import edu.eci.arsw.inverboyapp.persistence.PersistenceException;
import edu.eci.arsw.inverboyapp.persistence.RepositorioCotizaciones;
import edu.eci.arsw.inverboyapp.persistence.RepositorioProyectos;
import edu.eci.arsw.inverboyapp.persistence.RepositorioSesiones;
import edu.eci.arsw.inverboyapp.persistence.RepositorioUsuarios;
import java.util.ArrayList;
import java.util.List;
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

    @Autowired
    RepositorioSesiones sesiones;

    public Usuario getUserById(String id) {
        return usuariosRepositorio.findBy_id(id);

    }

    public List<Usuario> getAllUsers() throws InverboyServicesException {
        return usuariosRepositorio.findAll();
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

    public Set<Inmueble> getInmueblesByProyecto(String proyecto) throws InverboyServicesException {

        try {
            return proyectos.getInmuelesByProyecto(proyecto);
        } catch (PersistenceException ex) {
            throw new InverboyServicesException("Error loading User Data:" + ex.getLocalizedMessage(), ex);
        }

    }

    public ArrayList<Inmueble> getInmueblesByTorre(String proyecto, int torre) throws InverboyServicesException {
        try {
            return proyectos.getInmuebleByTorre(proyecto, torre);
        } catch (PersistenceException ex) {
            throw new InverboyServicesException("Error loading User Data:" + ex.getLocalizedMessage(), ex);
        }
    }

    public void addCotizacion(Cotizacion cotizacion) throws InverboyServicesException {
        try {
            cotizaciones.setCotizacion(cotizacion);
        } catch (PersistenceException ex) {
            throw new InverboyServicesException("Error loading User Data:" + ex.getLocalizedMessage(), ex);
        }
    }

    public void addCliente(Usuario cliente) throws InverboyServicesException {
        usuariosRepositorio.save(cliente);
    }

    public Cotizacion getLastCotizadorByUser(String user) throws InverboyServicesException {
        try {
            return cotizaciones.getLastCotizadorByUser(user);
        } catch (PersistenceException ex) {
            throw new InverboyServicesException("Error loading Cotizador Data:" + ex.getLocalizedMessage(), ex);
        }
    }

    public List<Sesion> getAllSesiones() throws InverboyServicesException {
        return sesiones.findAll();
    }

    public Sesion getSesionById(int id) throws InverboyServicesException {
        try {
            return sesiones.findByid(id);
        } catch (PersistenceException ex) {
            throw new InverboyServicesException("Error loading Sesion Data:" + ex.getLocalizedMessage(), ex);
        }
    }

    public void setSesion(Sesion sesion) throws InverboyServicesException {
        sesion.setId(getAllSesiones().size()+1);
        sesiones.save(sesion);
    }

    /*
    public Sesion updateSesion(Sesion sesion) throws InverboyServicesException {
        try {
            return sesiones.updateSesion(sesion);
        } catch (PersistenceException ex) {
            throw new InverboyServicesException("Error loading User Data:" + ex.getLocalizedMessage(), ex);
        }
    }
     */
    public Sesion getLastSesionByUser(String user) throws InverboyServicesException {
        try {
            List<Sesion> ss = sesiones.findBycliente(usuariosRepositorio.findBy_id(user));
            return ss.get(ss.size() - 1);
        } catch (PersistenceException ex) {
            throw new InverboyServicesException("Error loading Cotizador Data:" + ex.getLocalizedMessage(), ex);
        }
    }

}
