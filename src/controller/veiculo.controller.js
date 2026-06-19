const prisma = require('../data/prisma.js');

const cadastrarVeiculo = async (req, res) => {
    try {
        const { placa, modelo, cor, marca, tipo, clientId } = req.body;

        if (!placa || !modelo || !cor || !marca || !tipo || !clientId) {
            return res.status(400).json({
                erro: "Todos os campos são obrigatórios."
            });
        }

        const placaExiste = await prisma.veiculo.findUnique({
            where: { placa }
        });

        if (placaExiste) {
            return res.status(400).json({
                erro: "Placa já cadastrada."
            });
        }

        const clienteExiste = await prisma.client.findUnique({
            where: { id: Number(clientId) }
        });

        if (!clienteExiste) {
            return res.status(404).json({
                erro: "Cliente não encontrado."
            });
        }

        const veiculo = await prisma.veiculo.create({
            data: {
                placa,
                modelo,
                cor,
                marca,
                tipo,
                clientId: Number(clientId)
            }
        });

        res.status(201).json(veiculo);

    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro interno." });
    }
};

const listarVeiculos = async (req, res) => {
    try {

        const veiculos = await prisma.veiculo.findMany({
            include: {
                client: true
            }
        });

        res.status(200).json(veiculos);

    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro interno." });
    }
};

const buscarVeiculoPorId = async (req, res) => {
    try {

        const id = Number(req.params.id);

        const veiculo = await prisma.veiculo.findUnique({
            where: { id },
            include: {
                client: true
            }
        });

        if (!veiculo) {
            return res.status(404).json({
                erro: "Veículo não encontrado."
            });
        }

        res.status(200).json(veiculo);

    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro interno." });
    }
};

const atualizarVeiculo = async (req, res) => {
    try {

        const id = Number(req.params.id);

        const { placa, modelo, cor, marca, tipo, clientId } = req.body;

        const existe = await prisma.veiculo.findUnique({
            where: { id }
        });

        if (!existe) {
            return res.status(404).json({
                erro: "Veículo não encontrado."
            });
        }

        const veiculoAtualizado = await prisma.veiculo.update({
            where: { id },
            data: {
                placa,
                modelo,
                cor,
                marca,
                tipo,
                clientId: Number(clientId)
            }
        });

        res.status(200).json(veiculoAtualizado);

    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro interno." });
    }
};

const deletarVeiculo = async (req, res) => {
    try {

        const id = Number(req.params.id);

        const existe = await prisma.veiculo.findUnique({
            where: { id }
        });

        if (!existe) {
            return res.status(404).json({
                erro: "Veículo não encontrado."
            });
        }

        await prisma.veiculo.delete({
            where: { id }
        });

        res.status(200).json({
            mensagem: "Veículo deletado com sucesso."
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro interno." });
    }
};

module.exports = {
    cadastrarVeiculo,
    listarVeiculos,
    buscarVeiculoPorId,
    atualizarVeiculo,
    deletarVeiculo
};