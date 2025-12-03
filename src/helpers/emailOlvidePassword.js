import axios from 'axios';

const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;

  try {
    const data = {
      sender: {
        name: "Agreenbyte",
        email: process.env.EMAIL_USER
      },
      to: [
        {
          email: email,
          name: nombre
        }
      ],
      subject: "Agreenbyte - Reestablece tu Contraseña",
      htmlContent: `
        <p>Hola: ${nombre}, has solicitado reestablecer tu contraseña.</p>
        <p>Sigue el siguiente enlace para generar una nueva contraseña:</p>
        
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Contraseña</a>
        
        <p>Si tú no solicitaste este correo, puedes ignorar el mensaje.</p>
      `
    };

    const config = {
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
        'accept': 'application/json'
      }
    };

    await axios.post('https://api.brevo.com/v3/smtp/email', data, config);
    
    console.log("Email de recuperación enviado correctamente a:", email);

  } catch (error) {
    console.error("Error enviando email (Brevo):", error.response?.data || error.message);
  }
};

export default emailOlvidePassword;