const prisma = require('../data/prisma.js');

const cadastrarVaga = async (req, res) => {
    try {
        const { numero, setor, tipo } = req.body;

        if (!numero || !setor || !tipo) {
            return res.status(400).json({
                erro: "Os campos 'numero', 'setor' e 'tipo' são obrigatórios."
            });
        }

        const vagaExiste = await prisma.vaga.findUnique({
            where: { numero }
        });

        if (vagaExiste) {
            return res.status(400).json({
                erro: "Já existe uma vaga com esse número."
            });
        }

        const vaga = await prisma.vaga.create({
            data: {
                numero,
                setor,
                tipo
            }
        });

        res.status(201).json(vaga).end();

    } catch (error) {
        console.error("Erro ao cadastrar vaga:", error);
        res.status(500).json({
            erro: "Erro interno ao cadastrar vaga."
        });
    }
};

const listarVagas = async (req, res) => {
    try {

        const vagas = await prisma.vaga.findMany();

        res.status(200).json(vagas).end();

    } catch (error) {
        console.error("Erro ao listar vagas:", error);
        res.status(500).json({
            erro: "Erro interno ao listar vagas."
        });
    }
};

const buscarVagaPorId = async (req, res) => {
    try {

        const id = Number(req.params.id);

        const vaga = await prisma.vaga.findUnique({
            where: { id }
        });

        if (!vaga) {
            return res.status(404).json({
                erro: "Vaga não encontrada."
            });
        }

        res.status(200).json(vaga).end();

    } catch (error) {
        console.error("Erro ao buscar vaga:", error);
        res.status(500).json({
            erro: "Erro interno ao buscar vaga."
        });
    }
};

const atualizarVaga = async (req, res) => {
    try {

        const id = Number(req.params.id);
        const { numero, setor, status, tipo } = req.body;

        const vagaExiste = await prisma.vaga.findUnique({
            where: { id }
        });

        if (!vagaExiste) {
            return res.status(404).json({
                erro: "Vaga não encontrada."
            });
        }

        const vagaAtualizada = await prisma.vaga.update({
            where: { id },
            data: {
                numero,
                setor,
                status,
                tipo
            }
        });

        res.status(200).json(vagaAtualizada).end();

    } catch (error) {
        console.error("Erro ao atualizar vaga:", error);
        res.status(500).json({
            erro: "Erro interno ao atualizar vaga."
        });
    }
};

const deletarVaga = async (req, res) => {
    try {

        const id = Number(req.params.id);

        const vagaExiste = await prisma.vaga.findUnique({
            where: { id }
        });

        if (!vagaExiste) {
            return res.status(404).json({
                erro: "Vaga não encontrada."
            });
        }

        await prisma.vaga.delete({
            where: { id }
        });

        res.status(200).json({
            mensagem: "Vaga deletada com sucesso."
        }).end();

    } catch (error) {
        console.error("Erro ao deletar vaga:", error);
        res.status(500).json({
            erro: "Erro interno ao deletar vaga."
        });
    }
};

module.exports = {
    cadastrarVaga,
    listarVagas,
    buscarVagaPorId,
    atualizarVaga,
    deletarVaga
};