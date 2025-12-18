// Obtener la ubicación actual del usuario
export const obtenerUbicacionActual = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('La geolocalización no está soportada por tu navegador'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitud: position.coords.latitude,
          longitud: position.coords.longitude
        });
      },
      (error) => {
        reject(new Error('No se pudo obtener tu ubicación'));
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  });
};
