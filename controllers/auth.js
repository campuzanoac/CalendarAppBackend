const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { crearToken } = require('../helpers/jwt');


const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email });

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya se encuentra registrado'
            })
        }
        
        usuario = new Usuario( req.body );

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        //Guarda en la BD
        await usuario.save();

        //Generar JWT aqui

        const token = await crearToken( usuario.id, usuario.name );

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
    })
    } catch (error) {

        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Por favor comuníquese con el administrador'
        })
    }
    
}

const loginUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email });

        if ( !usuario ) {
            return res.status(500).json({
                ok: false,
                msg: 'Usuario o contraseña inválidos'
            })
        }

        //Confirmar passwords
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña inválidos!'
            })
        }

        //Generar JWT aqui
        const token = await crearToken( usuario.id, usuario.name );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

        
    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Por favor comuníquese con el administrador'
        })
    }
}

const revalidarToken = async (req, res = response) => {

    const uid = req.uid;
    const name = req.name;

    //Crea un nuevo token
    const token = await crearToken( uid, name );

    res.json({
        ok: true,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}