describe('Create Host User', () => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('sid');
  });
  it('Visits HomePage of Event-s', () => {
    cy.visit('http://localhost:3000/');
  });
  it('Navigates to login', () => {
    cy.get('button[id=menu-button-3]').click();
    cy.get('button[id=menuitem-1]').click();
    cy.url().should('include', '/login');
  });
  it('Navigate to create account form', () => {
    cy.contains(/create new account/i).click();
    cy.url().should('include', 'register');
  });

  const firstNameId = 'first_name';

  it('Fills out create user form and submits', () => {
    cy.get(`input[id=first_name]`).type('Hosty');
    cy.get('input[id=last_name]').type('McHostFace');
    cy.get('input[id=email]').type('newhost@email.com');
    cy.get('input[id=password]').type('hosty');
    cy.get('select').select('Host');
    cy.contains(/sign up/i).click();
    cy.url().should('include', 'profile');
  });
});
