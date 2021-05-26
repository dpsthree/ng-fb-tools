import { greeting, todoList } from '../support/dashboard.po';

describe('the tooling-demo dashboard', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    greeting().contains('Welcome to ng-fb-tools!');
  });

  describe('list controls', () => {
    const mockItem = { label: 'test entry' };

    beforeEach(() => {
      cy.window().its('dashboardModel').invoke('clearItems');
      cy.window().its('dashboardModel').invoke('addItem', mockItem);
    });

    it('should display a todo list', () => {
      todoList().should('be.visible');
    });
  });
});
