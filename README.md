# Podcast Manager

## Descrição

O Podcast Manager é uma aplicação inspirada no estilo da Netflix, que permite centralizar diferentes episódios de podcasts separados por categoria. Este projeto visa facilitar o acesso e a organização de episódios de podcasts em formato de vídeo, proporcionando uma experiência de navegação intuitiva e agradável para os usuários.

Criando uma API completa e eficiente utilizando Node.js e o framework Express, esta API proporciona integração com informações detalhadas sobre **podcasts, episódios, categorias e links de vídeos**. É ideal para plataformas que demandam acesso rápido e confiável a conteúdos e estatísticas atualizadas, suportando a criação de uma interface de usuário fluída e responsiva.

## Funcionalidades

- **Listar os episódios de podcasts em sessões de categorias:** Os episódios são organizados em categorias como saúde, bodybuilder, mentalidade e humor, permitindo aos usuários explorar facilmente os conteúdos disponíveis.
- **Filtrar episódios por nome de podcast:** Os usuários podem realizar buscas específicas por nome de podcast, facilitando o acesso aos episódios desejados.

## Implementação

### Listar os episódios de podcasts em sessões de categorias

- **Endpoint:** `GET /list`
- **Descrição:** Retorna uma lista de episódios de podcasts organizados por categorias.
- **Exemplo de resposta:**

```json
[
  {
    "podcastName": "flow",
    "episode": "CBUM - Flow #319",
    "videoId": "pQSuQmUfS30",
    "cover": "https://i.ytimg.com/vi/pQSuQmUfS30/maxresdefault.jpg",
    "link": "https://www.youtube.com/watch?v=pQSuQmUfS30",
    "categories": ["saúde", "esporte", "bodybuilder"]
  },
  {
    "podcastName": "flow",
    "episode": "RUBENS BARRICHELLO - Flow #339",
    "videoId": "4KDGTdiOV4I",
    "cover": "https://i.ytimg.com/vi/4KDGTdiOV4I/maxresdefault.jpg",
    "link": "https://www.youtube.com/watch?v=4KDGTdiOV4I",
    "categories": ["esporte", "corrida"]
  }
]
```

### Filtrar episódios por nome de podcast

- **Endpoint:** `GET /episode?podcastName={nome}`
- **Descrição:** Retorna uma lista de episódios de podcast com base no nome do podcast fornecido.
- **Exemplo de requisição:** `GET /episode?podcastName=flow`

## Operações CRUD (Testando a API)

A aplicação foi evoluída para uma API RESTful completa com operações de CRUD (Criar, Ler, Atualizar, Deletar), gravando os dados localmente no arquivo `podcasts.json`.

Você pode testar os endpoints de duas maneiras principais: via **Navegador (JavaScript Console)** ou via **Terminal do Windows (PowerShell)**.

### 1. Criar um Episódio (POST)

- **Endpoint:** `POST /api/podcasts`

**Via Navegador (Console/JS):**

```javascript
fetch("http://localhost:3333/api/podcasts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    podcastName: "meu_podcast",
    episode: "Episódio de Teste CRUD",
    videoId: "teste123",
    cover: "https://minhaimagem.com/cover.jpg",
    link: "https://youtube.com/watch?v=teste123",
    categories: ["tecnologia", "programação"],
  }),
})
  .then((res) => res.json())
  .then(console.log);
```

**Via Terminal (PowerShell):**

```powershell
Invoke-RestMethod -Uri "http://localhost:3333/api/podcasts" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"podcastName": "meu_podcast", "episode": "Episódio de Teste CRUD", "videoId": "teste123", "cover": "https://minhaimagem.com/cover.jpg", "link": "https://youtube.com/watch?v=teste123", "categories": ["tecnologia", "programação"]}'
```

### 2. Atualizar um Episódio (PATCH)

- **Endpoint:** `PATCH /api/podcasts/:videoId`

**Via Navegador (Console/JS):**

```javascript
fetch("http://localhost:3333/api/podcasts/teste123", {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    podcastName: "nome_atualizado",
  }),
})
  .then((res) => res.json())
  .then(console.log);
```

**Via Terminal (PowerShell):**

```powershell
Invoke-RestMethod -Uri "http://localhost:3333/api/podcasts/teste123" -Method PATCH -Headers @{"Content-Type"="application/json"} -Body '{"podcastName": "nome_atualizado"}'
```

### 3. Excluir um Episódio (DELETE)

- **Endpoint:** `DELETE /api/podcasts/:videoId`

**Via Navegador (Console/JS):**

```javascript
fetch("http://localhost:3333/api/podcasts/teste123", {
  method: "DELETE",
})
  .then((res) => res.json())
  .then(console.log);
```

**Via Terminal (PowerShell):**

```powershell
Invoke-RestMethod -Uri "http://localhost:3333/api/podcasts/teste123" -Method DELETE
```

## Tecnologias Utilizadas

- **[TypeScript](https://www.typescriptlang.org/):** Linguagem de programação utilizada para o desenvolvimento do projeto.
- **[Tsup](https://github.com/egoist/tsup):** Ferramenta de construção e empacotamento para projetos TypeScript.
- **[Tsx](https://github.com/egoist/tsx):** Compilador TypeScript que suporta a construção de projetos.
- **[Node.js](https://nodejs.org/):** Ambiente de execução JavaScript que permite executar código JavaScript do lado do servidor.
- **[@types/node](https://www.npmjs.com/package/@types/node):** Pacote de definições de tipos para Node.js para auxiliar no desenvolvimento com TypeScript.

## Como Utilizar

Para utilizar este projeto localmente, siga o passo a passo abaixo:

1. **Clone este repositório:**
   ```bash
   git clone https://github.com/PedroZef/nodejs-express-api_2026.git
   ```
2. **Acesse o diretório do projeto:**
   ```bash
   cd nodejs-express-api_2026
   ```
3. **Instale as dependências:**
   ```bash
   npm install
   ```
4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run start:dev
   ou
   npm run start:watch
   ```
5. **Acesse a documentação do projeto:**
   - O projeto contém uma pasta `docs/` que detalha o domínio, os fluxos e as especificações técnicas da aplicação. Leia o arquivo [`docs/app.md`](docs/app.md) para obter uma visão mais aprofundada da arquitetura e das futuras implementações.
6. **Teste os Endpoints:**
   - Abra o navegador ou o Postman/Insomnia e acesse `http://localhost:3333/api/list` (ou a porta que estiver configurada) para listar os episódios.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir problemas ou enviar solicitações de recebimento (pull requests) para melhorar este projeto.

## Licença

Este projeto está licenciado sob a licença [MIT](https://opensource.org/licenses/MIT). Veja o arquivo de [Licença](https://opensource.org/licenses/MIT) para mais detalhes.
