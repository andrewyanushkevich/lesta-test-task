import { Tank } from "./tanks.types";

export function getTanks(): Promise<Tank[]> {
  return fetch(
    "https://api.tanki.su/wot/encyclopedia/vehicles/?application_id=22716c2a0bff5e7fbced747f4c19b614&fields=tank_id,name,description,tier,images,nation,type,short_name,price_gold                                      "
  )
    .then((response) => response.json())
    .then((data) => Object.values<Tank>(data.data))
    .catch((error) => {
      console.error("Error fetching tanks:", error);
      return [];
    });
}
