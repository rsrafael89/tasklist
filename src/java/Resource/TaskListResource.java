/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Resource;

import Model.Task;
import java.util.ArrayList;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

/**
 * REST Web Service
 *
 * @author rafael
 */
@Path("tasklist")
public class TaskListResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of TaskListResource
     */
    public TaskListResource() {
    }

    /**
     * Retrieves representation of an instance of Resource.TaskListResource
     *
     * @return an instance of java.lang.String
     */
    @GET
    @Path("getTasks")
    @Produces(MediaType.APPLICATION_JSON)
    public ArrayList<Task> getTasks() {
        ArrayList<Task> tasks = new ArrayList<Task>();
        Task task = new Task();
        
       
        
        Data.Task data = new Data.Task();
        Data.Task dtask = new Data.Task(task.getId(), task.getDescription(), task.getStatus(), task.getDescription(),
                task.getCreationDate(), task.getDoneDate(), task.getUpdateDate(), null);

       /* EntityManager em = PersistenceManager.INSTANCE.getEntityManager();
        em.getTransaction().begin();
        em.persist(dtask);
        em.getTransaction().commit();
        em.close();
        PersistenceManager.INSTANCE.close();*/
        
        task.setId(dtask.getId());
        task.setTitle(task.getTitle());
        task.setDescription(task.getDescription());
        task.setStatus(task.getStatus());
        

        tasks.add(task);

        return tasks;
    }

    @POST
    @Path("save")
    @Produces(MediaType.APPLICATION_JSON)
    public void save(Task task) {
        
      /*  if (task.getId() > 0)
            editar();
        else
            criar();*/
        
        
        
    }

    @POST
    @Path("delete")
    @Produces(MediaType.APPLICATION_JSON)
    public void delete(int id) {

    }

}
