/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.persistence;

import edu.eci.arsw.inverboyapp.model.Usuario;
import java.util.Set;

/**
 *
 * @author javierfsilva7
 */
public interface RepositorioUsuarios {
    
public Usuario getUserByID(String id) throws PersistenceException;  
public Set<Usuario> getAllUsers() throws PersistenceException;
public String getRolById(String id) throws PersistenceException;
public void setUser(Usuario cliente) throws PersistenceException;

}
