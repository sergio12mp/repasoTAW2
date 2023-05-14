var initModels = require("../models/init-models");
const sequelize = require("sequelize");
var models = initModels(sequelize);

const controller = {};

// Listar administrador /////////////////////////////////////////////////////////////////////////////////////////////////////
controller.listarAdministradores = async function (req, res, next) {
    try {
        await models.ADMINISTRADOR
            .findAll()
            .then(async (data) => {

                // res.json(data);
                res.render("administradores", {administrador: data});
            });
    } catch (error) {
        res.send("Se ha producido un error " + error);
    }
};
// Editar administrador //////////////////////////////////////////////////////////////////////////////////////////////////////
controller.editarAdministrador = async function (req, res, next) {
    try {
        const administrador = await models.ADMINISTRADOR.findOne({
            where: {
                ADMIN_ID: req.params.id
            }
        });
        // const supermercados = await models.MICRO_MARKET.findAll();
        // const descuentos = await models.DISCOUNT_CODE.findAll();
        // res.render("cliente", {cliente: cliente, supermercados: supermercados, descuentos: descuentos});
        res.render("administrador", {administrador: administrador});
    } catch (error) {
        res.send("Se ha producido un error " + error);
    }
};

// Guardar administrador //////////////////////////////////////////////////////////////////////////////////////////////////////
controller.guardarAdministrador = async function (req, res, next) {
    try {
        if (typeof req.body.ADMIN_ID != "undefined") {
            const administrador = await models.ADMINISTRADOR.findOne({
                where: {
                    ADMIN_ID: req.body.ADMIN_ID
                }
            });

            if (administrador) {
                await administrador.update(
                    {
                        EMAIL: req.body.EMAIL,
                        PASSWORD: req.body.PASSWORD,

                    }
                );
            }

        } else {
            await models.ADMINISTRADOR.create(
                {
                    EMAIL: req.body.EMAIL,
                    PASSWORD: req.body.PASSWORD,

                }
            );
        }
        res.redirect('/administradores');

    } catch (error) {
        res.send("Se ha producido un error " + error);
    }
};
// Nuevo administrador //////////////////////////////////////////////////////////////////////////////////////////////////////
controller.nuevoAdministrador = async function (req, res, next) {
    res.render("newAdmin")
};

// Borrar administrador //////////////////////////////////////////////////////////////////////////////////////////////////////
controller.borrarAdministrador = async function (req, res, next) {
    const administrador = await models.ADMINISTRADOR.findOne({
        where: {
            ADMIN_ID: req.params.id
        }
    });
    await administrador.destroy();
    res.redirect("/administradores");

};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = controller;