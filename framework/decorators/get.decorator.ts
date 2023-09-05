import 'reflect-metadata'

export function Get(path?: string): MethodDecorator {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        if (path == null) {
            Reflect.defineMetadata(propertyKey, {path: '/', queryMethod: 'get'}, target.constructor, propertyKey)
        } else {
            Reflect.defineMetadata(propertyKey, {path: '/' + path, queryMethod: 'get'}, target.constructor, propertyKey)
        }
    }
}