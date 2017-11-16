/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.persistence;

import edu.eci.arsw.inverboyapp.model.Inmueble;
import edu.eci.arsw.inverboyapp.model.Proyecto;
import java.util.ArrayList;
import java.util.Set;

/**
 *
 * @author javierfsilva7
 */
public interface RepositorioProyectos {

    public Proyecto getProyectoByName(String name) throws PersistenceException;

    public Set<Proyecto> getAllProyectos() throws PersistenceException;

    public Set<Inmueble> getInmuelesByProyecto(String proyecto) throws PersistenceException;
    
    public ArrayList<Inmueble> getInmuebleByTorre(String proyecto, int torre) throws PersistenceException;

}
