import app from "./src/app";
import { envConfig } from "./src/config/config";

function startServer() {
    const PORT = envConfig.port || 4000
  app.listen(envConfig.port, () => {
    console.log(`Server is running in port ${PORT}`);
  });
}
startServer()
