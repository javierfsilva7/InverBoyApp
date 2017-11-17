/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.persistence.stub;

import edu.eci.arsw.inverboyapp.model.Cotizacion;
import edu.eci.arsw.inverboyapp.model.Inmueble;
import edu.eci.arsw.inverboyapp.model.Usuario;
import edu.eci.arsw.inverboyapp.persistence.PersistenceException;
import edu.eci.arsw.inverboyapp.persistence.RepositorioCotizaciones;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Service;

/**
 *
 * @author javierfsilva7
 */
@Service
public class RepositorioCotizacionesStub implements RepositorioCotizaciones{
    private static Map<Integer, Cotizacion> cotisdb;
    
    static{
        cotisdb=new ConcurrentHashMap<>();
        cotisdb.put(cotisdb.size()+1, new Cotizacion(new Usuario("Javi", "3112681076", "@mail", "cliente")));
        cotisdb.put(cotisdb.size()+1, new Cotizacion(new Usuario("Javi", "3112681076", "@mail", "cliente")));
    }

    @Override
    public Cotizacion getCotizadorByID(Integer id) throws PersistenceException {
        if (!cotisdb.containsKey(id)){
            throw new PersistenceException("User not found:"+id);
        }
        else{
            return cotisdb.get(id);
        }
    }

    @Override
    public Set<Cotizacion> getAllCotizaciones() {
        return new LinkedHashSet<>(cotisdb.values());
    }

    @Override
    public void setCotizacion(Cotizacion cotizacion) throws PersistenceException {
        cotizacion.setId(cotisdb.size()+1);
        cotisdb.put(cotisdb.size()+1, cotizacion);
    }
}
