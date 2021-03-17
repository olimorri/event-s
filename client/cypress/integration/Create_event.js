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
  it('Logs user in', () => {
    cy.get('input[id=email]').type('newhost@email.com');
    cy.get('input[id=password]').type('hosty');
    cy.contains(/^Sign in$/).click();
    cy.url().should('include', '/profile');
  });
  it('Navigates to create event', () => {
    cy.get('button[id=menu-button-3]').click();
    cy.contains(/new event/i).click();
    cy.url().should('include', 'new-event');
    cy.contains(/name of event/i).type('Javascript Meetup');
    cy.contains(/location/i).type('L4 0TH');
    cy.get('select').select('Food');
    cy.contains(/duration/i).type(1);
    cy.contains(/limit of/i).type(180);
    cy.get('textarea').type('An event where dreams are made...asynchronously');
    cy.get('input[type=date]').type('2021-04-20');
    cy.contains(/^create$/i).click();
  });
  it('Searches for an event and navigates to it', () => {
    cy.contains('Events').click();
    cy.url().should('include', '/events');
    cy.get('input[id=search]').type('javascript');
    cy.contains('Javascript Meetup').click();
    cy.contains('Javascript Meetup').click();
  });
  it('Navigates to logout', () => {
    cy.get('button[id=menu-button-3]').click();
    cy.contains('Logout').click();
    cy.contains('Yes').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
