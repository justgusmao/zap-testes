//Inicializa os items necessários para rodar a aplicação
const express = require('express');
const bodyParser = require('body-parser');

//Inicializa o app
const app = express();
app.use(bodyParser.json());

// Rota para o webhook do WhatsApp
app.post('/webhook/v1/whatsapp-messages', (req, res) => {
    console.log('Request received');  // Log para depuração

    if (req.body && req.body.messages) {
        const message = req.body.messages[0].text.body;
        console.log(`Received message: ${message}`);
    }
    res.sendStatus(200);  // Respondendo ao WhatsApp com status 200 OK
});

const PORT = process.env.PORT || 5505;  // Porta para ouvir as mensagens
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});