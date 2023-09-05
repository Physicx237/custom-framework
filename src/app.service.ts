import { Injectable } from "./../framework";

@Injectable()
export class PostsService {
    constructor() {}

    getPosts() {
        return 'All Posts!';
    }

    getData() {
        return 'Hello Dmitry!';
    }
}

@Injectable()
export class UsersService {
    constructor() { }

    getUsers() {
        return 'All Users!';
    }

    getData() {
        return 'Hello Oleg!';
    }
}