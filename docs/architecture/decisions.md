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

-------------------------------

1. Usuario entra a la página
        ↓
2. Usuario selecciona imagen
        ↓
3. React → Rust
   "Quiero subir esta imagen"
   {
     filename,
     content_type,
     size
   }
        ↓
4. Rust valida los datos
        ↓
5. Rust genera
   UUID + key
        ↓
6. Rust genera URL presignada
        ↓
7. Rust → React
   {
     upload_url,
     key
   }
        ↓
8. React → R2
   PUT imagen usando upload_url
        ↓
9. R2 guarda la imagen
        ↓
10. React → Rust
    "La subida terminó"
        ↓
11. Rust guarda/actualiza PostgreSQL
    con UUID, key, etc.
    ---------
    
1. React carga página
        ↓
2. Usuario selecciona imagen
        ↓
3. React → Rust
   metadata
        ↓
4. Rust
   genera image_id + key
   genera firma
        ↓
5. React → R2
   PUT imagen
        ↓
6. React → Rust
   finalización
        ↓
7. Rust → R2
   verifica objeto / obtiene metadata
        ↓
8. Rust → PostgreSQL
   guarda imagen