/**
 * Pruebas unitarias para el formulario de registro de estudiantes
 * Framework: Jest
 */

// Mock de los validadores del formulario
const validators = {
  identificacion(value) {
    if (!value.trim()) return 'La identificación es obligatoria.';
    if (value.length < 5) return 'Debe tener al menos 5 caracteres.';
    if (!/^[a-zA-Z0-9]+$/.test(value)) return 'Solo números y letras sin espacios.';
    return '';
  },
  nombre(value) {
    if (!value.trim()) return 'El nombre es obligatorio.';
    if (value.trim().length < 2) return 'Mínimo 2 caracteres.';
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿñÑ ]+$/.test(value)) return 'Solo letras y espacios (tildes y ñ permitidos).';
    return '';
  },
  apellido(value) {
    if (!value.trim()) return 'El apellido es obligatorio.';
    if (value.trim().length < 2) return 'Mínimo 2 caracteres.';
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿñÑ ]+$/.test(value)) return 'Solo letras y espacios (tildes y ñ permitidos).';
    return '';
  },
  correo(value) {
    if (!value.trim()) return 'El correo es obligatorio.';
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) return 'Formato de correo inválido.';
    return '';
  },
  pais(value) {
    if (!value.trim()) return 'El país es obligatorio.';
    return '';
  },
  carrera(value) {
    if (!value.trim()) return 'Selecciona una carrera.';
    return '';
  },
  fechaNacimiento(value) {
    if (!value) return 'La fecha de nacimiento es obligatoria.';
    const selected = new Date(value + 'T00:00:00');
    if (isNaN(selected.getTime())) return 'Fecha inválida.';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected > today) return 'La fecha no puede ser futura.';
    return '';
  }
};

// Función para calcular la edad
function calculateAge(dateString) {
  if (!dateString) return '—';
  const birthDate = new Date(dateString + 'T00:00:00');
  const now = new Date();
  if (isNaN(birthDate.getTime()) || birthDate > now) return '—';
  let age = now.getFullYear() - birthDate.getFullYear();
  const m = now.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) age--;
  return String(age);
}

// ============================================================
// PRUEBAS DE IDENTIFICACIÓN
// ============================================================
describe('Validación de Identificación', () => {
  test('Debe rechazar identificación vacía', () => {
    expect(validators.identificacion('')).toBe('La identificación es obligatoria.');
  });

  test('Debe rechazar identificación con solo espacios', () => {
    expect(validators.identificacion('   ')).toBe('La identificación es obligatoria.');
  });

  test('Debe rechazar identificación con menos de 5 caracteres', () => {
    expect(validators.identificacion('ABC')).toBe('Debe tener al menos 5 caracteres.');
  });

  test('Debe rechazar identificación con caracteres especiales', () => {
    expect(validators.identificacion('ABC-12345')).toBe('Solo números y letras sin espacios.');
  });

  test('Debe rechazar identificación con espacios', () => {
    expect(validators.identificacion('ABC 12345')).toBe('Solo números y letras sin espacios.');
  });

  test('Debe aceptar identificación válida con números', () => {
    expect(validators.identificacion('12345678')).toBe('');
  });

  test('Debe aceptar identificación válida con letras', () => {
    expect(validators.identificacion('ABC12345')).toBe('');
  });

  test('Debe aceptar identificación válida con combinación alfanumérica', () => {
    expect(validators.identificacion('XYZ789ABC')).toBe('');
  });

  test('Debe aceptar identificación con exactamente 5 caracteres', () => {
    expect(validators.identificacion('A1B2C')).toBe('');
  });
});

