package com.example.SpringMongoProject.Service;

import com.example.SpringMongoProject.Entity.Student;
import com.example.SpringMongoProject.Repo.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentServices {

    @Autowired
    private StudentRepository studentRepository;

    // Ajouter ou modifier un etudiant
    public void saveOrUpdate(Student student) {
        studentRepository.save(student);
    }

    // Lister tous les etudiants
    public Iterable<Student> listAll(){
        return studentRepository.findAll();
    }

    // Supprimer un etudiant
    public void deleteStudent(String id) {
        studentRepository.deleteById(id);
    }

    // Recuperer un etudiant par ID
    public Student getStudentById(String id) {
        Optional<Student> student = studentRepository.findById(id);
        return student.orElse(null);
    }
}

