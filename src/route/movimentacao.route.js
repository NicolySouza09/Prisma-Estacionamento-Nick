const express = require('express');
const router = express.Router();
const {
    cadastrarMovimentacao,
    listarMovimentacoes,
    buscarMovimentacaoPorId,
    atualizarMovimentacao,
    deletarMovimentacao
} = require('../controller/movimentacao.controller');

// Rotas para Movimentações
router.post('/', cadastrarMovimentacao);
router.get('/', listarMovimentacoes);
router.get('/:id', buscarMovimentacaoPorId);
router.put('/:id', atualizarMovimentacao);
router.delete('/:id', deletarMovimentacao);

module.exports = router;