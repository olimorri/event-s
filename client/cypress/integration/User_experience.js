describe('Attendee User', () => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('sid');
  });
  it('Visits HomePage of Event-s', () => {
    cy.visit('http://localhost:3000/');
  });
  it('Navigates to the events page', () => {
    cy.contains('Events').click();
    cy.url().should('include', '/events');
  });
  it('Navigates to login', () => {
    cy.get('button[id=menu-button-3]').click();
    cy.get('button[id=menuitem-1]').click();
    cy.url().should('include', '/login');
  });
  it('Logs user in', () => {
    cy.get('input[id=email]').type('bob@email.com');
    cy.get('input[id=password]').type('test');
    cy.contains(/^Sign in$/).click();
    cy.url().should('include', '/profile');
  });
  it('Attends event', () => {
    cy.contains('Events').click();
    cy.url().should('include', '/events');
    cy.contains('test3').click();
    cy.contains('Attend').click();
    cy.get('button[id=cancel]').click();
    cy.contains('Attend').click();
    cy.get('button[id=confirm-attend]').click();
  });
  it('Unattends event', () => {
    cy.contains('Unattend').click();
    cy.get('button[id=cancel]').click();
    cy.contains('Unattend').click();
    cy.get('button[id=confirm-unattend]').click();
  });
  it('Searches for an event and navigates to it', () => {
    cy.contains('Events').click();
    cy.get('input[id=search]').type('test2');
    cy.contains('test2').click();
  });
  it('Navigates to logout', () => {
    cy.get('button[id=menu-button-3]').click();
    cy.contains('Logout').click();
    cy.contains('Yes').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
