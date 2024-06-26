const express = require('express');
const router = express.Router();


// Rota para o webhook do WhatsApp
router.get('/whatsapp', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token === process.env.VERIFY_TOKEN) {
        console.log('Webhook verificado com sucesso');
        res.status(200).send(challenge);
    } else {
        console.log('Falha na verificação do webhook');
        res.sendStatus(403);
    }
});

// Rota para o envio de mensagens do WhatsApp
router.post('/whatsapp', (req, res) => {
    console.log('Request received');  // Log para depuração

    if (req.body && req.body.messages) {
        const message = req.body.messages[0].text.body;
        console.log(`Whatsapp message: ${message}`);
    }
    res.sendStatus(200);  // Respondendo ao WhatsApp com status 200 OK
});

module.exports = router;