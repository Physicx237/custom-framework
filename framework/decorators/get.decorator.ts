import 'reflect-metadata'

export function Get(path?: string): MethodDecorator {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        if (path == null) {
            Reflect.defineMetadata(propertyKey, '/', target.constructor, propertyKey)
        } else {
            Reflect.defineMetadata(propertyKey, '/' + path, target.constructor, propertyKey)
        }
    }
}