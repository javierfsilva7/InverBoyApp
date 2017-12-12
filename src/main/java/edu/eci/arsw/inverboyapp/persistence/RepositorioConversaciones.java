/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.persistence;

import edu.eci.arsw.inverboyapp.model.Conversacion;
import edu.eci.arsw.inverboyapp.model.Sesion;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author javierfsilva7
 */
public interface RepositorioConversaciones extends MongoRepository<Conversacion, String>{

    public Conversacion findBy_id(int _id) throws PersistenceException;
    
}
