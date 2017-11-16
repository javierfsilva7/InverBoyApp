/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.persistence;

import edu.eci.arsw.inverboyapp.model.Cotizacion;
import edu.eci.arsw.inverboyapp.model.Usuario;
import java.util.Set;

/**
 *
 * @author javierfsilva7
 */
public interface RepositorioCotizaciones {
     public Cotizacion getCotizadorByID(Integer id) throws PersistenceException;
     public Set<Cotizacion> getAllCotizaciones() throws PersistenceException;
    public void setCotizacion(Cotizacion cotizacion) throws PersistenceException;
}
