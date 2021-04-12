import axios from "axios";
import consola from "consola";
import { config } from "../config/config";

export default class RegistryService {
  async register() {
    const result = await axios.put(
      `${config.SERVICE_REGISTRY_URI}/${config.NAME}/${config.VERSION}/${config.PORT}`
    );
    return result.data;
  }

  async unregister() {
    const result = await axios.delete(
      `${config.SERVICE_REGISTRY_URI}/${config.NAME}/${config.VERSION}/${config.PORT}`
    );
    console.log("\n");
    consola.success("Unregistered service with key:", result.data.data.key);
    return result.data;
  }
}
