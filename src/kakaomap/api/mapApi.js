import axios from "axios"
import qs from "qs";

export const mapApi = {

   getMarkers : async (addresses) => {
    try {
      const response = await axios.get("/api/getMarkers", {
        params: { addresses: addresses },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "comma" });
        }
      });
      return response;
    } catch (error) {
      console.error("getMarkers Error : " + error);
      return "ERROR";
    }
  },

   getMarkerData : async (markerData, apartmentname) => {

    try {
      const response = await axios.get('/api/getMarkerData', {
        params: {
          SIGUNGU: markerData.sigungu,
          BUNGI: markerData.bungi,
          APARTMENTNAME: apartmentname,
          LAT: markerData.lat,
          LNG: markerData.lng
        }
      });
      return response
    } catch (error) {
      console.error("getMarkerData Error : " + error);
      return "ERROR";
    }

  }
}