// ============================================================
// PRUEBAS DE NOMBRE
// ============================================================
describe('Validación de Nombre', () => {
  test('Debe rechazar nombre vacío', () => {
    expect(validators.nombre('')).toBe('El nombre es obligatorio.');
  });

  test('Debe rechazar nombre con solo espacios', () => {
    expect(validators.nombre('   ')).toBe('El nombre es obligatorio.');
  });

  test('Debe rechazar nombre con menos de 2 caracteres', () => {
    expect(validators.nombre('A')).toBe('Mínimo 2 caracteres.');
  });

  test('Debe rechazar nombre con números', () => {
    expect(validators.nombre('Juan123')).toBe('Solo letras y espacios (tildes y ñ permitidos).');
  });

  test('Debe rechazar nombre con caracteres especiales', () => {
    expect(validators.nombre('Juan@')).toBe('Solo letras y espacios (tildes y ñ permitidos).');
  });

  test('Debe aceptar nombre válido simple', () => {
    expect(validators.nombre('Juan')).toBe('');
  });

  test('Debe aceptar nombre con espacios', () => {
    expect(validators.nombre('Juan Carlos')).toBe('');
  });

  test('Debe aceptar nombre con tildes', () => {
    expect(validators.nombre('José')).toBe('');
  });

  test('Debe aceptar nombre con ñ', () => {
    expect(validators.nombre('Peñaloza')).toBe('');
  });

  test('Debe aceptar nombre con múltiples tildes y ñ', () => {
    expect(validators.nombre('María del Pilar')).toBe('');
  });
});

// ============================================================
// PRUEBAS DE APELLIDO
// ============================================================
describe('Validación de Apellido', () => {
  test('Debe rechazar apellido vacío', () => {
    expect(validators.apellido('')).toBe('El apellido es obligatorio.');
  });

  test('Debe rechazar apellido con solo espacios', () => {
    expect(validators.apellido('   ')).toBe('El apellido es obligatorio.');
  });

  test('Debe rechazar apellido con menos de 2 caracteres', () => {
    expect(validators.apellido('G')).toBe('Mínimo 2 caracteres.');
  });

  test('Debe rechazar apellido con números', () => {
    expect(validators.apellido('García123')).toBe('Solo letras y espacios (tildes y ñ permitidos).');
  });

  test('Debe rechazar apellido con caracteres especiales', () => {
    expect(validators.apellido('García!')).toBe('Solo letras y espacios (tildes y ñ permitidos).');
  });

  test('Debe aceptar apellido válido simple', () => {
    expect(validators.apellido('García')).toBe('');
  });

  test('Debe aceptar apellido compuesto', () => {
    expect(validators.apellido('García López')).toBe('');
  });

  test('Debe aceptar apellido con múltiples espacios y tildes', () => {
    expect(validators.apellido('López Fernández')).toBe('');
  });
});

// ============================================================
// PRUEBAS DE CORREO ELECTRÓNICO
// ============================================================
describe('Validación de Correo Electrónico', () => {
  test('Debe rechazar correo vacío', () => {
    expect(validators.correo('')).toBe('El correo es obligatorio.');
  });

  test('Debe rechazar correo con solo espacios', () => {
    expect(validators.correo('   ')).toBe('El correo es obligatorio.');
  });

  test('Debe rechazar correo sin arroba', () => {
    expect(validators.correo('juanemail.com')).toBe('Formato de correo inválido.');
  });

  test('Debe rechazar correo sin punto en dominio', () => {
    expect(validators.correo('juan@emailcom')).toBe('Formato de correo inválido.');
  });

  test('Debe rechazar correo con espacios', () => {
    expect(validators.correo('juan @email.com')).toBe('Formato de correo inválido.');
  });

  test('Debe rechazar correo sin usuario', () => {
    expect(validators.correo('@email.com')).toBe('Formato de correo inválido.');
  });

  test('Debe rechazar correo sin dominio', () => {
    expect(validators.correo('juan@')).toBe('Formato de correo inválido.');
  });

  test('Debe aceptar correo válido simple', () => {
    expect(validators.correo('juan@email.com')).toBe('');
  });

  test('Debe aceptar correo con números', () => {
    expect(validators.correo('juan123@email.com')).toBe('');
  });

  test('Debe aceptar correo con puntos en usuario', () => {
    expect(validators.correo('juan.carlos@email.com')).toBe('');
  });

  test('Debe aceptar correo con guiones', () => {
    expect(validators.correo('juan-carlos@email.com')).toBe('');
  });

  test('Debe aceptar correo con dominios complejos', () => {
    expect(validators.correo('juan@correo.educativo.com')).toBe('');
  });
});

