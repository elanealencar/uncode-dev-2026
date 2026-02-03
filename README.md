# 🛍️ Uncode Store - E-commerce

## Desafio Tecnico - Desenvolvedor Frontend Junior

Mini e-commerce desenvolvido como **desafio técnico para a Uncode**, com foco em organização de código, componentização, lógica de carrinho, boas práticas de frontend e experiência do usuário.

🔗 **Deploy:** https://uncode-ecommerce.vercel.app/
🔗 **Repositório:** https://github.com/elanealencar/uncode-dev-2026/

---

## Funcionalidades

- Listagem de produtos
- Página de detalhes do produto
- Carrinho de compras (minicart / drawer)
  - Adicionar e remover produtos
  - Alterar quantidades
  - Total atualizado em tempo real
  - Persistência em `localStorage`
- Layout **responsivo** (mobile-first)
- Tratamento de produto inexistente (404)

---

## Tecnologias Utilizadas

- **Next.js (App Router)** - rotas dinâmicas, SSR e API Routes  
- **TypeScript** - tipagem estática e segurança de dados  
- **React** - componentização e gerenciamento de estado  
- **Context API** - estado global do carrinho  
- **Tailwind CSS** - estilização rápida e consistente  
- **Next/Image** - otimização de imagens  
- **Vercel** - deploy e ambiente de produção  

---

## Estrutura de Pastas

```bash
src/
├─ app/
│  ├─ api/
│  │  └─ products/
│  │     ├─ route.ts
│  │     └─ [id]/route.ts
│  ├─ product/
│  │  └─ [id]/
│  │     ├─ page.tsx
│  │     └─ AddToCartButton.tsx
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
│  ├─ Header.tsx
│  ├─ Footer.tsx
│  ├─ ProductCard.tsx
│  └─ CartDrawer.tsx
├─ data/
│  └─ products.json
├─ lib/
│  ├─ products.ts
│  └─ format.ts
├─ store/
│  └─ CartContext.tsx
└─ types/
   └─ product.ts
public/
└─ products/
   └─ *.png
```

## Servidor / API

Os dados dos produtos são servidos a partir do arquivo products.json através de API Routes.

| Endpoint | Descricao |
|----------|-----------|
| `GET /products` | Lista todos os produtos |
| `GET /products/:id` | Retorna um produto pelo ID |

## Acessibilidade (A11y)

O projeto segue boas práticas básicas de acessibilidade, incluindo:

- HTML semântico (header, main, footer)
- Textos alternativos em imagens
- Botões nativos e interações acessíveis
- Uso de atributos ARIA

## 🔍 SEO Básico

- Renderização server-side (SSR)
- URLs amigáveis
- Metadata estática e dinâmica (página de produto)
- Hierarquia correta de headings

## Paginas e componentes

- **Home** - Listagem de produtos com imagem, nome e preço
- **Pagina de Produto** - Detalhes completos do produto + botão "Adicionar ao carrinho"
- **Header** - Logo da loja + ícone do carrinho com quantidade de itens
- **Footer** - Simples, com informações básicas

## Minicarrinho (drawer / sidebar)

- Abre ao clicar no ícone do carrinho no header
- Lista os produtos adicionados
- Permite alterar quantidade (+/-)
- Permite remover item
- Exibe total atualizado em tempo real

## Imagens dos Produtos

As imagens dos produtos foram geradas com auxílio de IA, utilizando prompts específicos para simular fotografias de produto em estúdio, com foco em estética moderna e aplicação em e-commerce.

As imagens são armazenadas localmente em public/products para garantir:

- Melhor performance
- Estabilidade no deploy
- Independência de serviços externos

## Responsividade

- **Mobile-first**
- Deve funcionar bem em **375px** (mobile) e **1440px** (desktop)


## Como rodar o projeto localmente
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/uncode-dev-2026.git

# Acesse a pasta
cd uncode-dev-2026

# Instale as dependências
npm install

# Rode o projeto
npm run dev

A aplicação estará disponível em:
👉 http://localhost:3000
```

## Decisões Técnicas

- Context API foi utilizada por ser suficiente para o escopo do carrinho.
- Leitura dos produtos no server evita dependência de URLs internas e melhora a performance.
- Imagens locais garantem melhor controle e compatibilidade com o deploy.
- Organização de commits por etapas para facilitar entendimento da evolução do projeto.

---

## 📌 Observação

Este projeto foi desenvolvido exclusivamente para fins de avaliação técnica no processo seletivo da Uncode.