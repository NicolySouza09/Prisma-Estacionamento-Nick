
require('dotenv').config();
const express = require('express');
const cors = require("cors");
const { swaggerUi, swaggerSpec } = require('./src/docs/swagger');

const clientRoute = require('./src/route/client.route');
const usuarioRoute = require('./src/route/usuario.route');
const vagaRoute = require('./src/route/vaga.route');
const veiculoRoute = require('./src/route/veiculo.route');
const movimentacaoRoute = require('./src/route/movimentacao.route');





const app = express();
app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/client', clientRoute);
app.use('/usuario',usuarioRoute);   
app.use('/vaga', vagaRoute);
app.use('/veiculo', veiculoRoute);
app.use('/movimentacao', movimentacaoRoute);



const PORT = process.env.PORT || 3001;


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});