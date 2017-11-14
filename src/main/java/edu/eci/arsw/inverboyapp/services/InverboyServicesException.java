/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp.services;

import edu.eci.arsw.inverboyapp.persistence.PersistenceException;

/**
 *
 * @author javierfsilva7
 */
public class InverboyServicesException extends Exception {

    public InverboyServicesException(String string, PersistenceException ex) {
    }
    
}
