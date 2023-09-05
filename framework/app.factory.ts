import express, { Router } from "express";
import { DIContainer } from "./container";

class AppFactoryStatic {
    constructor() {}

    //Инициализированные контроллеры
    appInstances = [];

    create(module: any) {
        //Инициализация модуля
        new module(); 

        //Dependency injection
        const dependencies = DIContainer.dependencies; //Controllers

        const injectDependencies = DIContainer.injectDependencies; //Services

        // Процесс внедрения зависимостей
        for (let i = 0; i < dependencies.length; i++) {
            for (let j = 0; j < injectDependencies.length; j++) {
                if (dependencies[i].injectDependency === injectDependencies[j]) {
                    this.appInstances.push(new dependencies[i].dependency(new dependencies[i].injectDependency))
                }
            }
        }

        //Массив классов контроллеров
        const dependenciesMetadata = [];

        dependencies.forEach((item) => {
            dependenciesMetadata.push(item.dependency);
        })

        //Метаданные маршрутов контроллеров и их методов
        const dependenciesRoutesMetadata = [];

        //Массив маршрутов контроллеров
        const controllersRoutes = [];

        dependenciesMetadata.forEach((item, index) => {
            controllersRoutes.push(Reflect.getMetadataKeys(item)[1]);

            //Получение массива методов контроллеров
            const propertyKey = Reflect.getMetadata(controllersRoutes[index], item);

            //Методы контроллеров и их маршруты
            const methodPaths = [];
            
            for (let i = 1; i < propertyKey.length; i++) {
                methodPaths.push({ path: Reflect.getMetadata(propertyKey[i], item, propertyKey[i]).path, methods: propertyKey[i], queryMethod: Reflect.getMetadata(propertyKey[i], item, propertyKey[i]).queryMethod})
            }

            // Общие метаданные о контроллере
            dependenciesRoutesMetadata.push(
                {
                    controller: item, //Класс контроллера
                    controllerPath: Reflect.getMetadataKeys(item)[1], //Общий маршрут контроллера
                    path: methodPaths, //Методы контроллера и их маршруты
                }

            )
        })

        //Инициализация экземпляра приложения и инициализация маршутов для контроллеров и методов контроллеров
        const app = express();
        const routes = [];

        app.use(express.json());
        
        dependenciesRoutesMetadata.forEach((item, index) => {
            for (let i = 0; i < 2; i++) {
                const path = item.controllerPath + item.path[i].path;
                const method = item.path[i].queryMethod
                routes.push(Router()[method](path, (req, res) => {
                    res.json(this.appInstances[index][item.path[i].methods]());
                }));
            }
        });

        app.use(routes);
        return app;
    }
}

export const AppFactory = new AppFactoryStatic();