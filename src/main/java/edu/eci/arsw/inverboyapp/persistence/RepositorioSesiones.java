/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.persistence;

import edu.eci.arsw.inverboyapp.model.Proyecto;
import edu.eci.arsw.inverboyapp.model.Sesion;
import java.util.Set;

/**
 *
 * @author javierfsilva7
 */
public interface RepositorioSesiones {   

    public Set<Sesion> getAllSesiones() throws PersistenceException;    
    public Sesion getSesionById(int id) throws PersistenceException;
    public void setSesion(Sesion sesion) throws PersistenceException;
    public Sesion getLastSesionByUser(String user) throws PersistenceException;
    public Sesion updateSesion(Sesion sesion) throws PersistenceException;
    
}
