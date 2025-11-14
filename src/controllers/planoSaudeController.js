const {PLANOS_SAUDE} = require('../constants/planosSaude')

const PlanoSaudeController = {

    async listar (req, res){
        return res.json(PLANOS_SAUDE);
    },

};

module.exports = PlanoSaudeController;