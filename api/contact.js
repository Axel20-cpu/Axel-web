// API de contacto

export default function handler(req, res){
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: "Metodo no permitido"
        });
    }

    //Obtener los datos enviados desde el formulario
    const { name, emial, message } = req.body;

    //Mostrar los datos en los logs de vercel (solo para probar)
    console.log("Nombre:", name);
    console.log("Email:", emial);
    console.log("Mensaje:", message);

    //Respuesta temporal
    return res.status(200).json({
        mensaje: "Datos recibidos correctamente."
    });
}

