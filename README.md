# Boas vindas ao repositório de API de Blogs!

Aqui você vai encontrar os detalhes de como foi estruturado o desenvolvimento desse projeto a partir deste repositório, utilizando as boas praticas de commits

---

# Habilidades Desenvolvidas

Nesse projeto, foi construido um back-end usando `ORM` com o pacote `sequelize` do `npm`, com a seguintes estruturas:

- Foi criado e associado tabelas usando `models` do `sequelize`
- Foi Construido endpoints para consumir os models que foi criado
- Foi criado um `CRUD` com o `ORM`

---

## O que foi desenvolvido

Foi arquiteturado e desenvolvido uma API de um CRUD posts de blog (com o Sequelize). Começando pela API, foi desenvolvidos alguns endpoints (seguindo os princípios do REST) que estão conectados ao banco de dados.

Primeiro, você irá criar uma tabela para os usuários que desejam se cadastrar na aplicação. Após isso, criará também uma tabela de Categorias para seus Posts e por fim a tabela de Posts será seu foco, guardando todas as informações dos posts realizados na plataforma. Essa é apenas uma recomendação!

---

## O desenvolvimento

Foi desenvolvido uma aplicação em `Node.js` usando o pacote `sequelize` para fazer um `CRUD` de posts.

Para desenvolver um post foi necessário usuário e login, portanto foi trabalhada a **relação entre** `user` e `post`. Também foi necessário a utilização de categorias para seus posts, assim trabalhando a relação de `posts` para `categorias` e de `categorias` para `posts`.

---

## Linter

Para garantir a qualidade do código, foi usado o [ESLint](https://eslint.org/) para fazer a sua análise estática.
