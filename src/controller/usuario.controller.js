const prisma = require('../data/prisma.js');

const cadastrarUsuario = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({
                erro: "Nome, email, e senha são obrigatórios."
            });
        }

        const emailExiste = await prisma.usuario.findUnique({
            where: { email }
        });

        if (emailExiste) {
            return res.status(400).json({
                erro: "Email já cadastrado."
            });
        }

        const novoUsuario = await prisma.usuario.create({
            data: {
                nome,
                email,
                senha
            }
        });

        res.status(201).json(novoUsuario).end();

    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: "Erro interno ao cadastrar usuário."
        });
    }
};

const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany();

        res.status(200).json(usuarios).end();

    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: "Erro interno ao listar usuários."
        });
    }
};

const buscarUsuarioPorId = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const usuario = await prisma.usuario.findUnique({
            where: { id }
        });

        if (!usuario) {
            return res.status(404).json({
                erro: "Usuário não encontrado."
            });
        }

        res.status(200).json(usuario).end();

    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: "Erro interno ao buscar usuário."
        });
    }
};

const atualizarUsuario = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { nome, email, idade, senha } = req.body;

        const usuarioExiste = await prisma.usuario.findUnique({
            where: { id }
        });

        if (!usuarioExiste) {
            return res.status(404).json({
                erro: "Usuário não encontrado."
            });
        }

        const usuarioAtualizado = await prisma.usuario.update({
            where: { id },
            data: {
                nome,
                email,
                senha
            }
        });

        res.status(200).json(usuarioAtualizado).end();

    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: "Erro interno ao atualizar usuário."
        });
    }
};

const deletarUsuario = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const usuarioExiste = await prisma.usuario.findUnique({
            where: { id }
        });

        if (!usuarioExiste) {
            return res.status(404).json({
                erro: "Usuário não encontrado."
            });
        }

        await prisma.usuario.delete({
            where: { id }
        });

        res.status(200).json({
            mensagem: "Usuário deletado com sucesso."
        }).end();

    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: "Erro interno ao deletar usuário."
        });
    }
};

module.exports = {
    cadastrarUsuario,
    listarUsuarios,
    deletarUsuario,
    atualizarUsuario,
    buscarUsuarioPorId
};