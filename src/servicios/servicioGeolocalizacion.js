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
        if (error.code === 1) {
          reject(new Error('Permiso de ubicación denegado. Busca una ciudad manualmente.'));
        } else if (error.code === 3) {
          reject(new Error('Se agotó el tiempo para obtener tu ubicación.'));
        } else {
          reject(new Error('No se pudo obtener tu ubicación.'));
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  });
};
