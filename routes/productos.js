const { obtenerProductos, agregarProductos, actualizarProductos, borrarProductos } = require("../controllers/productosController")

const productosRoute = (app) => {
    app.get("/obtenerProductos", obtenerProductos)
    app.post("/agregarProductos", agregarProductos )
    app.put("/actualizarProductos", actualizarProductos)
    app.delete("/borrarProductos", borrarProductos)
}

module.exports = {
    productosRoute
}