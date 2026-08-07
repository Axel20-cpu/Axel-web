export default async function handler(req, res) {

    // Solo aceptar solicitudes POST
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Método no permitido"
        });
    }

    // Obtener los datos enviados desde el formulario
    const {
        name,
        email,
        message,
        turnstileToken
    } = req.body;

    // Verificar que exista el token de Turnstile
    if (!turnstileToken) {
        return res.status(400).json({
            error: "Falta el token de Turnstile"
        });
    }

    // Enviar el token a Cloudflare para verificarlo
    const verifyResponse = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                secret: process.env.TURNSTILE_SECRET_KEY,
                response: turnstileToken
            })
        }
    );

    const verifyData = await verifyResponse.json();

    // Si el token no es válido, rechazar el formulario
    if (!verifyData.success) {

        console.log(verifyData);

        return res.status(403).json({
            error: "Falló la verificación de Turnstile"
        });

    }

    // Si llegó hasta acá, Turnstile validó correctamente
    return res.status(200).json({
        mensaje: "Turnstile validado correctamente."
    });

}