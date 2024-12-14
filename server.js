//npx sequelize-cli init

// crear base de datos 
// npx sequelize-cli db:create

// crear los modelos
// npx sequelize-cli model:generate --name user --attributes firstName:string,lastName:string,email:string
// npx sequelize-cli model:generate --name bootcamp --attributes title:string,cue:integer,descripcion:string

//ejecutar las migraciones.
// npx sequelize-cli db:migrate


const {sequelize} = require('./models');
const userController = require('./controllers/userController');
const bootcampController = require('./controllers/bootcampController');

async function main(){

    await sequelize.sync({force:true});

    // crear usuario
    const usuarioUno = await userController.createUser({firstName:'Mateo', lastName:'Diaz', email:'mateo.diaz@correo.com'});
    const usuarioDos = await userController.createUser({firstName:'Santiago', lastName:'Mejias', email:'santiago.mejias@correo.com'});
    const usuarioTres = await userController.createUser({firstName:'Lucas', lastName:'Rojas', email:'lucas.rojas@correo.com'});
    const usuarioCuatro = await userController.createUser({firstName:'Facundo', lastName:'Fernandez', email:'facundo.fernandez@correo.com'});

    // crear bootcamp
    const bootcampUno = await bootcampController.createBootcamp({title:'Introduciendo El Bootcamp de React', cue:'10', descripcion:'React es la librería más usada en JavaScript para el desarrollo de interfaces.'});
    const bootcampDos = await bootcampController.createBootcamp({title:'Bootcamp Desarrollo Web Full Stack', cue:'12', descripcion:'Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares, como: JavaScript, NodeJS, Angular, MongoDB, ExpressJS'});
    const bootcampTres = await bootcampController.createBootcamp({title:'Bootcamp Big Data, Inteligencia Artificial & Machine Learning', cue:'18', descripcion:'Domina Data Science y todo el ecosistema de lenguajes y herramientas de Big Data e intégralos con modelos avanzados de Artificial Intelligence y Machine Learning'});

    // realizar asociaciones
    await bootcampUno.addUser(usuarioUno);
    await bootcampUno.addUser(usuarioDos);
    await bootcampDos.addUser(usuarioUno);
    await bootcampTres.addUser(usuarioUno);
    await bootcampTres.addUser(usuarioDos);
    await bootcampTres.addUser(usuarioTres);


    // bootcamp por id con usuarios
    const bootcampId = await bootcampController.findById(2);
    console.log("bootcamp por id")
    console.log(JSON.stringify(bootcampId, null, 2));

    // Obtener todos los bootcamp con usuarios
    const bootcamp = await bootcampController.findAll();
    console.log("Lista de todos los bootcamps")
    console.log(JSON.stringify(bootcamp, null, 2));

    // obtener usuario por id incluyendo bootcamp
    const usuario = await userController.findById(3);
    console.log("Usuario por id y sus bootcamp");
    console.log(JSON.stringify(usuario, null, 2));

    // listar usuario con sus bootcamps
    const totalUsuarios = await userController.findAll();
    console.log("Lista de usuarios:");
    console.log(JSON.stringify(totalUsuarios, null, 2)); 

    // actualizar usuario por id
    const nuevoUsuario = await userController.updateUserById(4, {firstName:'Miguel'});
    console.log("Usuario actualizado");
    console.log(JSON.stringify(nuevoUsuario, null, 2));

    // Eliminar usuario por id
    await userController.deleteUserById(4);
    const usuariosPostDelete = await userController.findAll();
    console.log("Lista de usuarios actualizada post delete");
    console.log(JSON.stringify(usuariosPostDelete, null, 2));


}

main();