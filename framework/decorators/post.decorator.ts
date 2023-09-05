import 'reflect-metadata'

export function Post(path?: string): MethodDecorator {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        if (path == null) {
            Reflect.defineMetadata(propertyKey, { path: '/', queryMethod: 'post' }, target.constructor, propertyKey)
        } else {
            Reflect.defineMetadata(propertyKey, { path: '/' + path, queryMethod: 'post' }, target.constructor, propertyKey)
        }
    }
}