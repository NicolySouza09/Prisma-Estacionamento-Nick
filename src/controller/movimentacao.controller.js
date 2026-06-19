const prisma = require('../data/prisma.js');

const cadastrarMovimentacao = async (req, res) => {
    try {

        const {
            valorHora,
            valorTotal,
            veiculoId,
            vagaId,
            usuarioId
        } = req.body;

        if (
            !valorHora ||
            !valorTotal ||
            !veiculoId ||
            !vagaId ||
            !usuarioId
        ) {
            return res.status(400).json({
                erro: "Todos os campos são obrigatórios."
            });
        }

        const veiculoExiste = await prisma.veiculo.findUnique({
            where: { id: Number(veiculoId) }
        });

        if (!veiculoExiste) {
            return res.status(404).json({
                erro: "Veículo não encontrado."
            });
        }

        const vagaExiste = await prisma.vaga.findUnique({
            where: { id: Number(vagaId) }
        });

        if (!vagaExiste) {
            return res.status(404).json({
                erro: "Vaga não encontrada."
            });
        }

        const usuarioExiste = await prisma.usuario.findUnique({
            where: { id: Number(usuarioId) }
        });

        if (!usuarioExiste) {
            return res.status(404).json({
                erro: "Usuário não encontrado."
            });
        }

        const movimentacao = await prisma.movimentacao.create({
            data: {
                valorHora: Number(valorHora),
                valorTotal: Number(valorTotal),
                veiculoId: Number(veiculoId),
                vagaId: Number(vagaId),
                usuarioId: Number(usuarioId)
            }
        });

        res.status(201).json(movimentacao).end();

    } catch (error) {
        console.error("Erro ao cadastrar movimentação:", error);
        res.status(500).json({
            erro: "Erro interno ao cadastrar movimentação."
        });
    }
};

const listarMovimentacoes = async (req, res) => {
    try {

        const movimentacoes = await prisma.movimentacao.findMany({
            include: {
                veiculo: true,
                vaga: true,
                usuario: true
            }
        });

        res.status(200).json(movimentacoes).end();

    } catch (error) {
        console.error("Erro ao listar movimentações:", error);
        res.status(500).json({
            erro: "Erro interno ao listar movimentações."
        });
    }
};

const buscarMovimentacaoPorId = async (req, res) => {
    try {

        const id = Number(req.params.id);

        const movimentacao = await prisma.movimentacao.findUnique({
            where: { id },
            include: {
                veiculo: true,
                vaga: true,
                usuario: true
            }
        });

        if (!movimentacao) {
            return res.status(404).json({
                erro: "Movimentação não encontrada."
            });
        }

        res.status(200).json(movimentacao).end();

    } catch (error) {
        console.error("Erro ao buscar movimentação:", error);
        res.status(500).json({
            erro: "Erro interno ao buscar movimentação."
        });
    }
};

const atualizarMovimentacao = async (req, res) => {
    try {

        const id = Number(req.params.id);

        const {
            dataSida,
            valorHora,
            valorTotal,
            status
        } = req.body;

        const movimentacaoExiste = await prisma.movimentacao.findUnique({
            where: { id }
        });

        if (!movimentacaoExiste) {
            return res.status(404).json({
                erro: "Movimentação não encontrada."
            });
        }

        const movimentacaoAtualizada = await prisma.movimentacao.update({
            where: { id },
            data: {
                dataSida,
                valorHora: Number(valorHora),
                valorTotal: Number(valorTotal),
                status
            }
        });

        res.status(200).json(movimentacaoAtualizada).end();

    } catch (error) {
        console.error("Erro ao atualizar movimentação:", error);
        res.status(500).json({
            erro: "Erro interno ao atualizar movimentação."
        });
    }
};

const deletarMovimentacao = async (req, res) => {
    try {

        const id = Number(req.params.id);

        const movimentacaoExiste = await prisma.movimentacao.findUnique({
            where: { id }
        });

        if (!movimentacaoExiste) {
            return res.status(404).json({
                erro: "Movimentação não encontrada."
            });
        }

        await prisma.movimentacao.delete({
            where: { id }
        });

        res.status(200).json({
            mensagem: "Movimentação deletada com sucesso."
        }).end();

    } catch (error) {
        console.error("Erro ao deletar movimentação:", error);
        res.status(500).json({
            erro: "Erro interno ao deletar movimentação."
        });
    }
};

module.exports = {
    cadastrarMovimentacao,
    listarMovimentacoes,
    buscarMovimentacaoPorId,
    atualizarMovimentacao,
    deletarMovimentacao
};