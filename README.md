# Gestor de tareas
José Luis Zuñiga
## Descripción
Este proyecto es un gestor de tareas desarrollado con Angular 16 para organizar y administrar tus tareas de manera eficiente. Permite agregar nuevas tareas, asignar personas a cada tarea y gestionar las responsabilidades de cada individuo.

## Tecnologías Utilizadas
Angular 16: Framework frontend para el desarrollo de aplicaciones web.
Node.js 16.16.0: Entorno de ejecución de JavaScript.
TypeScript: Superconjunto de JavaScript para una mejor tipado y escalabilidad.
Otras tecnologías utilizadas, como RxJS.

## Estructura del Proyecto
gestor-de-tareas/
├── src/
│   ├── app/
│   │   ├── modules/
│   │   │   └── task/
│   │   │       └── components
│   │   │           └── task-form
│   │   │           └── task-list
│   │   ├── core/
│   │   │   └── service
│   │   │       └── task.service.ts
│   │   ├── models/
│   │   │   └── person.model.ts
│   │   │   └── task.model.ts
│   │   ├── shared/
│   │   │   └── components
│   │   │       └── banner
│   ├── assets/
│   │   └── logo-velaio.png
│   ├── styles/
│   │   └── main.scss
│   │   └── global
│   │       └── reset.scss
│   ├── environments/
│   └── index.html
├── node_modules/
├── angular.json
├── package.json
└── ...
## Funcionalidades
Agregar tareas: Crea nuevas tareas con título, descripción y fecha límite.
Asignar personas: Asocia personas a tareas, definiendo sus habilidades.
Gestionar personas: Agrega, edita y elimina personas de una tarea.
Visualizar tareas: Muestra una lista de tareas filtrable por todas, terminadas y pendientes.

## Validaciones
1. Validación del Arreglo de Personas:
- El nombre no puede repetirse entre las personas asociadas a la misma tarea.
- La edad debe ser mayor a 18 años.
 -Cada persona debe tener al menos una habilidad.
 
2. Validación del Arreglo Anidado (Habilidades):
- El campo de habilidad no puede estar vacío.
- Cada persona debe tener al menos una habilidad.

## Instalación y Ejecución

### Clonar el repositorio:
git clone  https://github.com/joseluis1061/gestionDeTareas.git

### Instalar dependencias:
cd gestionDeTareas

npm install

### Iniciar el servidor de desarrollo:
ng serve
