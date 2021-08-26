# Projeto de seleção para App Masters

  Este é um projeto para seleção de estágio da App Master, onde os participantes devem desenvolver uma aplicação FrontEnd React ou Backend Nodejs.

# Objetivo

  Este projeto é um bom desafio a ser feito, e com ele é possivel comprovar:

  - O quanto entende do node ou react
  - Como organiza o código
  - Como resolve um problema usando código
  - A capacidade de seguir os requisitos fielmente, e as regras informadas
  - A capacidade de aprender algo novo
  
  Data de início: 19/08/2021.</br>
  Data limite para entrega:  23/08/2021.

# Backend

  Trata-se de um backend que fornece os jogos da steam, e permite cliente (um possível frontend), buscar um jogo, obter mais informações, favoritar e avaliar seus itens preferidos.

  Requisitos básicos:
  
    - As rotas devem partir de / (sem "api" nem nada antes)
    - GET em / deve retornar todos os registros
    - GET em /:id deve retornar o registro com todos os detalhes (type, is_free, detailed_description...)

  Recursos adicionais:
  
    - POST em /favorite/ deve incluir um favorito para um jogo(passar o token_user pelo header para o user favoritar), podendo receber o campo nota 0-5 (⭐️⭐️⭐️⭐️)
    - DEL em /favorite/:appid deve remover o favorito daquele jogo (passar o token_user pelo header para o user poder deletar somente o seu favorito)
    - GET em /favorite/ deve obter a lista de favoritos(passar token_user para o user obter seus favoritos), juntamente com os detalhes de cada jogo (type, is_free, detailed_description...)
    
    - POST em /user/ deve contar o campo name
    - GET em /user/ retorna todos os users

  Excendendo as expectativas:
  
    - Fazer cache de todos os dados obtidos da API da steam, para não consumir nada duas vezes, só irá buscar lá uma informação se não tiver sido obtida anteriorimente - fazer cache na memória
    - Publicar online

  APIs para consumo do Backend:
  
    Rota de listagem de apps: https://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json
    Rota de listagem de apps filtrando title por meio de regEx :  https://simple-api-selection.herokuapp.com/list-games/?title=race 
    Rota de detalhe de um app: https://github.com/Revadike/InternalSteamWebAPI/wiki/Get-App-Details
    
 # Ferramentas usadas:
  
   - express
   - typescript
   - axios
   - dotenv
   - knex
   - mysql2
   - ioredis
   - docker compose(mysql e redis)

# Executar API: 
  Caso a API ainda esteja no ar você pode acessar por esse link: http://18.228.136.80:3100/
  
  <h4>Caso você queira testar localmente, faça o passo a passo:</h4>
  
    git clone https://github.com/AntonioWeb-dev/Estagio-Backend
    cd Estagio-backend
    npm i
    crie o arquivo .env e defina as variáveis de ambiente, de acordo com o arquivo .env_exemplo
    sudo docker-compose up -d
    
    agora os proximos passos vão ser criar a database e as tables (não usei migrations)
    
    sudo docker ps
    sudo docker exec -i -t CONTAINER_MySql_ID /bin/bash
    mysql -u root -p
    enter password: password do sua database(definido no .env)

    CREATE DATABASE nome_da_sua_database;
    USE nome_da_sua_database;

    CREATE TABLE users (
      id int AUTO_INCREMENT NOT NULL primary key,
      name varchar(55) NOT NULL
    );
    CREATE TABLE favorites(
      favorite_id int AUTO_INCREMENT NOT NULL primary key,
      app_id int NOT NULL,
      user_id int NOT NULL,
      nota float NOT NULL,
      FOREIGN KEY (user_id) references users(id)
    );
    saia do bash do container e rode a aplicação com o comando: npm run dev


<h4>A App Master que foi responsável por esse evento com o objetivo de ensinar e observar a capacidade dos participantes para as vagas de estágio</h4>
    App Master: https://appmasters.io/pt/
  
