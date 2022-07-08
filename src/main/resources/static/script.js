const register = async () => {
    //grabbing html elements 
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const birthdate = document.getElementById("birthdate").value;
    const gender = document.getElementById("gender").value;
    const dni = document.getElementById("dni").value;
    //declaring data as an object
    const data = {
        name: name,
        surname: surname,
        birthdate: birthdate,
        gender: gender,
        dni: dni,
    };
    //we save our response in
    const response = await fetch("/api/register", {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const json = await response.json();

    const registerResponse = document.getElementById("registerResponse");

    if (json.error) {
        registerResponse.innerHTML = json.error;

        return;
    }

    registerResponse.innerHTML = "Persona registrada con éxito";
};

const changeGender = async () => {
    const dniChange = document.getElementById("dniChange").value;
    const newGender = document.getElementById("newGender").value;

    const data = {
        dni: dniChange,
        gender: newGender,
    };

    const response = await fetch("/api/update", {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const json = await response.json();

    const changeGenderResponse = document.getElementById("changeGenderResponse");

    if (json.error) {
        changeGenderResponse.innerHTML = "No se pudo cambiar el género";
        return;
    }
    changeGenderResponse.innerHTML = "Género cambiado con éxito";
};

const findPerson = async () => {
    const dniFind = document.getElementById("dniFind").value;

    const data = {
        dni: dniFind,
    };
    const response = await fetch(
        "/api/findByDni/" + data.dni,
        {
            method: "get",
            headers: {
                Accept: "application/json"
            },
        }
    );

    const findPersonResponse = document.getElementById("findPersonResponse");

    try {
        const json = await response.json();
        const { name, surname, birthdate, gender, dni } = json;

        findPersonResponse.innerHTML = `<p>Persona encontrada con éxito</p><hr/>
        <p><b>Nombre:</b> ${name}</p>
        <p><b>Apellido:</b> ${surname}</p>
        <p><b>Fecha de nacimiento:</b> ${birthdate}</p> 
        <p><b>Género:</b> ${gender}</p>
        <p><b>DNI:</b> ${dni}</p>`;

    } catch (error) {
        findPersonResponse.innerHTML = "No se pudo encontrar la persona";
    }


};

const findAll = async () => {
    const surnameFind = document.getElementById("surnameFind").value;
    const data = {
        surname: surnameFind
    }
    const response = await fetch(
        "/api/findLikeSurname/" + data.surname,
        {
            method: "get",
            headers: {
                Accept: "application/json"
            },
        }
    );
    const json = await response.json();
    const findAllResponse = document.getElementById("findAllResponse");
    if (json.length == 0) {
        findAllResponse.innerHTML = "<p>No se encontraron coincidencias.</p>";
        return;
    }
    findAllResponse.innerHTML = `<p>${json.length} personas encontradas con éxito.</p><hr/>`;
    for (person in json) {
        const { name, surname, birthdate, gender, dni } = json[person];
        findAllResponse.innerHTML +=
            `<p><b>Nombre:</b> ${name}</p>
        <p><b>Apellido:</b> ${surname}</p>
        <p><b>Fecha de nacimiento:</b> ${birthdate}</p> 
        <p><b>Género:</b> ${gender}</p>
        <p><b>DNI:</b> ${dni}</p>
        <hr/>`;
    }
}

window.onload = () => {
    const registerForm = document.getElementById("registerForm");
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();
        register();
        registerForm.reset();
    });
    const changeGenderForm = document.getElementById("changeGenderForm");
    changeGenderForm.addEventListener("submit", (event) => {
        event.preventDefault();
        changeGender();
        changeGenderForm.reset();
    });
    const findPersonForm = document.getElementById("findPersonForm")
    findPersonForm.addEventListener("submit", (event) => {
        event.preventDefault();
        findPerson();
        findPersonForm.reset();
    });
    const findAllForm = document.getElementById("findAllForm")
    findAllForm.addEventListener("submit", (event) => {
        event.preventDefault();
        findAll();
        findAllForm.reset();
    });
};
