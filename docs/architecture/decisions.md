¿Por qué React?

¿Por qué React Router?

¿Por qué Context API?

¿Por qué dividir services?

¿Por qué separar pages y components?

¿Por qué no llamar directamente a fetch desde los componentes?

------------------

TTS es una capacidad de primera clase de la aplicación.
Kokoro como motor TTS preferente en clientes capaces.
Ejecución client-side cuando sea viable.
WebGPU como backend preferente, con fallback.
Piper/WASM como alternativa ligera.
TTS server-side como fallback para dispositivos incompatibles.
Audio segmentado y generado/procesado progresivamente.
Cache de audio cuando tenga sentido.
El lector no debe quedar acoplado a un único motor TTS.
La interfaz del reproductor trabaja contra una abstracción TTS Engine.