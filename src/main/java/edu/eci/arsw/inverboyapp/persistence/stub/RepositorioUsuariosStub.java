/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.persistence.stub;

import edu.eci.arsw.inverboyapp.model.Usuario;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Service;
import edu.eci.arsw.inverboyapp.persistence.RepositorioUsuarios;
import edu.eci.arsw.inverboyapp.persistence.PersistenceException;

/**
 *
 * @author javierfsilva7
 */
@Service
public class RepositorioUsuariosStub implements RepositorioUsuarios{
    
    private static Map<String, Usuario> usersdb;
    
    static{
        usersdb=new ConcurrentHashMap<>();
        usersdb.put("3112681076", new Usuario("Javi", "3112681076", "castellanos@gmail.com"));
        usersdb.put("3145678954", new Usuario("Javi", "3145678954", "castellanos@gmail.com"));
        usersdb.put("3203451276", new Usuario("Javi", "3203451276", "castellanos@gmail.com"));
    }

    @Override
    public Usuario getUserByID(String id) throws PersistenceException {
        if (!usersdb.containsKey(id)){
            throw new PersistenceException("User not found:"+id);
        }
        else{
            return usersdb.get(id);
        }
    }

    @Override
    public Set<Usuario> getAllUsers() {
        return new LinkedHashSet<>(usersdb.values());
    }
    
}
