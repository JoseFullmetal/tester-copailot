import { RegistrationPage } from '../support/pageObjects/RegistrationPage'

const page = new RegistrationPage()

describe('Formulario de registro de estudiantes - Cypress E2E', () => {
  beforeEach(() => {
    page.visit()
  })

  it('valida campos obligatorios cuando el formulario está vacío', () => {
    page.submit()
    page.shouldShowError('identificacion', 'La identificación es obligatoria.')
    page.shouldShowError('nombre', 'El nombre es obligatorio.')
    page.shouldShowError('apellido', 'El apellido es obligatorio.')
    page.shouldShowError('correo', 'El correo es obligatorio.')
    page.shouldShowError('pais', 'El país es obligatorio.')
    page.shouldShowError('carrera', 'Selecciona una carrera.')
    page.shouldShowError('fechaNacimiento', 'La fecha de nacimiento es obligatoria.')
  })

  it('valida correo inválido y fecha de nacimiento futura', () => {
    const futureDate = new Date()
    futureDate.setFullYear(futureDate.getFullYear() + 1)
    const futureDateString = futureDate.toISOString().split('T')[0]

    page.fillForm({
      identificacion: 'ABC12345',
      nombre: 'Juan',
      apellido: 'Pérez',
      correo: 'correo-invalido',
      pais: 'Colombia',
      carrera: 'Ing. Informática',
      fechaNacimiento: futureDateString
    }).submit()

    page.shouldShowError('correo', 'Formato de correo inválido.')
    page.shouldShowError('fechaNacimiento', 'La fecha no puede ser futura.')
  })

  it('registra un estudiante válido y agrega una fila a la tabla', () => {
    page.fillForm({
      identificacion: 'EST123456',
      nombre: 'Ana María',
      apellido: 'García López',
      correo: 'ana.garcia@example.com',
      pais: 'México',
      carrera: 'Ing. Robótica',
      fechaNacimiento: '2000-05-15'
    }).submit()

    page.shouldShowSuccess('Estudiante registrado con éxito.')
    page.tableShouldContainStudent('EST123456')
    page.shouldHaveTableRow(['Ana María', 'García López', 'ana.garcia@example.com', 'México', 'Ing. Robótica'])
  })

  it('registra varios estudiantes válidos y mantiene todas las filas', () => {
    const firstStudent = {
      identificacion: 'VARIOS01',
      nombre: 'Carla',
      apellido: 'Ríos',
      correo: 'carla.rios@example.com',
      pais: 'Argentina',
      carrera: 'Ing. Informática',
      fechaNacimiento: '1997-03-12'
    }

    const secondStudent = {
      identificacion: 'VARIOS02',
      nombre: 'Mateo',
      apellido: 'López',
      correo: 'mateo.lopez@example.com',
      pais: 'Uruguay',
      carrera: 'Ing. Electrónica',
      fechaNacimiento: '1996-09-04'
    }

    page.fillForm(firstStudent).submit()
    page.shouldShowSuccess('Estudiante registrado con éxito.')
    page.tableShouldContainStudent('VARIOS01')

    page.fillForm(secondStudent).submit()
    page.shouldShowSuccess('Estudiante registrado con éxito.')
    page.tableShouldContainStudent('VARIOS02')

    cy.get('#studentsTable tbody tr').should('have.length', 2)
  })

  it('detecta duplicado de identificación', () => {
    const student = {
      identificacion: 'UNI12345',
      nombre: 'Luis',
      apellido: 'Martínez',
      correo: 'luis.martinez@example.com',
      pais: 'Perú',
      carrera: 'Ing. Informática',
      fechaNacimiento: '1999-11-20'
    }

    page.fillForm(student).submit()
    page.shouldShowSuccess('Estudiante registrado con éxito.')

    page.fillForm({
      ...student,
      correo: 'otro.correo@example.com'
    }).submit()

    page.shouldShowError('identificacion', 'Identificación duplicada.')
  })

  it('detecta duplicado de correo', () => {
    const student = {
      identificacion: 'UNI54321',
      nombre: 'Paola',
      apellido: 'Gómez',
      correo: 'paola.gomez@example.com',
      pais: 'Chile',
      carrera: 'Ing. Telecomunicaciones',
      fechaNacimiento: '1998-07-25'
    }

    page.fillForm(student).submit()
    page.shouldShowSuccess('Estudiante registrado con éxito.')

    page.fillForm({
      ...student,
      identificacion: 'UNI99999'
    }).submit()

    page.shouldShowError('correo', 'Correo duplicado.')
  })

  it('detecta duplicado de identificación y correo al mismo tiempo', () => {
    const student = {
      identificacion: 'UNI88888',
      nombre: 'Diego',
      apellido: 'Ruiz',
      correo: 'diego.ruiz@example.com',
      pais: 'Colombia',
      carrera: 'Ing. Robótica',
      fechaNacimiento: '1995-12-01'
    }

    page.fillForm(student).submit()
    page.shouldShowSuccess('Estudiante registrado con éxito.')

    page.fillForm(student).submit()
    page.shouldShowError('identificacion', 'Identificación duplicada.')
    page.shouldShowError('correo', 'Correo duplicado.')
  })

  it('limpia el formulario sin borrar los estudiantes ya registrados', () => {
    page.fillForm({
      identificacion: 'LIMPIA01',
      nombre: 'Sara',
      apellido: 'Navas',
      correo: 'sara.navas@example.com',
      pais: 'Chile',
      carrera: 'Otra',
      fechaNacimiento: '1998-08-08'
    }).submit()

    page.clearForm()

    cy.get('#identificacion').should('have.value', '')
    cy.get('#nombre').should('have.value', '')
    cy.get('#apellido').should('have.value', '')
    cy.get('#correo').should('have.value', '')
    cy.get('#pais').should('have.value', '')
    cy.get('#carrera').should('have.value', '')
    cy.get('#fechaNacimiento').should('have.value', '')
    cy.get('#studentsTable tbody tr').contains('td', 'LIMPIA01').should('exist')
  })
})
