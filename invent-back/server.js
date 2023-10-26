var express = require('express');
var osprey = require("osprey")

const cors = require('cors');

var md5 = require('md5');

const https = require('https');

const fs = require('fs');

const options = {
    key: fs.readFileSync("./cert.key"),
    cert: fs.readFileSync("./cert.crt"),
};

// DB CONNECTION

var mysql = require("mysql");

var dbСonnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qqwweerr89",
    // database: "invent",
})



const corsOptions = {
    origin: 'http://localhost:4200/',
    optionsSuccessStatus: 200
}


const jwt = require('jwt-simple');

const secretKey = "miClaveSecreta";
const algorithm = "HS256";
const expire = 24 * 60 * 60 * 1000;





dbСonnection.connect(function (err) {
    if (err) {
        console.log("No se pudo conectar a la BD", err)
        return;
    }
    console.log("base de datos conectada");

    const dataSql = fs.readFileSync("./data.sql").toString();
    const dataArr = dataSql.toString().split(";");

    dataArr.forEach(query => {
        if (query) {

            query += ";";
            dbСonnection.query(query, error => {
                if (error) return console.log("Error creacion BD" + error);;

            });
        }
    });
    console.log("base de datos creada");


    var app = express();
    app.use("/", express.json({ strict: false }));



    app.all("/", function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
        res.header('Access-Control-Expose-Headers', 'Authorization'),
            res.setHeader("Authorization", "");
        next();
    });


    app.use(cors())



    osprey.loadFile("./api.raml").then(function (middleware) {
        app.use("/api/v1/", middleware);
        app.use(function (err, req, res, next) {
            console.log("Error");
            res.status(err.status).send("Error. " + req.method + " " + req.url + ": " + JSON.stringify(err));
        });



        app.get("/api/v1/packages", function (req, res) {
            dbСonnection.query("SELECT * FROM packages", function (error, products) {
                if (error) return res.status(500).send("Error foung packages");
                res.status(200).json(products)
                console.log(products);

            });
        });



        app.get("/api/v1/packages/:id", function (req, res) {
            var id = req.params.id;
            dbСonnection.query("SELECT * FROM packages WHERE id = ?", [id], function (error, producto) {
                if (error) return res.status(500).send("Error found package");

                res.status(200).json(producto[0]);
            });


        })


        app.delete("/api/v1/packages/:id", function (req, res) {
            var id = req.params.id;
            dbСonnection.query("DELETE FROM packages WHERE id = ?", [id], function (error, producto) {
                if (error) return res.status(500).send("Error delete package");

                res.status(200).json(producto[0]);
            });


        })

        app.post("/api/v1/packages", function (req, res) {
            // console.log(req.body);
            // var id = req.body.id;
            var package = req.body;
            var packageType;
            dbСonnection.query("SELECT * FROM tipos", function (error, types) {
                if (error) return res.status(500).send("Error al obtener tipos");

                types.forEach(element => {
                    if (package.weight > element.intmin && package.weight < element.intmax) {
                        packageType = element.name;
                    }
                });


                switch (packageType) {
                    case "Paquete ultra ligero":
                        package.price = parseInt(package.weight) * 5;
                        break;
                    case "Paquete ligero":
                        package.price = parseInt(package.weight) * 5 + 1;
                        break;
                    case "Paquete estándar":
                        package.price = parseInt(package.weight) * 10;
                        break;
                    case "Paquete pesado":
                        package.price = parseInt(package.weight) * 5 + parseInt(package.weight) + 75;
                        break;
                    case "Gran volumen":
                        package.price = (parseInt(package.weight) - 10) * 7.5 + 130 + parseInt(package.weight);
                        break;
                    default:
                        package.price = (parseInt(package.weight) - 10) * 7.5 + 130 + parseInt(package.weight);
                        break;
                }

                console.log("Price calculated: " + package.price);

                dbСonnection.query("SELECT * FROM codigos", function (error, codes) {
                    package.transport = "INVENT";
                    codes.forEach(element => {
                        if (element.code == package.postal.slice(0, 2)) {
                            package.transport = element.name;
                        }
                    });
                    console.log("Transport " + package.transport);
                    var sqlQuery = "INSERT INTO packages (address, postal, sender, recipient, weight, price, transport) VALUES (" + mysql.escape(package.address) + ", " + mysql.escape(package.postal) + ", " + mysql.escape(package.sender) + ", " + mysql.escape(package.recipient) + ", " + mysql.escape(package.weight) + ", " + mysql.escape(package.price) + ", " + mysql.escape(package.transport) + ")";
                    dbСonnection.query(sqlQuery, function (error, package) {
                        console.log(sqlQuery);
                        if (error) return res.status(500).send("Error al insertar package");
                        res.status(200).json(package);
                    });
                });
            });
        });


        app.get("/api/v1/types", function (req, res) {
            dbСonnection.query("SELECT * FROM tipos", function (error, products) {
                if (error) return res.status(500).send("Error al obtener tipos");
                res.status(200).json(products)
                console.log(products);

            });
        });

        app.get("/api/v1/codes", function (req, res) {
            dbСonnection.query("SELECT * FROM codigos", function (error, products) {
                if (error) return res.status(500).send("Error al obtener codigos");
                res.status(200).json(products)
                console.log(products);

            });
        });

        app.get("/api/v1/login", function (req, res) {
            dbСonnection.query("SELECT * FROM usuario", function (error, products) {
                if (error) return res.status(500).send("Error al obtener usuarios");
                res.status(200).json(products)
                console.log(products);

            });
        });


        app.post('/api/v1/login', function (req, res) {
            var email = req.body.email;
            var pass = req.body.pass;
            console.log("Login. User:", email, pass);
            var sqlQuery = "SELECT usu.id FROM usuario as usu WHERE usu.email = " + mysql.escape(email) + " and usu.pass = " + mysql.escape(pass)
            dbСonnection.query(sqlQuery, function (error, usuarioID) {
                if (error) return res.status(500).send("Error obteniendo usuarios");
                console.log("ID DE USUSARIO: ", usuarioID)
                userId = usuarioID[0];
                if (usuarioID.length == 0) {
                    return res.status(401).send("Error usuarios o contraseña");
                }

                console.log("Login ok. Id de usuario:", userId);
                var payload = {
                    iss: userId,
                    exp: Date.now() + expire
                };
                console.log("JWT payload:", payload);


                var token = jwt.encode(payload, secretKey, algorithm);
                console.log("JWT token:", token);



                res.setHeader("Authorization", token);


                res.status(200).json(token);

            });


        });


        app.get("/api/v1/usuarioRegistrado", function (req, res) {
            var token = req.headers['authorization'];
            var payload = jwt.decode(token, secretKey, algorithm);
            user = payload.iss.id;
            console.log('searching for user:' + req.user);
            dbСonnection.query("SELECT * FROM usuario as usu WHERE usu.id = ?", [user], function (error, usuario) {
                if (error) {

                    console.log(error);
                    return res.status(500).send("Error al obtener los usuario");
                }
                if (usuario.length == 0) return res.status(404).send("Usuario no encontrado");

                res.status(200).json(usuario[0]);
            });
        });


        app.use("/api/v1/", function (req, res, next) {
            var token = req.headers['authorization'];
            console.log(req.headers);
            console.log("token:" + token);
            if (!token) {
                res.status(403).json('Missing token');
                console.error("No se ha indicado token1");
                return;
            }

            var token2 = req.headers['authorization'];
            if (!token2) {
                res.status(403).json('Missing token');
                console.error("No se ha indicado token2");
                return;
            }


            var payload = jwt.decode(token, secretKey, algorithm);
            if (!payload || !payload.iss || !payload.exp) {
                console.error("Token error");
                return res.status(403).json("Token error");
            }

            var payloadBn = jwt.decode(token2, secretKey, algorithm);
            if (!payloadBn || !payloadBn.iss || !payloadBn.exp) {
                console.error("Token error");
                return res.status(403).json("Token error");
            }


            if (Date.now() > payload.exp) {
                console.error("Expired token");
                return res.status(403).json("Expired token");
            }


            req.user = payload.iss.id;
            req.count = payloadBn.iss.id;
            console.log("user:" + req.user);
            next();
        });





    }, function (err) { // se ha producido un error cargando el RAML
        console.log("Error cargando RAML: " + JSON.stringify(err));
    });









    app.listen(3000, function () {
        console.log("HTTP server started on port 3000", 3000);
    });

    https.createServer(options, app).listen(3001, () => {
        console.log(`HTTPS server started on port 3001`);
    });

})

