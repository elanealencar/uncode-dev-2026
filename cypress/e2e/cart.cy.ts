describe("Cart flow", () => {
  it("adds product to cart and updates quantities", () => {
    cy.visit("/");

    // Se o drawer estiver montado, tenta fechar SEM depender de :visible
    cy.get("body").then(($body) => {
      if ($body.find('[data-testid="close-cart"]').length) {
        cy.get('[data-testid="close-cart"]').click({ force: true });
      }
    });

    // abre o primeiro produto
    cy.get('a[href^="/product/"]').first().click();

    // adiciona ao carrinho
    cy.get('[data-testid="add-to-cart"]').click();

    // abre carrinho (force para evitar overlay/transição)
    cy.get('[data-testid="open-cart"]').click({ force: true });
    cy.get('[data-testid="cart-drawer"]').should("exist");

    // pega o id do primeiro item do carrinho
    cy.get('[data-testid^="cart-item-"]')
      .first()
      .invoke("attr", "data-testid")
      .then((tid) => {
        const id = (tid || "").replace("cart-item-", "");

        cy.get(`[data-testid="inc-${id}"]`).click({ force: true });
        cy.get(`[data-testid="qty-${id}"]`).should("contain", "2");

        cy.get(`[data-testid="dec-${id}"]`).click({ force: true });
        cy.get(`[data-testid="qty-${id}"]`).should("contain", "1");

        cy.get(`[data-testid="remove-${id}"]`).click({ force: true });
        
        cy.get('[data-testid="cart-empty"]')
        .should("exist")
        .and("contain.text", "Seu carrinho está vazio");
      });
  });
});
