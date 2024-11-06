
# Feedback Yourself

O Feedback  Yourself é uma aplicação de registro de notas pessoais com objetivo de desenvolvimento pessoal. Ela permite aos usuários fazer login, criar, editar, excluir e pesquisar notas de forma simples e eficiente. Além disso, os usuários podem gerenciar seu perfil, incluindo nome, e-mail e foto de perfil.

## Funcionalidades

- **Autenticação de Usuários**
    - Registro de novos usuários.
    - Login seguro com autenticação via token JWT.
    - Manutenção de sessão com cookies, permitindo que o usuário continue logado.
    - Validação para contas únicas, nota sem titulo ou conteudo, etc...
    - Pagina home, botão de loggout.


- **Gerenciamento de Notas**
    - Criação, visualização, edição e exclusão de notas.
    - Pesquisa de notas por título e conteúdo.
    - Armazenamento das notas de cada usuário no banco de dados PostgreSQL.

- **Edição de Perfil**
    - O usuário pode editar suas informações pessoais, como nome, email e senha.
    - Upload de foto de perfil que será exibida na área do usuário.


## Tecnologia utilizada


- **Back-end:** 
    - Node.js
    - Express.js
    - JWT para autenticação
    - PostgreSQL como banco de dados
    - Prisma ORM

- **Front-end:** 
    - React.js com Vite
    - Tailwind CSS
    - Shadcn para o modal
- **Outros:**
    - Docker para containerização
    - Biome
    
## Demonstração
Deploy: https://bullet-journal-front.vercel.app/


https://github.com/user-attachments/assets/51008827-aa13-4aa4-94db-521b521776d8





## Aprendizados

Durante o desenvolvimento do **Bullet Journal**, enfrentei alguns desafios técnicos que exigiram solução criativa e aprendizado. Aqui estão alguns dos principais:
1.  **Autenticação e Armazenamento Seguro**
   - A autenticação foi um desafio, especialmente ao configurar o JWT corretamente. A dificuldade foi garantir que o token fosse armazenado de forma segura, com a aplicação tratando adequadamente as permissões de acesso.
 
2.  **Gerenciamento de Imagens no Perfil**
   - Ao implementar a funcionalidade de foto de perfil, precisei garantir que as imagens fossem armazenadas corretamente e exibidas de maneira consistente, independentemente do tamanho ou formato da imagem.
   
3.  **Conexão do Front-end com o Back-end**
   - A comunicação entre o front-end e o back-end usando o JWT como método de autenticação foi um desafio. Tive que garantir que os headers da requisição fossem configurados corretamente para enviar o token nas chamadas da API.
4.  **Acessibilidade**
   - A foto do profile não podia ser acessada pela tecla tab, o que dificulta acessbilidade para pessoas que precisam da tecla, então a lógica do profile teve que ser alterada para que fosse visto com um botão.



## Futuras implementações


- Adicionaria um mood as notas no banco de dados para poder atribuir uma cor a ela, verde para dias bons, amarelo dias normais, vermelho dias ruins.
