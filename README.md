# Pruebas del Formulario de Registro de Estudiantes

## Descripción

Este proyecto contiene pruebas unitarias y funcionales para validar el formulario de registro de estudiantes universitarios. Las pruebas están separadas en:

- `tests/unit/`: pruebas unitarias con Jest
- `cypress/`: pruebas funcionales E2E con Cypress

Las pruebas cubren:

- **Identificación**: Validación de longitud mínima y caracteres permitidos
- **Nombre**: Validación de formato y caracteres especiales (tildes, ñ)
- **Apellido**: Validación de formato y caracteres especiales
- **Correo Electrónico**: Validación de formato de email
- **País**: Validación de campo obligatorio
- **Carrera**: Validación de selección obligatoria
- **Fecha de Nacimiento**: Validación de fechas válidas y futuras
- **Edad**: Cálculo correcto basado en fecha de nacimiento

## Requisitos

- Node.js (versión 14 o superior)
- npm (incluido con Node.js)

## Instalación

1. Abre una terminal en la carpeta del proyecto
2. Ejecuta el comando de instalación:

```bash
npm install
```

Esto instalará Jest y todas las dependencias necesarias.

## Ejecución de Pruebas

### Ejecutar todas las pruebas

```bash
npm test
```

### Ejecutar pruebas en modo observación (watch)

```bash
npm run test:watch
```

Esto ejecutará las pruebas nuevamente cada vez que guardes cambios en los archivos.

### Ejecutar pruebas con reporte de cobertura

```bash
npm run test:coverage
```

Esto mostrará un reporte indicando qué porcentaje de código está cubierto por las pruebas.

### Ejecutar pruebas en modo verbose

```bash
npm run test:verbose
```

Esto mostrará más detalles sobre cada prueba.

### Ejecutar pruebas Cypress

```bash
npm run cypress:open
```

```bash
npm run cypress:run
```

Para ejecutar los tests funcionales en un flujo CI se usa:

```bash
npm run test:e2e
```

Esto levanta un servidor local y ejecuta Cypress contra `http://localhost:3000`.

## Estructura de Pruebas

Las pruebas están organizadas en suites (describe blocks) para cada campo del formulario:

### Pruebas de Identificación (12 pruebas)
- Validación de campos obligatorios
- Validación de longitud mínima (5 caracteres)
- Validación de caracteres permitidos (solo números y letras)
- Rechazo de espacios y caracteres especiales

### Pruebas de Nombre (10 pruebas)
- Validación de campo obligatorio
- Validación de longitud mínima (2 caracteres)
- Soporte para letras, tildes y ñ
- Rechazo de números y caracteres especiales

### Pruebas de Apellido (8 pruebas)
- Validación de campo obligatorio
- Validación de longitud mínima
- Soporte para nombres compuestos
- Soporte para caracteres acentuados

### Pruebas de Correo (12 pruebas)
- Validación de formato de email
- Soporte para correos complejos
- Rechazo de formatos inválidos

### Pruebas de País (5 pruebas)
- Validación de campo obligatorio
- Aceptación de diversos formatos

### Pruebas de Carrera (8 pruebas)
- Validación de selección obligatoria
- Validación de opciones permitidas

### Pruebas de Fecha de Nacimiento (7 pruebas)
- Validación de fechas válidas
- Rechazo de fechas futuras
- Validación de formato

### Pruebas de Cálculo de Edad (7 pruebas)
- Cálculo correcto de edad
- Consideración de meses de cumpleaños
- Manejo de casos especiales

### Pruebas de Integración (7 pruebas)
- Validación completa del formulario
- Detección de múltiples errores simultáneos
- Validación con caracteres especiales españoles

## Total de Pruebas

**88 pruebas unitarias** que cubren todos los escenarios posibles de validación del formulario.

## Ejemplo de Salida

Cuando ejecutas `npm test`, verás algo similar a:

```
 PASS  formulario.test.js
  Validación de Identificación
    ✓ Debe rechazar identificación vacía (5 ms)
    ✓ Debe rechazar identificación con solo espacios (1 ms)
    ✓ Debe rechazar identificación con menos de 5 caracteres
    ...

  Validación de Nombre
    ✓ Debe rechazar nombre vacío
    ✓ Debe rechazar nombre con solo espacios
    ...

Test Suites: 1 passed, 1 total
Tests:       88 passed, 88 total
Snapshots:   0 total
Time:        2.345 s
```

## Integración con el Formulario HTML

Para integrar estas pruebas en tu formulario HTML, sigue estos pasos:

1. **Extrae los validadores del HTML** a un archivo JavaScript separado (`validators.js`)
2. **Usa el archivo de pruebas** (`formulario.test.js`) con Jest
3. **Ejecuta las pruebas** antes de deployar tu aplicación

## Casos de Uso Cubiertos

✅ Campos vacíos  
✅ Campos con solo espacios  
✅ Caracteres especiales y números en campos de texto  
✅ Formato de email inválido  
✅ Fechas inválidas  
✅ Fechas futuras  
✅ Caracteres acentuados (españoles)  
✅ Límites de longitud  
✅ Validación integrada de múltiples campos  

## Mejoras Sugeridas

Para mejorar aún más la cobertura de pruebas, considera:

1. **Pruebas de integración DOM**: Usa jsdom o testing-library para probar el comportamiento en el navegador
2. **Pruebas de duplicados**: Implementa lógica para verificar identificaciones y correos duplicados
3. **Pruebas de performance**: Mide el tiempo de validación
4. **Snapshots**: Crea snapshots de datos válidos

## Licencia

MIT

---

**Nota**: Estas pruebas están diseñadas específicamente para validar la lógica de negocio del formulario. Para pruebas de interfaz de usuario, se recomienda usar librerías adicionales como `@testing-library/jest-dom`.
