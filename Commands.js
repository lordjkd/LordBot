const prefix = '!'; // Prefixo para os comandos
const ownerId = '1234567890@c.us'; // Substitua pelo ID do dono do bot

// Funções para o menu do dono
const ownerCommands = {
    '/block': async (message, args) => {
        if (message.from !== ownerId) return message.reply('Acesso negado.');
        const number = args[0];
        // Lógica para bloquear um contato
        message.reply(`Contato ${number} bloqueado.`);
    },
    '/unblock': async (message, args) => {
        if (message.from !== ownerId) return message.reply('Acesso negado.');
        const number = args[0];
        // Lógica para desbloquear um contato
        message.reply(`Contato ${number} desbloqueado.`);
    },
    '/bc': async (message, args) => {
        if (message.from !== ownerId) return message.reply('Acesso negado.');
        const broadcastMessage = args.join(' ');
        // Lógica para enviar mensagem em massa
        message.reply('Mensagem enviada em massa.');
    },
    // Adicione as demais funções do menu do dono aqui...
};

// Comandos e funções
const commands = {
    'owner': async (message, args) => {
        const command = args[0];
        if (ownerCommands[command]) {
            await ownerCommands[command](message, args.slice(1));
        } else {
            message.reply('Comando não reconhecido no menu do dono.');
        }
    },
    // Outros menus
    'rpg': async (message, args) => {
        await showRpgMenu(message);
    },
    'admin': async (message, args) => {
        await showAdminMenu(message);
    },
    'zoeira': async (message, args) => {
        await showZoeiraMenu(message);
    },
    'utilidade': async (message, args) => {
        await showUtilidadeMenu(message);
    }
};

module.exports = { prefix, commands };
