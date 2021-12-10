const fs = require('fs');
const archivo = './db/data.json'

const getDataFromDB = () => {
    if (!fs.existsSync(archivo)) {
        return null;
    }

    const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
    const data = info ? JSON.parse(info) : [];
    return data;
}

const obtenerProductos = (req, res) => {
    const productos = getDataFromDB();
    res.json(productos);
}

const agregarProductos = (req, res) => {
    const productos = getDataFromDB();
    productos.push(req.body);
    fs.writeFileSync(archivo, JSON.stringify(productos));
    res.json({message:"Producto agregado correctamente"});
}
const actualizarProductos = (req, res) => {
    const productos = getDataFromDB();
    const productoIndex = productos.findIndex(producto => producto.nombre === req.query.nombreProducto);
    if (productoIndex !== -1) {
        productos.splice(productoIndex, 1, req.body);
        fs.writeFileSync(archivo, JSON.stringify(productos));
        res.json({message:"Producto actualizado correctamente"});
    }else{
        res.status(404).send("Producto no encontrado");
    }
    
}
const borrarProductos = (req,res) => {
    const productos = getDataFromDB();
    const productoIndex = productos.findIndex(producto => producto.nombre === req.query.nombreProducto);
    if (productoIndex !== -1) {
        productos.splice(productoIndex, 1, {...productos[productoIndex],estado: false });
        fs.writeFileSync(archivo, JSON.stringify(productos));
        res.json({message:"Producto eliminado correctamente"});
    }else{
        res.status(404).send("Producto no encontrado");
    }
}


module.exports = {
    agregarProductos,
    obtenerProductos,
    actualizarProductos,
    borrarProductos
}