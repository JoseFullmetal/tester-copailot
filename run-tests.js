#!/usr/bin/env node

/**
 * Script interactivo para ejecutar pruebas
 * Uso: node run-tests.js
 */

const { spawn } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function runCommand(command, args = []) {
  return new Promise((resolve) => {
    const proc = spawn(command, args, { stdio: 'inherit' });
    proc.on('close', (code) => resolve(code));
  });
}

async function main() {
  console.clear();
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║         PRUEBAS UNITARIAS - FORMULARIO DE ESTUDIANTES          ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  console.log('Selecciona una opción:\n');
  console.log('1) Ejecutar todas las pruebas');
  console.log('2) Ejecutar pruebas en modo observación (watch)');
  console.log('3) Generar reporte de cobertura');
  console.log('4) Ejecutar pruebas con salida detallada');
  console.log('5) Ejecutar pruebas específicas');
  console.log('6) Salir\n');

  rl.question('Ingresa tu opción (1-6): ', async (answer) => {
    console.log('\n');

    switch (answer) {
      case '1':
        console.log('▶️  Ejecutando todas las pruebas...\n');
        await runCommand('npm', ['test']);
        break;

      case '2':
        console.log('▶️  Ejecutando pruebas en modo observación...');
        console.log('💡 Presiona "a" para ejecutar todas las pruebas nuevamente');
        console.log('💡 Presiona "q" para salir\n');
        await runCommand('npm', ['run', 'test:watch']);
        break;

      case '3':
        console.log('▶️  Generando reporte de cobertura...\n');
        await runCommand('npm', ['run', 'test:coverage']);
        console.log('\n📊 Reporte disponible en: coverage/lcov-report/index.html');
        break;

      case '4':
        console.log('▶️  Ejecutando pruebas con salida detallada...\n');
        await runCommand('npm', ['run', 'test:verbose']);
        break;

      case '5':
        rl.question('\nIngresa el nombre del test a ejecutar (ej: "Identificación"): ', async (testName) => {
          console.log(`\n▶️  Ejecutando pruebas de "${testName}"...\n`);
          await runCommand('npm', ['test', '--', '-t', testName]);
          rl.close();
          process.exit(0);
        });
        return;

      case '6':
        console.log('Hasta luego! 👋\n');
        rl.close();
        process.exit(0);

      default:
        console.log('❌ Opción no válida. Intenta nuevamente.\n');
    }

    rl.close();
    process.exit(0);
  });
}

main();
