import axios from 'axios';

const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  try {
    // Cuerpo de la petición a la API de Brevo
    const data = {
      sender: {
        name: "Agreenbyte", // El nombre público de tu app
        email: process.env.EMAIL_USER // Debe ser el correo que validaste en Brevo
      },
      to: [
        {
          email: email,
          name: nombre
        }
      ],
      subject: "Comprueba tu cuenta en Agreenbyte",
      htmlContent: `
        <p>Hola: ${nombre}, comprueba tu cuenta en Agreenbyte.</p>
        <p>Tu cuenta ya está casi lista, solo debes comprobarla en el siguiente enlace:</p>
        
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
        
        <p>Si tú no creaste esta cuenta, puedes ignorar el mensaje.</p>
      `
    };

    // Configuración de cabeceras con la API Key
    const config = {
      headers: {
        'api-key': process.env.BREVO_API_KEY, // ¡Recuerda agregar esta variable en Render!
        'Content-Type': 'application/json',
        'accept': 'application/json'
      }
    };

    // Petición HTTP POST (Puerto 443, permitido por Render)
    await axios.post('https://api.brevo.com/v3/smtp/email', data, config);
    
    console.log("Email de registro enviado correctamente a:", email);

  } catch (error) {
    // Loguear errores detallados de Brevo si falla
    console.error("Error enviando email (Brevo):", error.response?.data || error.message);
  }
};

export default emailRegistro;