# Task Manager with localStorage JS

### created by michaeliq
#### September 2021

## Task Manager -- Proposito

El proyecto pretender mostrar las poderosas caracteristicas que posee el lenguaje javascript para la persistencia de información en el navegador evitando la configuración de bases de datos para proyectos simples dónde lo importante sea garantizar los servicios que se deseen prestar a los usuarios finales.

## Cómo funciona

La interfaz dispone de un campo donde se coloca la tarea a realizar, al dar click en "create task" se añadira una lista debajo del campo dónde iran apareciendo las tareas a realizar. Se dispones de dos botones al lado derecho de cada item de la lista, uno para editar y otro para borrar la tarea.
Para garantizar la persitencia de los datos durante la sesión del navegador se hace uso de LocalStorage y se guardan las tareas en una cadena de formato JSON. Es mportante recordar que los valores alojados en localStorage no deben ser sensibles (contraseñas por ejemplo) ya que facilmente pueden ser sustraida del navegador. 

## librerias usadas

No se hace uso de frameworks en esta oporunidad más allá de Bootstrap en su version 5, también se hace uso del CDN de fontawesome y Google fonts con 'Poppins'.