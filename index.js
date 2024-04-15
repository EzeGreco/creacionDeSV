var express = require("express"); //Tipo de servidor: Express
var bodyParser = require("body-parser"); //Convierte los JSON
const MySQL = require("./modulos/mysql.js");
var app = express(); //Inicializo express
var port = process.env.PORT || 3000; //Ejecuto el servidor en el puerto 3000

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.status(200).send({
    message: "GET Home route working fine!",
  });
});

/**
 * req = request. en este objeto voy a tener todo lo que reciba del cliente
 * res = response. Voy a responderle al cliente cambio de prueba pa
 */

app.get("/getAnimales", async function (req, res) {
  console.log(req.query); //Los pedidos get reciben los datos del req.query
  const respuesta = await MySQL.realizarQuery("SELECT * FROM Animales");
  console.log({ respuesta });
  res.send(respuesta);
});

app.get("/getNombreAnimales", async function (req, res) {
  console.log(req.query); //Los pedidos get reciben los datos del req.query
  const NombreAnimales = await MySQL.realizarQuery(
    "SELECT Nombre FROM Animales"
  );
  console.log({ respuesta });
  res.send(respuesta);
});

app.get("/getEspecies", async function (req, res) {
  console.log(req.query); //Los pedidos get reciben los datos del req.query
  const respuesta = await MySQL.realizarQuery("SELECT * FROM Especies");
  console.log({ respuesta });
  res.send(respuesta);
});

app.get("/getHabitats", async function (req, res) {
  console.log(req.query); //Los pedidos get reciben los datos del req.query
  const respuesta = await MySQL.realizarQuery("SELECT * FROM Habitats");
  console.log({ respuesta });
  res.send(respuesta);
});

app.get("/getZoologicos", async function (req, res) {
  console.log(req.query); //Los pedidos get reciben los datos del req.query
  const respuesta = await MySQL.realizarQuery("SELECT * FROM Zoologicos");
  console.log({ respuesta });
  res.send(respuesta);
});

app.post("/insertAnimales", async function (req, res) {
  console.log(req.body); //Los pedidos post reciben los datos del req.body

  await MySQL.realizarQuery(
    `INSERT INTO Animales(ID_Animales,  Nombre_cientifico,Nombre, Dato_curioso, genero, Embarazo, Edad) VALUES ('${req.body.ID_Animales}','${req.body.Nombre_cientifico}','${req.body.Nombre}','${req.body.Dato_curioso}','${req.body.genero}','${req.body.Embarazo}', '${req.body.Edad}')`
  );

  res.send("ok");
});

app.post("/insertEspecies", async function (req, res) {
  console.log(req.body); //Los pedidos post reciben los datos del req.body

  await MySQL.realizarQuery(
    `INSERT INTOEspecies(Nombre_cientifico, ID_habitat, Nombre_coloquial, Familia, Dieta, Domesticable, Vertebrado, Clasificacion) VALUES ('${req.body.Nombre_cientifico}','${req.body.ID_habitat}','${req.body.Nombre_coloquial}','${req.body.Familia}','${req.body.Dieta}','${req.body.Domesticable}','${req.body.Vertebrado}','${req.body.Clasificacion}')`
  );

  res.send("ok");
});

app.post("/insertHabitats", async function (req, res) {
  console.log(req.body); //Los pedidos post reciben los datos del req.body

  await MySQL.realizarQuery(
    `INSERT INTO Habitats(ID_habitat, Nombre_Zoologico, Clima, En_construccion, Shows) VALUES ('${req.body.Nombre}','${req.body.Fecha_fundacion}','${req.body.Visitantes_por_dia}','${req.body.Ingresos_por_dia}','${req.body.Shows}'`
  );

  res.send("ok");
});

app.post("/insertZoologicos", async function (req, res) {
  console.log(req.body); //Los pedidos post reciben los datos del req.body

  await MySQL.realizarQuery(
    `INSERT INTO Zoologicos(Nombre, Fecha_fundacion, Visitantes_por_dia, Ingresos_por_dia, Ciudad_residencia, Estacionamiento) VALUES ('${req.body.Nombre}','${req.body.Fecha_fundacion}','${req.body.Visitantes_por_dia}','${req.body.Ingresos_por_dia}','${req.body.Ciudad_residencia}','${req.body.Estacionamiento}')`
  );

  res.send("ok");
});

app.put('/putAnimales', async function(req, res){
  await MySql.realizarQuery(`UPDATE Animales SET Edad = '${req.body.Edad}' WHERE ID_Animales = '${req.body.ID_Animales}'`);
  res.send("ok");
})

app.put('/putZoologicos', async function(req, res){
  await MySql.realizarQuery(`UPDATE Zoologicos SET Estacionamiento = '${req.body.Estacionamiento}' WHERE Nombre = '${req.body.Nombre}'`);
  res.send("ok");
})

app.put('/putEspecies', async function(req, res){
  await MySql.realizarQuery(`UPDATE Especies SET Domesticable = '${req.body.Domesticable}' WHERE Nombre_cientifico = '${req.body.Nombre_cientifico}'`);
  res.send("ok");
})

app.put('/putHabitats', async function(req, res){
  await MySql.realizarQuery(`UPDATE Habitats SET Shows = '${req.body.Shows}' WHERE ID_habitat = '${req.body.ID_habitat}'`);
  res.send("ok");
})  

app.delete('/deleteZoologicos', async function(req, res){
  await MySql.realizarQuery(`DELETE FROM Zoologico WHERE Nombre = '${req.body.Nombre}'`);
  res.send("ok");
})

app.delete('/deleteHabitats', async function(req, res){
  await MySql.realizarQuery(`DELETE FROM Habitats WHERE ID_habitat = '${req.body.ID_habitat}'`);
  res.send("ok");
})

app.delete('/deleteEspecies', async function(req, res){
  await MySql.realizarQuery(`DELETE FROM Especies WHERE Nombre_cientifico = '${req.body.Nombre_cientifico}'`);
  res.send("ok");
})

app.delete('/deleteAnimales', async function(req, res){
  await MySql.realizarQuery(`DELETE FROM Animales WHERE ID_Animales = '${req.body.ID_Animales}'`);
  res.send("ok");
})
//Pongo el servidor a escuchar
app.listen(port, function () {
  console.log(`Server running in http://localhost:${port}`);
  console.log("Defined routes:");
  console.log("   [GET] http://localhost:3000/");
  console.log("   [GET] http://localhost:3000/getAnimales");
  console.log("   [GET] http://localhost:3000/getNombreAnimales");
  console.log("   [GET] http://localhost:3000/getEspecies");
  console.log("   [GET] http://localhost:3000/getHabitats");
  console.log("   [GET] http://localhost:3000/getZoologicos");
  console.log("   [POST] http://localhost:3000/insertZoologicos");
  console.log("   [POST] http://localhost:3000/insertHabitats");
  console.log("   [POST] http://localhost:3000/insertEspecies");
  console.log("   [POST] http://localhost:3000/insertAnimales");
  console.log("   [PUT] http://localhost:3000/putZoologicos");
  console.log("   [PUT] http://localhost:3000/putHabitats");
  console.log("   [PUT] http://localhost:3000/putEspecies");
  console.log("   [PUT] http://localhost:3000/putAnimales");
  console.log("   [DELETE] http://localhost:3000/deleteZoologicos");
  console.log("   [DELETE] http://localhost:3000/deleteHabitats");
  console.log("   [DELETE] http://localhost:3000/deleteEspecies");
  console.log("   [DELETE] http://localhost:3000/deleteAnimales");
});