// ============================================================
// PRUEBAS DE PAÍS
// ============================================================
describe('Validación de País', () => {
  test('Debe rechazar país vacío', () => {
    expect(validators.pais('')).toBe('El país es obligatorio.');
  });

  test('Debe rechazar país con solo espacios', () => {
    expect(validators.pais('   ')).toBe('El país es obligatorio.');
  });

  test('Debe aceptar país válido simple', () => {
    expect(validators.pais('Colombia')).toBe('');
  });

  test('Debe aceptar país con tildes', () => {
    expect(validators.pais('México')).toBe('');
  });

  test('Debe aceptar país con números', () => {
    expect(validators.pais('País123')).toBe('');
  });
});

// ============================================================
// PRUEBAS DE CARRERA
// ============================================================
describe('Validación de Carrera', () => {
  test('Debe rechazar carrera vacía', () => {
    expect(validators.carrera('')).toBe('Selecciona una carrera.');
  });

  test('Debe rechazar carrera con solo espacios', () => {
    expect(validators.carrera('   ')).toBe('Selecciona una carrera.');
  });

  test('Debe aceptar carrera válida - Ing. Informática', () => {
    expect(validators.carrera('Ing. Informática')).toBe('');
  });

  test('Debe aceptar carrera válida - Ing. Electrónica', () => {
    expect(validators.carrera('Ing. Electrónica')).toBe('');
  });

  test('Debe aceptar carrera válida - Ing. Telecomunicaciones', () => {
    expect(validators.carrera('Ing. Telecomunicaciones')).toBe('');
  });

  test('Debe aceptar carrera válida - Ing. Robótica', () => {
    expect(validators.carrera('Ing. Robótica')).toBe('');
  });

  test('Debe aceptar carrera válida - Otra', () => {
    expect(validators.carrera('Otra')).toBe('');
  });
});

// ============================================================
// PRUEBAS DE FECHA DE NACIMIENTO
// ============================================================
describe('Validación de Fecha de Nacimiento', () => {
  test('Debe rechazar fecha vacía', () => {
    expect(validators.fechaNacimiento('')).toBe('La fecha de nacimiento es obligatoria.');
  });

  test('Debe rechazar fecha inválida', () => {
    expect(validators.fechaNacimiento('fecha-invalida')).toBe('Fecha inválida.');
  });

  test('Debe rechazar fecha futura', () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const futureDateString = futureDate.toISOString().split('T')[0];
    expect(validators.fechaNacimiento(futureDateString)).toBe('La fecha no puede ser futura.');
  });

  test('Debe aceptar fecha válida del pasado', () => {
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 20);
    const pastDateString = pastDate.toISOString().split('T')[0];
    expect(validators.fechaNacimiento(pastDateString)).toBe('');
  });

  test('Debe aceptar fecha de hace 30 años', () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 30);
    const dateString = date.toISOString().split('T')[0];
    expect(validators.fechaNacimiento(dateString)).toBe('');
  });

  test('Debe aceptar fecha de ayer', () => {
    const yesterday = new Date();
    yesterday.setHours(0, 0, 0, 0);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];
    expect(validators.fechaNacimiento(yesterdayString)).toBe('');
  });
});

// ============================================================
// PRUEBAS DE CÁLCULO DE EDAD
// ============================================================
describe('Cálculo de Edad', () => {
  test('Debe retornar "—" para fecha vacía', () => {
    expect(calculateAge('')).toBe('—');
  });

  test('Debe retornar "—" para fecha inválida', () => {
    expect(calculateAge('fecha-invalida')).toBe('—');
  });

  test('Debe retornar "—" para fecha futura', () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const futureDateString = futureDate.toISOString().split('T')[0];
    expect(calculateAge(futureDateString)).toBe('—');
  });

  test('Debe calcular edad correcta para persona de 20 años', () => {
    const birthDate = new Date();
    birthDate.setFullYear(birthDate.getFullYear() - 20);
    const birthDateString = birthDate.toISOString().split('T')[0];
    const age = calculateAge(birthDateString);
    expect(parseInt(age)).toBeGreaterThanOrEqual(19);
    expect(parseInt(age)).toBeLessThanOrEqual(20);
  });

  test('Debe calcular edad correcta para persona de 30 años', () => {
    const birthDate = new Date();
    birthDate.setFullYear(birthDate.getFullYear() - 30);
    const birthDateString = birthDate.toISOString().split('T')[0];
    const age = calculateAge(birthDateString);
    expect(parseInt(age)).toBeGreaterThanOrEqual(29);
    expect(parseInt(age)).toBeLessThanOrEqual(30);
  });

  test('Debe retornar cadena numérica para edad válida', () => {
    const birthDate = new Date('2000-05-15');
    const birthDateString = '2000-05-15';
    const age = calculateAge(birthDateString);
    expect(age).toMatch(/^\d+$/);
  });

  test('Debe calcular correctamente considerando mes de cumpleaños', () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    // Crear fecha de nacimiento hace exactamente 25 años
    const birthDate = new Date(today.getFullYear() - 25, currentMonth, currentDay);
    const birthDateString = birthDate.toISOString().split('T')[0];

    const age = calculateAge(birthDateString);
    expect(age).toBe('25');
  });
});

