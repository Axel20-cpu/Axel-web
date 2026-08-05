export default function handler(req, res){
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: "Metodo no permitido"
        });
    }

    return res.status(200).json({
        mensaje: "La API recibió la solicitud correctamente"
    });
}

