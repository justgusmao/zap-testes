const express = require('express');
const router = express.Router();


// Rota para o webhook do WhatsApp
router.post('/whatsapp', (req, res) => {
    console.log('Request received');  // Log para depuração

    if (req.body && req.body.messages) {
        const message = req.body.messages[0].text.body;
        console.log(`Whatsapp message: ${message}`);
    }
    res.sendStatus(200);  // Respondendo ao WhatsApp com status 200 OK
});

module.exports = router;