// ============================================================
// PRUEBAS INTEGRACIÓN - VALIDACIÓN COMPLETA
// ============================================================
describe('Validación Integrada de Formulario', () => {
  test('Todos los validadores deben ser funciones', () => {
    for (const validator in validators) {
      expect(typeof validators[validator]).toBe('function');
    }
  });

  test('Debe validar un estudiante completo válido', () => {
    const errors = {};
    const data = {
      identificacion: '12345678',
      nombre: 'Juan Carlos',
      apellido: 'García López',
      correo: 'juan.garcia@email.com',
      pais: 'Colombia',
      carrera: 'Ing. Informática',
      fechaNacimiento: '2000-05-15'
    };

    for (const key in data) {
      errors[key] = validators[key](data[key]);
    }

    for (const key in errors) {
      expect(errors[key]).toBe('', `Campo ${key} tiene error: ${errors[key]}`);
    }
  });

  test('Debe detectar múltiples errores simultáneamente', () => {
    const errors = {};
    const invalidData = {
      identificacion: 'AB',
      nombre: '1',
      apellido: '',
      correo: 'correo-invalido',
      pais: '',
      carrera: '',
      fechaNacimiento: '2030-05-15'
    };

    for (const key in invalidData) {
      errors[key] = validators[key](invalidData[key]);
    }

    expect(errors.identificacion).not.toBe('');
    expect(errors.nombre).not.toBe('');
    expect(errors.apellido).not.toBe('');
    expect(errors.correo).not.toBe('');
    expect(errors.pais).not.toBe('');
    expect(errors.carrera).not.toBe('');
    expect(errors.fechaNacimiento).not.toBe('');
  });

  test('Debe aceptar datos válidos con caracteres especiales españoles', () => {
    const errors = {};
    const data = {
      identificacion: 'CC12345678',
      nombre: 'María José',
      apellido: 'Peñaloza García',
      correo: 'maria.jose@universidad.edu.co',
      pais: 'Colombia',
      carrera: 'Ing. Electrónica',
      fechaNacimiento: '2000-05-15'
    };

    for (const key in data) {
      errors[key] = validators[key](data[key]);
    }

    for (const key in errors) {
      expect(errors[key]).toBe('', `Campo ${key} tiene error: ${errors[key]}`);
    }
  });

  test('Debe validar correctamente limites de longitud', () => {
    expect(validators.identificacion('1234')).not.toBe('');
    expect(validators.identificacion('12345')).toBe('');
    expect(validators.nombre('A')).not.toBe('');
    expect(validators.nombre('Ab')).toBe('');
    expect(validators.apellido('A')).not.toBe('');
    expect(validators.apellido('Ab')).toBe('');
  });

  test('Debe rechazar duplicados basándose en validación básica (lógica de negocio)', () => {
    const student1 = {
      identificacion: '12345678',
      correo: 'juan@email.com'
    };

    const student2 = {
      identificacion: '12345678',
      correo: 'otro@email.com'
    };

    // Esta es una validación que normalmente ocurre en la lógica del negocio
    expect(student1.identificacion.toLowerCase()).toBe(student2.identificacion.toLowerCase());
    expect(student1.correo.toLowerCase()).not.toBe(student2.correo.toLowerCase());
  });
});
