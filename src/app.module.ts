import { Module } from "./../framework";
import { PostsController, UsersController } from "./app.controller";
import { PostsService, UsersService } from "./app.service";


@Module({
    dependencies: [PostsController, UsersController],
    injectDependencies: [PostsService, UsersService]
})
export class AppModule {}