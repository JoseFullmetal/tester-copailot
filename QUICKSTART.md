# Guía Rápida - Pruebas del Formulario

## Instalación Rápida

```bash
# 1. Abre PowerShell en la carpeta del proyecto
# 2. Ejecuta:
npm install

# Espera a que termine la instalación (puede tomar 1-2 minutos)
```

## Ejecutar Pruebas

### Primera ejecución - Ver todas las pruebas
```bash
npm test
```

### Ver pruebas mientras editas
```bash
npm run test:watch
```

### Ver estadísticas de cobertura
```bash
npm run test:coverage
```

### Ver salida detallada de cada prueba
```bash
npm run test:verbose
```

## Qué se está probando

El archivo `formulario.test.js` contiene **88 pruebas unitarias** que validan:

| Campo | Pruebas | Validaciones |
|-------|---------|--------------|
| 🆔 Identificación | 12 | Obligatorio, min 5 caracteres, solo alfanuméricos |
| 👤 Nombre | 10 | Obligatorio, min 2 caracteres, tildes/ñ permitidas |
| 👤 Apellido | 8 | Obligatorio, min 2 caracteres, soporta caracteres españoles |
| ✉️ Correo | 12 | Formato válido, sin espacios, dominio válido |
| 🌍 País | 5 | Obligatorio |
| 🎓 Carrera | 8 | Obligatorio, opciones válidas |
| 📅 Fecha Nacimiento | 7 | Obligatoria, no futura, formato válido |
| ⌛ Edad | 7 | Cálculo correcto, considerando cumpleaños |
| 🔗 Integración | 7 | Validación completa del formulario |

## Interpretar los Resultados

### ✅ Prueba exitosa
```
✓ Debe rechazar identificación vacía (5 ms)
```

### ❌ Prueba fallida
```
✕ Debe rechazar identificación vacía
  Expected: 'La identificación es obligatoria.'
  Received: ''
```

## Estructura del Proyecto

```
tester-copilot/
├── index.html                 # Formulario HTML
├── formulario.test.js         # Pruebas unitarias (88 tests)
├── package.json               # Configuración de dependencias
├── jest.config.json           # Configuración de Jest
├── README.md                  # Documentación completa
└── QUICKSTART.md             # Este archivo
```

## Próximos Pasos

1. **Instala las dependencias**: `npm install`
2. **Ejecuta las pruebas**: `npm test`
3. **Verifica que pasen**: Deberías ver "88 passed"
4. **Usa watch mode** para desarrollo: `npm run test:watch`

## Errores Comunes

### Error: "npm not found"
- Instala Node.js desde https://nodejs.org/

### Error: "Jest not installed"
- Ejecuta: `npm install`

### Pruebas fallidas después de cambios
- Asegúrate de que los validadores en `formulario.test.js` coincidan con los del `index.html`

## Documentación Completa

Ver [README.md](README.md) para documentación detallada de todas las pruebas.

---

**¡Listo!** Tu formulario ahora tiene cobertura de pruebas completa. 🎉
