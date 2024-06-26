//Inicializa os items necessários para rodar a aplicação
const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');

const logger = require('./middlewares/logger');
const auth = require('./middlewares/auth');

//Carrega as configurações globais no ambiente
require('dotenv').config({ path: 'config.env' });

// Limitação de taxa
const limiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutos
    max: 60 // Limite por IP a cada 2 minutos
});

//Inicializa o app
const app = express();
app.use(limiter);
app.use(bodyParser.json());

//Inicializa o logger apenas se ele estiver permitido
if(process.env.USE_LOGGER === 'true'){
    app.use(logger);
}

//Prepara para receber estruturas mais complexas
app.use(bodyParser.urlencoded({ extended: true }));

// Usando middleware de autenticação para rotas específicas
app.use('/secure', auth);


// Importar rotas
const indexRouter = require('./routes/index');
const webhookRouter = require('./routes/webhook');
const secureRouter = require('./routes/secure');
//
//Usar as rotas
app.use('/', indexRouter);
app.use('/webhook/v1', webhookRouter);
app.use('/secure', auth, secureRouter);


//Rotas simples
//
// Rota pública
app.get('/', (req, res) => {
    res.send('Olá, essa é a rota pública da Virtualbrand!');
});

const PORT = process.env.PORT || 5555;  // Porta para ouvir as mensagens
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});