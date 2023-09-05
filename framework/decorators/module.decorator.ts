import 'reflect-metadata'

interface Dependencies {
    dependencies: Object[],
    injectDependencies: Object[]
}

export function Module(dependencies: Dependencies): ClassDecorator {
    return function (target: any) {
        dependencies.dependencies.forEach((item: Object) => {
            Reflect.defineMetadata(item, item, target)
        });
        dependencies.injectDependencies.forEach((item: Object) => {
            Reflect.defineMetadata(item, item, target)
        });
    }
}