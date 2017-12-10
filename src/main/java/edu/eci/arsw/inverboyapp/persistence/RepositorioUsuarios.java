/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.persistence;

import edu.eci.arsw.inverboyapp.model.Usuario;
//import java.util.Set;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author javierfsilva7
 */
public interface RepositorioUsuarios extends MongoRepository<Usuario, String>{
    
public Usuario findBy_id(String _id);  
/*
public Set<Usuario> getAllUsers() throws PersistenceException;
public String getRolById(String id) throws PersistenceException;
public void setUser(Usuario cliente) throws PersistenceException;
*/
}
