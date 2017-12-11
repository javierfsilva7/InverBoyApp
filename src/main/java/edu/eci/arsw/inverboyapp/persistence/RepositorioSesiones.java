/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.persistence;

import edu.eci.arsw.inverboyapp.model.Proyecto;
import edu.eci.arsw.inverboyapp.model.Sesion;
import edu.eci.arsw.inverboyapp.model.Usuario;
import java.util.List;
import java.util.Set;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author javierfsilva7
 */
public interface RepositorioSesiones extends MongoRepository<Sesion, Integer>{   

    public List<Sesion> findAll();    
    public Sesion findByid(int id) throws PersistenceException;
    public List<Sesion> findBycliente(Usuario cliente) throws PersistenceException;
    
}
