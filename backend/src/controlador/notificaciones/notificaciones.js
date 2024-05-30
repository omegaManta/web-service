const axios = require('axios');
const apiKey = '7A91AD60B5C2795883A3CE6E679F5CAEEE816FE283C13311359ECD5BA4658798622DD4EFEF552BB40D4A217B82F5DF64';

const enviarMensaje = async (req, res) => {
    const { destinatario, asunto } = req.body;
    
    try {
        const response = await axios.post('https://api.elasticemail.com/v2/email/send', {
            apikey: apiKey,
            from: 'omega_manta@gmail.com',
            to: destinatario,
            subject: asunto
        });

        console.log('Correo electrónico enviado correctamente:', response.data);
        
        // Verificar si la respuesta indica éxito
        if (response.data.success) {
            return res.status(200).json({ success: true, message: 'Correo electrónico enviado correctamente' });
        } else {
            // En caso de que la respuesta no sea exitosa, devolver el error
            return res.status(500).json({ success: false, error: response.data.error });
        }
    } catch (error) {
        // Manejar errores de la solicitud
        console.error('Error al enviar el correo electrónico:', error.response.data);
        return res.status(500).json({ success: false, error: 'Error al enviar el correo electrónico' });
    }
};

module.exports = {
    enviarMensaje
};
