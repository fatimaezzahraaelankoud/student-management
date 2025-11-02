package com.example.SpringMongoProject.Controller;
import com.example.SpringMongoProject.Entity.Student;
import com.example.SpringMongoProject.Service.StudentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/student")
public class StudentController {

    @Autowired
    private StudentServices studentServices;

    // Ajouter un etudiant
    @PostMapping("/save")
    public String saveStudent(@RequestBody Student student) {
        studentServices.saveOrUpdate(student);
        return student.get_id();
    }

    // Lister tous les etudiants
    @GetMapping("/getAll")
    public Iterable<Student> getStudents() {
        System.out.println("GET /getAll appelé !");
        return studentServices.listAll();
    }

    // Modifier un etudiant
    @PutMapping("/edit/{id}")
    public Student update(@RequestBody Student student, @PathVariable("id") String id) {
        student.set_id(id);
        studentServices.saveOrUpdate(student);
        return student;
    }

    // Supprimer un etudiant
    @DeleteMapping("/delete/{id}")
    public void deleteStudent(@PathVariable("id") String id) {
        studentServices.deleteStudent(id);
    }

    // Récupérer un etudiant precis par id
    @GetMapping("/{id}")
    public Student getStudent(@PathVariable("id") String id) {
        return studentServices.getStudentById(id);
    }
}

