/// <reference types="cypress" />


describe('', () => {

    it('Register with valid credentials', () => {
        cy.visit('https://practicesoftwaretesting.com/#/auth/register');
        cy.url().should('include', 'register');
        cy.get('[id="first_name"]').type('Petar');
        cy.get('[id="first_name"]').should('have.value', 'Petar');
        cy.get('[id="last_name"]').type('Savicevic');
        cy.get('[id="last_name"]').should('have.value', 'Savicevic');
        cy.get('[id="dob"]').type('1998-04-30');
        cy.get('[id="dob"]').should('have.value', '1998-04-30');
        cy.get('[id="address"]').type('vojvode bojovica 27');
        cy.get('[id="postcode"]').type('11500');
        cy.get('[id="city"]').type('obrenovac');
        cy.get('[id="state"]').type('serbia');
        cy.get('[id="country"]').select('Serbia');
        cy.get('[id="phone"]').type('12345');
        cy.get('[id="email"]').type('provera123@gmail.com');
        cy.get('[id="password"]').type('Nesto123.');
        cy.get('[data-test="register-submit"]').click();
        cy.contains('Login').should('be.visible');
        cy.get('[id="email"]').type('provera123@gmail.com');
        cy.get('[id="password"]').type('Nesto123.');
        cy.get('[data-test="login-submit"]').click();
    });

    it('Log in with valid credentials', () => {
        cy.visit('https://practicesoftwaretesting.com/#/auth/login');
        cy.url().should('include', 'login');
        cy.contains('Login').should('be.visible');
        cy.get('[id="email"]').type('provera123@gmail.com');
        cy.get('[id="password"]').type('Nesto123.');
        cy.get('[data-test="login-submit"]').click();
    });

    it('Log in with invalid email', () => {
        cy.visit('https://practicesoftwaretesting.com/#/auth/login');
        cy.url().should('include', 'login');
        cy.contains('Login').should('be.visible');
        cy.get('[id="email"]').type('pro@gmail.com');
        cy.get('[id="password"]').type('Nesto123.');
        cy.get('[data-test="login-submit"]').click();
        cy.get('[data-test="login-error"]').should('be.visible');
    });

    it('Log in with invalid password', () => {
        cy.visit('https://practicesoftwaretesting.com/#/auth/login');
        cy.url().should('include', 'login');
        cy.contains('Login').should('be.visible');
        cy.get('[id="email"]').type('provera123@gmail.com');
        cy.get('[id="password"]').type('Nesto.');
        cy.get('[data-test="login-submit"]').click();
        cy.get('[data-test="login-error"]').should('contain.text', 'Invalid email or password');
    });

    it('Basic product search', () => {
        cy.visit('https://practicesoftwaretesting.com/#/auth/login');
        cy.url().should('include', 'login');
        cy.contains('Login').should('be.visible');
        cy.get('[id="email"]').type('provera123@gmail.com');
        cy.get('[id="password"]').type('Nesto123.');
        cy.get('[data-test="login-submit"]').click();
        cy.get('[title="Practice Software Testing - Toolshop"]').click();
        cy.get('[data-test="search-query"]').type('Hammer');
        cy.get('[data-test="search-submit"]').click();
        cy.contains('Thor Hammer').click();
        cy.get('[title="Practice Software Testing - Toolshop"]').click();
        cy.contains('Combination Pliers').click();
    });

    it('Verify Successful Payment', () => {
        cy.visit('https://practicesoftwaretesting.com/#/auth/login');
        cy.url().should('include', 'login');
        cy.contains('Login').should('be.visible');
        cy.get('[id="email"]').type('provera123@gmail.com');
        cy.get('[id="password"]').type('Nesto123.');
        cy.get('[data-test="login-submit"]').click();
        cy.get('[title="Practice Software Testing - Toolshop"]').click();
        cy.contains('Combination Pliers').click();
        cy.get('[id="btn-add-to-cart"]').click();
        cy.get('[data-test="nav-cart"]').click();
        cy.url().should('include', 'checkout');
        cy.get('[data-test="proceed-1"]').click()
            .then(() => {
                // Check if email and password fields are visible
                if (cy.get('#email').should('be.visible') && cy.get('#password').should('be.visible')) {
                    // If they are visible, fill in the login fields
                    cy.log('Filling in login fields.');
                    cy.get('#email').type('provera123@gmail.com');
                    cy.get('#password').type('Nesto123.');
                    cy.get('[data-test="login-submit"]').click({ force: true });
                    cy.contains('Proceed to checkout').click({ force: true });
                } else {
                    cy.contains('Hello Petar Savićević, you are already logged in. You can proceed to checkout.')
                        .should('be.visible')
                        .then((isVisible) => {
                            if (isVisible) {
                                cy.log('Text is visible. Clicking on "Proceed to checkout".');
                                cy.contains('Proceed to checkout').click();
                            }
                    });

                }
                cy.contains('Billing Address').should('be.visible');
                cy.get('[id="address"]').should('have.value', 'vojvode bojovica 27');
                cy.get('[id="city"]').should('have.value', 'obrenovac');
                cy.get('[id="state"]').should('have.value', 'serbia');
                cy.get('[id="country"]').should('have.value', 'RS');
                cy.get('[id="postcode"]').should('have.value', '11500');
                cy.contains('Proceed to checkout ').click({force :true});
                cy.get('[id="payment-method"]').select('Buy Now Pay Later');
                cy.get('[id="account-name"]').type('Petar');
                cy.get('[id="account-number"]').type('1234');
                cy.contains(' Confirm ').click();
                cy.get('[class="alert alert-success"]').should('have.text', 'Payment was successful');

            });
    });
});    
