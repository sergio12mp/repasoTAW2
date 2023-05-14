var initModels = require("../models/init-models");
const sequelize = require("sequelize");
var models = initModels(sequelize);

const controller = {};

// Listar productos /////////////////////////////////////////////////////////////////////////////////////////////////////
controller.listarProductos = async function (req, res, next) {
    try {
        await models.PRODUCT
            .findAll()
            .then(async (data) => {

                //res.json(data);
                res.render("products", {productos: data});
            });
    } catch (error) {
        res.send("Se ha producido un error " + error);
    }
};
// Editar Producto //////////////////////////////////////////////////////////////////////////////////////////////////////
controller.editarProducto = async function (req, res, next) {
    try {
        const product = await models.PRODUCT.findOne({
            where: {
                PRODUCT_ID: req.params.id
            }
        });
        res.render("product", {producto: product});
        // const supermercados = await models.MICRO_MARKET.findAll();
        // const descuentos = await  models.DISCOUNT_CODE.findAll();
        // res.render("cliente", {cliente: cliente, supermercados: supermercados, descuentos: descuentos});

    } catch (error) {
        res.send("Se ha producido un error " + error);
    }
};

// Guardar producto //////////////////////////////////////////////////////////////////////////////////////////////////////
controller.guardarProductos = async function (req, res, next) {
    try {
        if (typeof req.body.PRODUCT_ID != "undefined") {
            const product = await models.PRODUCT.findOne({
                where: {
                    PRODUCT_ID: req.body.PRODUCT_ID
                }
            });

            if (product) {
                await product.update(
                    {
                        PURCHASE_CODE: req.body.PURCHASE_CODE,
                        PRODUCT_CODE: req.body.PRODUCT_CODE,
                        PURCHASE_COST: req.body.PURCHASE_COST,
                        QUANTITY_ON_HAND: req.body.QUANTITY_ON_HAND,
                        MARKUP: req.body.MARKUP,
                        AVAILABLE: req.body.AVAILABLE,
                        DESCRIPTION: req.body.DESCRIPTION,
                        MANUFACTURER_ID: req.body.MANUFACTURER_ID,

                    }
                );
            }

        } else {
            await models.PRODUCT.create(
                {
                    PURCHASE_CODE: req.body.PURCHASE_CODE,
                    PRODUCT_CODE: req.body.PRODUCT_CODE,
                    PURCHASE_COST: req.body.PURCHASE_COST,
                    QUANTITY_ON_HAND: req.body.QUANTITY_ON_HAND,
                    MARKUP: req.body.MARKUP,
                    AVAILABLE: req.body.AVAILABLE,
                    DESCRIPTION: req.body.DESCRIPTION,
                    MANUFACTURER_ID: req.body.MANUFACTURER_ID
                }
            );
        }
        res.redirect('/products');

    } catch (error) {
        res.send("Se ha producido un error " + error);
    }
};
// Nuevo cliente //////////////////////////////////////////////////////////////////////////////////////////////////////
controller.nuevoProducto = async function (req, res, next) {
    res.render("newProduct")
};

// Borrar producto //////////////////////////////////////////////////////////////////////////////////////////////////////
controller.borrarProductos = async function (req, res, next) {
    const product = await models.PRODUCT.findOne({
        where: {
            PRODUCT_ID: req.params.id
        }
    });
    await product.destroy();
    res.redirect("/products");

};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = controller;