import 'reflect-metadata'
import { DIContainer } from '../container';

export function Injectable(): ClassDecorator {
    return function (target: any) {
        DIContainer.secondPush(target);
    }
}