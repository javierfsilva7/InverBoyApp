/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.persistence.stub;

import edu.eci.arsw.inverboyapp.model.Inmueble;
import edu.eci.arsw.inverboyapp.model.Proyecto;
import edu.eci.arsw.inverboyapp.model.ProyectoApartamentos;
import edu.eci.arsw.inverboyapp.persistence.PersistenceException;
import edu.eci.arsw.inverboyapp.persistence.RepositorioProyectos;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Service;

/**
 *
 * @author javierfsilva7
 * 
 * 
 */

@Service
public class RepositorioProyectosStub implements RepositorioProyectos {
    
    private static Map<String, ProyectoApartamentos> proyectosdb;
        
    static{
        
        proyectosdb=new ConcurrentHashMap<>();
        proyectosdb.put("TierrAlta" , new ProyectoApartamentos("TierrAlta", "Carrera 9 este # 38-98", "VIS", "img/ta.png", 10, 9));
        proyectosdb.put("Monteverde", new ProyectoApartamentos("Monteverde", "Carrera 9 este # 38-98", "VIS", "img/mv.png", 12, 8));
        proyectosdb.put("MantaReal", new ProyectoApartamentos("MantaReal", "Carrera 9 este # 38-98", "VIS", "img/mr.png", 11, 13));
    }

    @Override
    public Proyecto getProyectoByName(String name) throws PersistenceException {
        if (!proyectosdb.containsKey(name)){
            throw new PersistenceException("User not found:"+name);
        }
        else{
            return proyectosdb.get(name);
        }
    }

    @Override
    public Set<Proyecto> getAllProyectos() throws PersistenceException {
    
        return new LinkedHashSet<>(proyectosdb.values());
    
    
    }

    @Override
    public Set<Inmueble> getInmuelesByProyecto(String proyecto) throws PersistenceException {
         if (!proyectosdb.containsKey(proyecto)){
            throw new PersistenceException("Proyect not found:"+proyecto);
        }
        else{
            return new HashSet<Inmueble> (proyectosdb.get(proyecto).getInmuebles());
        }
    }
    

}
