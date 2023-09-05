import { AppFactory } from "./../framework";
import { AppModule } from "./app.module";

const app = AppFactory.create(AppModule);

app.listen(3000, () => console.log('Server started!'));