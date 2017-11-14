/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.services;

import edu.eci.arsw.inverboyapp.persistence.RepositorioAsesores;
import edu.eci.arsw.inverboyapp.persistence.RepositorioCotizaciones;
import edu.eci.arsw.inverboyapp.persistence.RepositorioUsuarios;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author javierfsilva7
 */
@Service
public class Servicios {

    //cache con los datos volatiles del juego
    //@Autowired
    //GameStateCache cache;
    //repositorios (capa de persistencia)
    
    @Autowired
    RepositorioAsesores AsesoresRepositorio;
    
    @Autowired
    RepositorioUsuarios usuariosRepositorio;

    @Autowired
    RepositorioCotizaciones CotizacionesRepositorio;

}
