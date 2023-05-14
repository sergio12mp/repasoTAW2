const express = require("express");
const router = express.Router();

const clientesController = require('../controllers/clientes');
const productController = require('../controllers/product');
const adminController = require('../controllers/administrador');

router.get("/products", productController.listarProductos);
// router.get("/:id", clientesController.editarCliente);
router.get("/product/:id", productController.editarProducto);
router.post("/guardarProductos", productController.guardarProductos);
router.get("/borrarProductos/:id", productController.borrarProductos);
router.get("/newProduct", productController.nuevoProducto);

router.get("/administradores", adminController.listarAdministradores);
router.get("/administrador/:id", adminController.editarAdministrador);
router.post("/guardarAdministrador", adminController.guardarAdministrador);
router.get("/borrarAdministrador/:id", adminController.borrarAdministrador);
router.get("/newAdmin", adminController.nuevoAdministrador);
// router.post("/guardar", clientesController.guardarCliente);
// router.get("/borrar/:id", clientesController.borrarCliente);


module.exports = router;
