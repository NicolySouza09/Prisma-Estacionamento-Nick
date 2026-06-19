const express = require('express');
const router = express.Router();
const {
    cadastrarVeiculo,
    listarVeiculos,
    buscarVeiculoPorId,
    atualizarVeiculo,
    deletarVeiculo
} = require('../controller/veiculo.controller.js');

/**
 * @swagger
 * /veiculos:
 *   post:
 *     summary: Cadastrar um novo veículo
 *     tags: [Veículos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VeiculoInput'
 *     responses:
 *       201:
 *         description: Veículo cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veiculo'
 *       400:
 *         description: Dados inválidos ou placa já cadastrada
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', cadastrarVeiculo);

/**
 * @swagger
 * /veiculos:
 *   get:
 *     summary: Listar todos os veículos
 *     tags: [Veículos]
 *     responses:
 *       200:
 *         description: Lista de veículos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Veiculo'
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', listarVeiculos);

/**
 * @swagger
 * /veiculos/{id}:
 *   get:
 *     summary: Buscar veículo por ID
 *     tags: [Veículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do veículo
 *     responses:
 *       200:
 *         description: Dados do veículo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veiculo'
 *       404:
 *         description: Veículo não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', buscarVeiculoPorId);

/**
 * @swagger
 * /veiculos/{id}:
 *   put:
 *     summary: Atualizar um veículo
 *     tags: [Veículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do veículo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VeiculoInput'
 *     responses:
 *       200:
 *         description: Veículo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veiculo'
 *       404:
 *         description: Veículo não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', atualizarVeiculo);

/**
 * @swagger
 * /veiculos/{id}:
 *   delete:
 *     summary: Deletar um veículo
 *     tags: [Veículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do veículo
 *     responses:
 *       200:
 *         description: Veículo deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Veículo não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', deletarVeiculo);

module.exports = router;