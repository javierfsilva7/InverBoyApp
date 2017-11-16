/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.model;

import java.util.ArrayList;
import java.util.Collection;

/**
 *
 * @author javierfsilva7
 */
public class ProyectoApartamentos extends Proyecto {

    public ArrayList<Inmueble> inmuebles = new ArrayList<>();
    public int torres;
    public int pisos;
    public String imp;

    public ProyectoApartamentos(String nombre, String direccion, String tipo, String logo, int pisos, int torres, String imp) {
        super(nombre, direccion, tipo, logo);
        this.pisos = pisos;
        this.torres = torres;
        this.imp = imp;
        crearInmuebles();
    }

    private void crearInmuebles() {

        for (int i = 1; i <= torres; i++) {
            for (int j = 1; j <= pisos; j++) {
                inmuebles.add(new Inmueble(i + "", j + "01", "B"));
                inmuebles.add(new Inmueble(i + "", j + "02", "A"));
                inmuebles.add(new Inmueble(i + "", j + "03", "A"));
                inmuebles.add(new Inmueble(i + "", j + "04", "B"));
            }
        }
    }

    public ArrayList<Inmueble> getInmuebles() {
        return inmuebles;
    }

    public void setInmuebles(ArrayList<Inmueble> inmuebles) {
        this.inmuebles = inmuebles;
    }

    public int getTorres() {
        return torres;
    }

    public void setTorres(int torres) {
        this.torres = torres;
    }

    public int getPisos() {
        return pisos;
    }

    public void setPisos(int pisos) {
        this.pisos = pisos;
    }

    public String getImp() {
        return imp;
    }

    public void setImp(String imp) {
        this.imp = imp;
    }

    public ArrayList<Inmueble> getInmueblesByTorre(int torre) {
        ArrayList<Inmueble> inm = new ArrayList<>();
        for (int i = 0; i < torres * pisos * 4; i++) {
            if (inmuebles.get(i).getSeccion().equals(torre + "")) {
                inm.add(inmuebles.get(i));
                System.out.println(inmuebles.get(i).getSeccion()+inmuebles.get(i).getNumero());
            }
        }
        return inm;
    }

}
