import { Post } from "../framework/decorators/post.decorator"
import { Get } from "./../framework"
import { Controller } from "./../framework"
import { PostsService, UsersService } from "./app.service"

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get('one')
    getData() {
        return this.postsService.getData()
    }

    @Post('two')
    getPosts() {
        return this.postsService.getPosts()
    }
}

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('three')
    getData() {
        return this.usersService.getData()
    }

    @Post('four')
    getUsers() {
        return this.usersService.getUsers()
    }
}