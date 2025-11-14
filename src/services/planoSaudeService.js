const { PLANOS_SAUDE } = require('../constants/planosSaude');

const PlanoSaudeService = {
    async listarPlanos() {
        return PLANOS_SAUDE;
    }
}

module.exports = PlanoSaudeService;