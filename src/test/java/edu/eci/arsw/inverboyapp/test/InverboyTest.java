package edu.eci.arsw.inverboyapp.test;



import edu.eci.arsw.inverboyapp.services.Servicios;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(SpringRunner.class)
@SpringBootTest()
public class InverboyTest {

    @Autowired
    Servicios servicios;
    public InverboyTest() {
    }

    
    //RestaurantOrderServicesStub ros;

    
    @Test
    public void contextLoads() {
        
     
        Assert.assertEquals("pasoElTest", "a","a");
        
    }

}
