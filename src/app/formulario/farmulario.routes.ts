import { Routes } from "@angular/router";

export default [
    {
        path: 'ejemplo1',
        loadComponent: () => import('./ejemplo1/ejemplo1.component'),
    },
    {
        path: 'resistencia',
        loadComponent: () => import('./resistencia/resistencia.component'),
    },
    {
        path: 'empleado',
        loadComponent: () => import('./empleados/empleados.component'),
    },
    {
        path: 'pizzeria',
        loadComponent: () => import('./pizzeria/pizzeria.component'),
    }
]as Routes