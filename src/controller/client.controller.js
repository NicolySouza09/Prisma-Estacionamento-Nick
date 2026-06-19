// src/controller/client.controller.js
const prisma = require('../data/prisma');

// Cadastrar Cliente
const cadastrarClient = async (req, res) => {
    try {
        const { nome, CPF, telefone, email } = req.body;

        if (!nome || !CPF || !telefone || !email) {
            return res.status(400).json({
                erro: "Os campos 'nome', 'CPF', 'telefone' e 'email' são obrigatórios."
            });
        }

        const cpfExiste = await prisma.client.findUnique({
            where: { CPF }
        });

        if (cpfExiste) {
            return res.status(400).json({
                erro: "CPF já cadastrado."
            });
        }

        const emailExiste = await prisma.client.findUnique({
            where: { email }
        });

        if (emailExiste) {
            return res.status(400).json({
                erro: "Email já cadastrado."
            });
        }

        const novoClient = await prisma.client.create({
            data: {
                nome,
                CPF,
                telefone,
                email
            },
            include: {
                veiculo: true
            }
        });

        res.status(201).json({
            mensagem: "Cliente cadastrado com sucesso!",
            cliente: novoClient
        });

    } catch (error) {
        console.error("Erro ao cadastrar cliente:", error);
        res.status(500).json({
            erro: "Erro interno ao cadastrar cliente.",
            detalhes: error.message
        });
    }
};

// Listar todos os clientes
const listarClients = async (req, res) => {
    try {
        const clients = await prisma.client.findMany({
            include: {
                veiculo: true
            },
            orderBy: {
                id: 'desc'
            }
        });

        res.status(200).json(clients);

    } catch (error) {
        console.error("Erro ao listar clientes:", error);
        res.status(500).json({
            erro: "Erro interno ao buscar clientes."
        });
    }
};

// Buscar cliente por ID
const buscarClientPorId = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                erro: "ID inválido."
            });
        }

        const client = await prisma.client.findUnique({
            where: { id },
            include: {
                veiculo: {
                    select: {
                        id: true,
                        placa: true,
                        modelo: true,
                        cor: true,
                        marca: true,
                        tipo: true
                    }
                }
            }
        });

        if (!client) {
            return res.status(404).json({
                erro: "Cliente não encontrado."
            });
        }

        res.status(200).json(client);

    } catch (error) {
        console.error("Erro ao buscar cliente:", error);
        res.status(500).json({
            erro: "Erro interno ao buscar cliente.",
            detalhes: error.message
        });
    }
};

// Atualizar cliente
const atualizarClient = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { nome, CPF, telefone, email } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({
                erro: "ID inválido."
            });
        }

        // Verificar se cliente existe
        const clientExiste = await prisma.client.findUnique({
            where: { id }
        });

        if (!clientExiste) {
            return res.status(404).json({
                erro: "Cliente não encontrado."
            });
        }

        // Verificar se o CPF já está em uso por outro cliente
        if (CPF) {
            const cpfExiste = await prisma.client.findFirst({
                where: {
                    CPF,
                    NOT: {
                        id: id
                    }
                }
            });

            if (cpfExiste) {
                return res.status(400).json({
                    erro: "CPF já está em uso por outro cliente."
                });
            }
        }

        // Verificar se o Email já está em uso por outro cliente
        if (email) {
            const emailExiste = await prisma.client.findFirst({
                where: {
                    email,
                    NOT: {
                        id: id
                    }
                }
            });

            if (emailExiste) {
                return res.status(400).json({
                    erro: "Email já está em uso por outro cliente."
                });
            }
        }

        // Preparar dados para atualização
        const dadosAtualizacao = {
            nome: nome || clientExiste.nome,
            CPF: CPF || clientExiste.CPF,
            telefone: telefone || clientExiste.telefone,
            email: email || clientExiste.email
        };

        const clientAtualizado = await prisma.client.update({
            where: { id },
            data: dadosAtualizacao,
            include: {
                veiculo: true
            }
        });

        res.status(200).json({
            mensagem: "Cliente atualizado com sucesso!",
            cliente: clientAtualizado
        });

    } catch (error) {
        console.error("Erro ao atualizar cliente:", error);
        res.status(500).json({
            erro: "Erro interno ao atualizar cliente.",
            detalhes: error.message
        });
    }
};

// Deletar cliente
const deletarClient = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                erro: "ID inválido."
            });
        }

        // Verificar se cliente existe e se tem veículos
        const clientExiste = await prisma.client.findUnique({
            where: { id },
            include: {
                veiculo: true
            }
        });

        if (!clientExiste) {
            return res.status(404).json({
                erro: "Cliente não encontrado."
            });
        }

        // Verificar se o cliente possui veículos
        if (clientExiste.veiculo && clientExiste.veiculo.length > 0) {
            return res.status(400).json({
                erro: "Não é possível deletar este cliente pois ele possui veículos associados.",
                totalVeiculos: clientExiste.veiculo.length
            });
        }

        await prisma.client.delete({
            where: { id }
        });

        res.status(200).json({
            mensagem: "Cliente deletado com sucesso!",
            clienteDeletado: {
                id: clientExiste.id,
                nome: clientExiste.nome,
                CPF: clientExiste.CPF,
                email: clientExiste.email
            }
        });

    } catch (error) {
        console.error("Erro ao deletar cliente:", error);
        res.status(500).json({
            erro: "Erro interno ao deletar cliente.",
            detalhes: error.message
        });
    }
};

module.exports = {
    cadastrarClient,
    listarClients,
    buscarClientPorId,    
    atualizarClient,      
    deletarClient
};