package net.registerapi.api.rest.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Person")
public class Person {
    private long id;
    private String name;
    private String surname;
    private int dni;
    private String birthdate;
    private String gender;

    public Person(){

    }

    public Person(String name, String surname, int dni, String birthdate, String gender){
        this.name = name;
        this.surname = surname;
        this.dni = dni;
        this.birthdate = birthdate;
        this.gender = gender;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
        public long getId(){
        return id;
    }
    public void setId(long id){
        this.id = id;
    }
    @Column(name = "personName", nullable = false)
        public String getName(){
            return name;
        }

    public void setName(String name) {
        this.name = name;
    }
    @Column(name = "lastname", nullable = false)
    public String getSurname(){
        return surname;
    }
    public void setSurname(String surname){
        this.surname = surname;
    }

    @Column(name = "dni", unique = true, nullable = false)
    public int getDni(){
        return dni;
    }

    public void setDni(int dni) {
        this.dni = dni;
    }

    @Column(name = "personBirthdate", nullable = false)
    public String getBirthdate(){
        return birthdate;
    }

    public void setBirthdate(String birthdate){
        this.birthdate = birthdate;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
    @Override
    public String toString(){
        return " Person [id=" + id + ", personName=" + name + ", lastName=" + surname
                + ",dni=" + dni + ",birthdate=" + birthdate + ", gender" + gender + "]";
    }
}
