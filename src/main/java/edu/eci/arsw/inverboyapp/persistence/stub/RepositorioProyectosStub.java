/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.persistence.stub;

import edu.eci.arsw.inverboyapp.model.Inmueble;
import edu.eci.arsw.inverboyapp.model.Proyecto;
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
 
public class RepositorioProyectosStub implements RepositorioProyectos {

    private static Map<String, ProyectoApartamentos> proyectosdb;
    private static ArrayList<Inmueble> inmuebles;

    static {

        inmuebles = new ArrayList<>();
        inmuebles.add(new Inmueble("1", "101", "A", "79000000"));
        inmuebles.add(new Inmueble("1", "102", "A", "79000000"));
        inmuebles.add(new Inmueble("1", "103", "A", "79000000"));
        inmuebles.add(new Inmueble("1", "104", "A", "79000000"));
        inmuebles.add(new Inmueble("1", "201", "A", "79500000"));
        inmuebles.add(new Inmueble("1", "202", "A", "79500001"));
        inmuebles.add(new Inmueble("1", "203", "A", "79500002"));
        inmuebles.add(new Inmueble("1", "204", "A", "79500003"));
        inmuebles.add(new Inmueble("1", "301", "A", "80000000"));
        inmuebles.add(new Inmueble("1", "302", "A", "80000001"));
        inmuebles.add(new Inmueble("1", "303", "A", "80000002"));
        inmuebles.add(new Inmueble("1", "304", "A", "80000003"));
        inmuebles.add(new Inmueble("1", "401", "A", "80500000"));
        inmuebles.add(new Inmueble("1", "402", "A", "80500000"));
        inmuebles.add(new Inmueble("1", "403", "A", "80500000"));
        inmuebles.add(new Inmueble("1", "404", "A", "80500000"));
        inmuebles.add(new Inmueble("1", "501", "A", "81000000"));
        inmuebles.add(new Inmueble("1", "502", "A", "81000000"));
        inmuebles.add(new Inmueble("1", "503", "A", "81000000"));
        inmuebles.add(new Inmueble("1", "504", "A", "81000000"));
        inmuebles.add(new Inmueble("1", "601", "A", "81500000"));
        inmuebles.add(new Inmueble("1", "602", "A", "81500001"));
        inmuebles.add(new Inmueble("1", "603", "A", "81500002"));
        inmuebles.add(new Inmueble("1", "604", "A", "81500003"));
        inmuebles.add(new Inmueble("1", "701", "A", "82000000"));
        inmuebles.add(new Inmueble("1", "702", "A", "82000001"));
        inmuebles.add(new Inmueble("1", "703", "A", "82000002"));
        inmuebles.add(new Inmueble("1", "704", "A", "82000003"));
        inmuebles.add(new Inmueble("1", "801", "A", "82500000"));
        inmuebles.add(new Inmueble("1", "802", "A", "82500001"));
        inmuebles.add(new Inmueble("1", "803", "A", "82500002"));
        inmuebles.add(new Inmueble("1", "804", "A", "82500003"));
        inmuebles.add(new Inmueble("1", "901", "A", "83000000"));
        inmuebles.add(new Inmueble("1", "902", "A", "83000001"));
        inmuebles.add(new Inmueble("1", "903", "A", "83000002"));
        inmuebles.add(new Inmueble("1", "904", "A", "83000003"));
        inmuebles.add(new Inmueble("1", "1001", "A", "83500000"));
        inmuebles.add(new Inmueble("1", "1002", "A", "83500001"));
        inmuebles.add(new Inmueble("1", "1003", "A", "83500002"));
        inmuebles.add(new Inmueble("1", "1004", "A", "83500003"));
        inmuebles.add(new Inmueble("2", "102", "A", "79000000"));
        inmuebles.add(new Inmueble("2", "102", "A", "79000000"));
        inmuebles.add(new Inmueble("2", "103", "A", "79000000"));
        inmuebles.add(new Inmueble("2", "104", "A", "79000000"));
        inmuebles.add(new Inmueble("2", "201", "A", "79500000"));
        inmuebles.add(new Inmueble("2", "202", "A", "79500001"));
        inmuebles.add(new Inmueble("2", "203", "A", "79500002"));
        inmuebles.add(new Inmueble("2", "204", "A", "79500003"));
        inmuebles.add(new Inmueble("2", "301", "A", "80000000"));
        inmuebles.add(new Inmueble("2", "302", "A", "80000001"));
        inmuebles.add(new Inmueble("2", "303", "A", "80000002"));
        inmuebles.add(new Inmueble("2", "304", "A", "80000003"));
        inmuebles.add(new Inmueble("2", "401", "A", "80500000"));
        inmuebles.add(new Inmueble("2", "402", "A", "80500000"));
        inmuebles.add(new Inmueble("2", "403", "A", "80500000"));
        inmuebles.add(new Inmueble("2", "404", "A", "80500000"));
        inmuebles.add(new Inmueble("2", "501", "A", "81000000"));
        inmuebles.add(new Inmueble("2", "502", "A", "81000000"));
        inmuebles.add(new Inmueble("2", "503", "A", "81000000"));
        inmuebles.add(new Inmueble("2", "504", "A", "81000000"));
        inmuebles.add(new Inmueble("2", "601", "A", "81500000"));
        inmuebles.add(new Inmueble("2", "602", "A", "81500001"));
        inmuebles.add(new Inmueble("2", "603", "A", "81500002"));
        inmuebles.add(new Inmueble("2", "604", "A", "81500003"));
        inmuebles.add(new Inmueble("2", "701", "A", "82000000"));
        inmuebles.add(new Inmueble("2", "702", "A", "82000001"));
        inmuebles.add(new Inmueble("2", "703", "A", "82000002"));
        inmuebles.add(new Inmueble("2", "704", "A", "82000003"));
        inmuebles.add(new Inmueble("2", "801", "A", "82500000"));
        inmuebles.add(new Inmueble("2", "802", "A", "82500001"));
        inmuebles.add(new Inmueble("2", "803", "A", "82500002"));
        inmuebles.add(new Inmueble("2", "804", "A", "82500003"));
        inmuebles.add(new Inmueble("2", "901", "A", "83000000"));
        inmuebles.add(new Inmueble("2", "902", "A", "83000001"));
        inmuebles.add(new Inmueble("2", "903", "A", "83000002"));
        inmuebles.add(new Inmueble("2", "904", "A", "83000003"));
        inmuebles.add(new Inmueble("2", "1001", "A", "83500000"));
        inmuebles.add(new Inmueble("2", "1002", "A", "83500001"));
        inmuebles.add(new Inmueble("2", "1003", "A", "83500002"));
        inmuebles.add(new Inmueble("2", "1004", "A", "83500003"));

        proyectosdb = new ConcurrentHashMap<>();
        proyectosdb.put("TierrAlta", new ProyectoApartamentos("TierrAlta", "Carrera 9 este # 38-98", "VIS", "img/ta.png", 10, 2, "img/imp.jpg", inmuebles));
        proyectosdb.put("Monteverde", new ProyectoApartamentos("Monteverde", "Carrera 9 este # 38-98", "VIS", "img/mv.png", 10, 2, "img/imp.jpg", inmuebles));
        proyectosdb.put("MantaReal", new ProyectoApartamentos("MantaReal", "Carrera 9 este # 38-98", "VIS", "img/mr1.png", 10, 2, "img/imp.jpg", inmuebles));

    }

    @Override
    public Proyecto getProyectoByName(String name) throws PersistenceException {
        if (!proyectosdb.containsKey(name)) {
            throw new PersistenceException("User not found:" + name);
        } else {
            return proyectosdb.get(name);
        }
    }

    @Override
    public Set<Proyecto> getAllProyectos() throws PersistenceException {

        return new LinkedHashSet<>(proyectosdb.values());

    }

    @Override
    public Set<Inmueble> getInmuelesByProyecto(String proyecto) throws PersistenceException {
        if (!proyectosdb.containsKey(proyecto)) {
            throw new PersistenceException("Proyect not found:" + proyecto);
        } else {
            return new HashSet<Inmueble>(proyectosdb.get(proyecto).getInmuebles());
        }
    }

    @Override
    public ArrayList<Inmueble> getInmuebleByTorre(String proyecto, int torre) throws PersistenceException {
        if (!proyectosdb.containsKey(proyecto)) {
            throw new PersistenceException("Proyect not found:" + proyecto);
        } else {
            return proyectosdb.get(proyecto).getInmueblesByTorre(torre);
        }
    }

}
*/