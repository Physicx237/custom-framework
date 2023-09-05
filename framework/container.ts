export class DIContainer {
    static dependencies = [];
    static injectDependencies = [];

    static firstPush(metadata: Object) {
        DIContainer.dependencies.push(metadata)
    }

    static secondPush(metadata: Object) {
        DIContainer.injectDependencies.push(metadata)
    }
}