/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.persistence;

import edu.eci.arsw.inverboyapp.model.Inmueble;
import edu.eci.arsw.inverboyapp.model.Proyecto;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author javierfsilva7
 */
public interface RepositorioProyectos extends MongoRepository<Proyecto, Integer> {

    public Proyecto findBy_id(String _id) throws PersistenceException;    
    public List<Inmueble> findInmueblesBy_id(String _id) throws PersistenceException;

}
