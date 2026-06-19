// src/route/client.route.js
const express = require('express');
const router = express.Router();
const {
    cadastrarClient,
    listarClients,
    buscarClientPorId,
    atualizarClient,
    deletarClient
} = require('../controller/client.controller');

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cadastrar um novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - CPF
 *               - telefone
 *               - email
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do cliente
 *                 example: João Silva
 *               CPF:
 *                 type: string
 *                 description: CPF do cliente
 *                 example: 12345678901
 *               telefone:
 *                 type: string
 *                 description: Telefone do cliente
 *                 example: 1199999999
 *               email:
 *                 type: string
 *                 description: Email do cliente
 *                 example: joao@email.com
 *     responses:
 *       201:
 *         description: Cliente cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: Cliente cadastrado com sucesso!
 *                 cliente:
 *                   $ref: '#/components/schemas/Client'
 *       400:
 *         description: Dados inválidos ou CPF/Email já cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', cadastrarClient);

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Listar todos os clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', listarClients);

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Buscar um cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *         example: 1
 *     responses:
 *       200:
 *         description: Dados do cliente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', buscarClientPorId);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Atualizar um cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do cliente
 *                 example: João Silva Santos
 *               CPF:
 *                 type: string
 *                 description: CPF do cliente
 *                 example: 12345678901
 *               telefone:
 *                 type: string
 *                 description: Telefone do cliente
 *                 example: 11988888888
 *               email:
 *                 type: string
 *                 description: Email do cliente
 *                 example: joao.santos@email.com
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: Cliente atualizado com sucesso!
 *                 cliente:
 *                   $ref: '#/components/schemas/Client'
 *       400:
 *         description: Dados inválidos ou CPF/Email já em uso
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', atualizarClient);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Deletar um cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *         example: 1
 *     responses:
 *       200:
 *         description: Cliente deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: Cliente deletado com sucesso!
 *                 clienteDeletado:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nome:
 *                       type: string
 *                       example: João Silva
 *                     CPF:
 *                       type: string
 *                       example: 12345678901
 *                     email:
 *                       type: string
 *                       example: joao@email.com
 *       400:
 *         description: Cliente possui veículos associados
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', deletarClient);

module.exports = router;