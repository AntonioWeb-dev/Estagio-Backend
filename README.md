# Projeto de seleção para a App Masters

  Este é um projeto para seleção de estágio da App Master, onde os participantes devem desenvolver uma aplicação FrontEnd React ou Backend Nodejs.

# Objectivo

  Este projeto é um bom desafio a ser feito, e com ele é possivel comprovar:

  - O quanto entende do node ou react
  - Como organiza o código
  - Como resolve um problema usando código
  - A capacidade de seguir os requisitos fielmente, e as regras informadas neste email
  - A capacidade de aprender algo novo
  
  Data de início: 19/08/2021.
  Data limite para entrega:  23/08/2021.

# Backend

  Trata-se de um backend que fornece os jogos da steam, e permite cliente (um possível frontend), buscar um jogo, obter mais informações, favoritar e avaliar seus itens preferidos.

  Requisitos básicos
    - As rotas devem partir de / (sem "api" nem nada antes)
    - GET em / deve retornar todos os registros
    - GET em /:id deve retornar o registro com todos os detalhes (type, is_free, detailed_description...)

  Recursos adicionais
    - POST em /favorite/ deve incluir um favorito para um jogo, podendo receber a nota (⭐️⭐️⭐️⭐️)
    - DEL em /favorite/:appid deve remover o favorito daquele jogo
    - GET em /favorite/ deve obter a lista de favoritos, juntamente com os detalhes de cada jogo (type, is_free, detailed_description...)

  Excendendo as expectativas
    - Fazer cache de todos os dados obtidos da API da steam, para não consumir nada duas vezes, só irá buscar lá uma informação se não tiver sido obtida anteriorimente - fazer cache na memória
    - Publicar online

  APIs para consumo do Backend
    Rota de listagem de apps: https://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json
    Rota de detalhe de um app: https://github.com/Revadike/InternalSteamWebAPI/wiki/Get-App-Details
