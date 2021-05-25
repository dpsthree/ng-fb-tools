import { greeting } from '../support/dashboard.po';

describe('tooling-demo', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    greeting().contains('Welcome to ng-fb-tools!');
  });
});
