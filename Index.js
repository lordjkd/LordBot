const { default: makeWASocket, DisconnectReason } = require('@adiwajshing/baileys');
const { Boom } = require('@hapi/boom');

async function connectToWhatsApp() {
    const sock = makeWASocket();

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if(connection === 'close') {
            const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Connection closed due to', lastDisconnect.error, ', reconnecting', shouldReconnect);
            if(shouldReconnect) {
                connectToWhatsApp();
            }
        } else if(connection === 'open') {
            console.log('Connected to WhatsApp');
        }
    });

    sock.ev.on('messages.upsert', async (msg) => {
        const message = msg.messages[0];
        if (!message.message) return;

        const from = message.key.remoteJid;
        const body = message.message.conversation || message.message.extendedTextMessage?.text;

        // Exemplo de comando /iniciar que responde uma mensagem de boas-vindas
        if (body && body.startsWith('/iniciar')) {
            await sock.sendMessage(from, { text: '🛡️ Bem-vindo ao LordBot! Use /ajuda para ver os comandos disponíveis.' });
        }

        // Adicione outros comandos aqui

    });
}

// Inicia a conexão com o WhatsApp
connectToWhatsApp();
