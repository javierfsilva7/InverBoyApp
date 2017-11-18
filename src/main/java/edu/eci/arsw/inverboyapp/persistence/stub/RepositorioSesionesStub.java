/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.persistence.stub;

import edu.eci.arsw.inverboyapp.model.Proyecto;
import edu.eci.arsw.inverboyapp.model.Sesion;
import edu.eci.arsw.inverboyapp.model.Usuario;
import edu.eci.arsw.inverboyapp.persistence.PersistenceException;
import edu.eci.arsw.inverboyapp.persistence.RepositorioSesiones;
import java.util.Iterator;
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
public class RepositorioSesionesStub implements RepositorioSesiones {

    private static ConcurrentHashMap<Integer, Sesion> sesionesdb;

    static {
        sesionesdb = new ConcurrentHashMap<>();
        sesionesdb.put(1, new Sesion(new Usuario("Javi", "3124448033", "@.com", "cliente")));
    }

    @Override
    public Set<Sesion> getAllSesiones() throws PersistenceException {
        return new LinkedHashSet<>(sesionesdb.values());
    }

    @Override
    public Sesion getSesionById(int id) throws PersistenceException {
        if (!sesionesdb.containsKey(id)) {
            throw new PersistenceException("User not found:" + id);
        } else {
            return sesionesdb.get(id);
        }
    }

    @Override
    public void setSesion(Sesion sesion) throws PersistenceException {
        sesion.setId(sesionesdb.size() + 1);
        sesionesdb.put(sesionesdb.size() + 1, sesion);
    }

    @Override
    public Sesion getLastSesionByUser(String user) throws PersistenceException {
        int id = 0;
        Iterator it = sesionesdb.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry e = (Map.Entry) it.next();
            if (sesionesdb.get(e.getKey()).getCliente().getCelular().equals(user)) {
                if (id < sesionesdb.get(e.getKey()).getId()) {
                    id = sesionesdb.get(e.getKey()).getId();
                }
            }
        }
        if (id == 0) {
            throw new PersistenceException("Cotizacion not found:" + id + "Usuario: " + user);
        } else {
            return sesionesdb.get(id);
        }
    }


    @Override
    public Sesion updateSesion(Sesion sesion) throws PersistenceException {
        if (!sesionesdb.containsKey(sesion.getId())) {
            throw new PersistenceException("User not found:" + sesion);
        } else {
            sesionesdb.replace(sesion.getId(), sesion);
            return sesionesdb.get(sesion.getId());
        }
    }

}
