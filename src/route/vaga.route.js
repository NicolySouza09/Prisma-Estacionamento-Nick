const express = require('express');
const router = express.Router();
const {
    cadastrarVaga,
    listarVagas,
    buscarVagaPorId,
    atualizarVaga,
    deletarVaga
} = require('../controller/vaga.controller.js');

/**
 * @swagger
 * /vagas:
 *   post:
 *     summary: Cadastrar uma nova vaga
 *     tags: [Vagas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VagaInput'
 *     responses:
 *       201:
 *         description: Vaga cadastrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vaga'
 *       400:
 *         description: Dados inválidos ou vaga já existe
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', cadastrarVaga);

/**
 * @swagger
 * /vagas:
 *   get:
 *     summary: Listar todas as vagas
 *     tags: [Vagas]
 *     responses:
 *       200:
 *         description: Lista de vagas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vaga'
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', listarVagas);

/**
 * @swagger
 * /vagas/{id}:
 *   get:
 *     summary: Buscar vaga por ID
 *     tags: [Vagas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da vaga
 *     responses:
 *       200:
 *         description: Dados da vaga
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vaga'
 *       404:
 *         description: Vaga não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', buscarVagaPorId);

/**
 * @swagger
 * /vagas/{id}:
 *   put:
 *     summary: Atualizar uma vaga
 *     tags: [Vagas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da vaga
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VagaInput'
 *     responses:
 *       200:
 *         description: Vaga atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vaga'
 *       404:
 *         description: Vaga não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', atualizarVaga);

/**
 * @swagger
 * /vagas/{id}:
 *   delete:
 *     summary: Deletar uma vaga
 *     tags: [Vagas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da vaga
 *     responses:
 *       200:
 *         description: Vaga deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Vaga não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', deletarVaga);

module.exports = router;