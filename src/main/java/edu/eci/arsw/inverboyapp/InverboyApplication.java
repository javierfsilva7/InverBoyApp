/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.inverboyapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 *
 * @author javierfsilva7
 */
@SpringBootApplication
@ComponentScan(basePackages = "edu.eci.arsw.inverboyapp")
public class InverboyApplication {

    public static void main(String[] args) {
        SpringApplication.run(InverboyApplication.class, args);
    }
}
