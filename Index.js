const { Client, LocalAuth } = require('whatsapp-web.js');
const { prefix, commands } = require('./commands'); // Importa os comandos e o prefixo

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('message', async message => {
    if (message.body.startsWith(prefix)) {
        const commandBody = message.body.slice(prefix.length).trim();
        const args = commandBody.split(/ +/);
        const command = args.shift().toLowerCase();

        if (commands[command]) {
            try {
                await commands[command](message, args);
            } catch (error) {
                console.error('Erro ao executar o comando:', error);
                message.reply('Houve um erro ao executar o comando.');
            }
        } else {
            message.reply('Comando não reconhecido.');
        }
    }
});

client.initialize();
