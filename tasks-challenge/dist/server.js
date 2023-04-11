import http from "http";
import { CreateTaskController } from "./controllers/CreateTaskController.js";
const server = http.createServer((req, res) => {
    new CreateTaskController().handle();
});
server.listen(3333, () => {
    console.log("> Server is running");
});
