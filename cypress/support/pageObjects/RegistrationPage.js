export class RegistrationPage {
  visit() {
    cy.visit('/')
    return this
  }

  fillIdentification(value) {
    cy.get('#identificacion').clear().type(value)
    return this
  }

  fillName(value) {
    cy.get('#nombre').clear().type(value)
    return this
  }

  fillLastName(value) {
    cy.get('#apellido').clear().type(value)
    return this
  }

  fillEmail(value) {
    cy.get('#correo').clear().type(value)
    return this
  }

  fillCountry(value) {
    cy.get('#pais').clear().type(value)
    return this
  }

  selectCareer(value) {
    cy.get('#carrera').select(value)
    return this
  }

  fillBirthDate(value) {
    cy.get('#fechaNacimiento').clear().type(value)
    return this
  }

  submit() {
    cy.get('#btnRegistrar').click()
    return this
  }

  clearForm() {
    cy.get('#btnLimpiar').click()
    return this
  }

  getError(field) {
    const mapping = {
      identificacion: '#errIdentificacion',
      nombre: '#errNombre',
      apellido: '#errApellido',
      correo: '#errCorreo',
      pais: '#errPais',
      carrera: '#errCarrera',
      fechaNacimiento: '#errFechaNacimiento',
      edad: '#errEdad'
    }
    return cy.get(mapping[field])
  }

  shouldShowError(field, expectedMessage) {
    this.getError(field).should('be.visible').and('contain.text', expectedMessage)
    return this
  }

  shouldShowSuccess(message) {
    cy.get('#message').should('have.class', 'show').and('contain.text', message)
    return this
  }

  shouldHaveTableRow(values) {
    cy.get('#studentsTable tbody tr').last().within(() => {
      values.forEach(value => cy.contains(value))
    })
    return this
  }

  tableShouldContainStudent(identifier) {
    cy.get('#studentsTable tbody').contains('td', identifier).should('exist')
    return this
  }

  fillForm(student) {
    this.fillIdentification(student.identificacion)
      .fillName(student.nombre)
      .fillLastName(student.apellido)
      .fillEmail(student.correo)
      .fillCountry(student.pais)
      .selectCareer(student.carrera)
      .fillBirthDate(student.fechaNacimiento)
    return this
  }
}
