import 'reflect-metadata'
import { DIContainer } from '../container';

export function Controller(path: string): ClassDecorator {
    return function (target: any) {
        const metadata = Reflect.getMetadata('design:paramtypes', target);
        DIContainer.firstPush({injectDependency: metadata[0], dependency: target});
        Reflect.defineMetadata('/' + path, Object.getOwnPropertyNames(target.prototype), target)
    }
}