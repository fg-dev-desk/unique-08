import { fetch, fetchSinToken } from "../../../api/api";
import { setLoading, setFeaturedCars, setError, clearError } from "./homeSlice";

export const startGetFeaturedCars = (page = 1, pageSize = 6, sortBy = '1', scope = 'main') => {
  return async (dispatch) => {
    try {
      dispatch(setLoading({ scope, loading: true }));
      dispatch(clearError({ scope }));
      // Solo usar el endpoint real proporcionado
      const endpoint = "https://dev-backend.uniquemotors.mx/api/Subasta/GetTorres/1-250616";
      let response = null;
      try {
        response = await fetch("get", endpoint);
      } catch {}
      if (response && response.ok && response.data && Array.isArray(response.data.torres)) {
        // Transform API data to include valores for easier access
        const transformedCars = response.data.torres.map(torre => ({
          ...torre,
          // Keep original structure but ensure valores is available
          valores: torre.valores || [],
          // Add direct access properties for backward compatibility
          urlImgPrincipal: torre.urlImgPrincipal,
          nombre: torre.nombre,
          descripcion: torre.descripcion,
          montoSalida: torre.montoSalida,
          fechaFin: torre.fechaFin
        }));
        dispatch(setFeaturedCars({ scope, cars: transformedCars }));
      } else {
        dispatch(setFeaturedCars({ scope, cars: [] }));
      }
    } catch {
      dispatch(setError({ scope, error: "Error al recuperar autos" }));
      dispatch(setFeaturedCars({ scope, cars: [] }));
    } finally {
      dispatch(setLoading({ scope, loading: false }));
    }
  };
};

export const startSearchCars = (searchQuery, page = 1, pageSize = 6, sortBy = '1', scope = 'main') => {
  return async (dispatch) => {
    try {
      dispatch(setLoading({ scope, loading: true }));
      dispatch(clearError({ scope }));
      // Usar el endpoint de search existente
      const searchTerm = searchQuery || 'auto';
      // Aquí deberías poner el endpoint real de búsqueda
      const endpoint = `https://dev-backend.uniquemotors.mx/api/Search/GetSearch/${encodeURIComponent(searchTerm)}?page=${page}&pageSize=${pageSize}`;
      let response = null;
      try {
        response = await fetch("get", endpoint);
      } catch {}
      if (response && response.ok && response.data && Array.isArray(response.data.torres)) {
        // Transform API data to include valores for easier access
        const transformedCars = response.data.torres.map(torre => ({
          ...torre,
          // Keep original structure but ensure valores is available
          valores: torre.valores || [],
          // Add direct access properties for backward compatibility
          urlImgPrincipal: torre.urlImgPrincipal,
          nombre: torre.nombre,
          descripcion: torre.descripcion,
          montoSalida: torre.montoSalida,
          fechaFin: torre.fechaFin
        }));
        dispatch(setFeaturedCars({ scope, cars: transformedCars }));
      } else {
        dispatch(setFeaturedCars({ scope, cars: [] }));
      }
    } catch (error) {
      dispatch(setError({ scope, error: "Error en la búsqueda" }));
      dispatch(setFeaturedCars({ scope, cars: [] }));
    } finally {
      dispatch(setLoading({ scope, loading: false }));
    }
  };
};