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

//Prueba de comunicación con la API

const testButton = document.querySelector("#test-api");

testButton.addEventListener("click", async () => {

    console.log("Botón presionado");

    const response = await fetch("/api/contact", {
        method: "POST",
    });

    console.log("Status:", response.status);

    const data = await response.json();

    console.log("Respuesta:", data);

});