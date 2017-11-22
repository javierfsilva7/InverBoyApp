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
import org.springframework.messaging.simp.user.UserSessionRegistry;

/**
 *
 * @author javierfsilva7
 */
@Service
public class RepositorioUsuariosStub implements RepositorioUsuarios{
    
    private static Map<String, Usuario> usersdb;
    
    static{
        usersdb=new ConcurrentHashMap<>();
        usersdb.put("3112681076", new Usuario("Isabel", "3112681076", "castellanos@gmail.com","cliente"));
        usersdb.put("3124448033", new Usuario("Javi", "3124448033", "castellanos@gmail.com", "asesor"));
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

    @Override
    public String getRolById(String id) throws PersistenceException {
        if (!usersdb.containsKey(id)){
            throw new PersistenceException("User not found:"+id);
        }
        else{
            return usersdb.get(id).getRol();
        }
        
    }
    
    @Override
    public void setUser(Usuario cliente) throws PersistenceException{
        usersdb.put(cliente.celular, cliente);
        
    }
    
    

    
}
