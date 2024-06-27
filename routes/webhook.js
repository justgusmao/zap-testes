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
    console.log('Headers:', JSON.stringify(req.headers, null, 2)); // Log dos headers da requisição
    console.log('Body:', JSON.stringify(req.body, null, 2)); // Log do corpo da requisição

    const body = req.body;

    if (body.object === 'whatsapp_business_account') {
    body.entry.forEach(entry => {
        entry.changes.forEach(change => {
            if (change.field === 'messages') {
                const messages = change.value.messages;
                messages.forEach(message => {
                    console.log(`Mensagem recebida de ${message.from}: ${message.text.body}`);
                });
            }
        });
    });
    res.status(200).send('EVENT_RECEIVED');

    } else {
        res.sendStatus(404);
    }
    const body = req.body;

    if (body.object === 'whatsapp_business_account') {
    body.entry.forEach(entry => {
        entry.changes.forEach(change => {
            if (change.field === 'messages') {
                const messages = change.value.messages;
                messages.forEach(message => {
                    console.log(`Mensagem recebida de ${message.from}: ${message.text.body}`);
                });
            }
        });
    });
    res.status(200).send('EVENT_RECEIVED');
    
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;