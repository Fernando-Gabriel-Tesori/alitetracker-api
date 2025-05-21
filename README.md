🚀 EliteTracker API
Seja bem-vindo(a) à EliteTracker API!
Essa é a engrenagem por trás do nosso app de produtividade, o EliteTracker Interface — um sistema criado para te ajudar a monitorar seus hábitos diários, organizar a rotina e manter o foco no que realmente importa.

Importante: Esta API foi pensada para funcionar junto com o frontend EliteTracker Interface. Se estiver buscando a interface visual, dá uma olhada lá! 😉

🔧 O que essa API faz?
Ela entrega tudo o que você precisa para controlar seus hábitos com eficiência:

📋 Criar, listar, editar e deletar hábitos (CRUD completo)

🔐 Autenticação segura com JWT

✅ Validação robusta dos dados com Zod

💾 Integração com banco MongoDB (via Mongoose)

⚙️ Leitura de variáveis de ambiente com dotenv

🚨 Middleware de tratamento de erros para lidar com imprevistos

💡 Tecnologias por trás da mágica
Aqui estão as ferramentas que usamos para construir a EliteTracker API:

TypeScript — segurança e organização no código

Express.js — nosso framework backend leve e poderoso

MongoDB + Mongoose — banco de dados flexível e escalável

JWT — para autenticar usuários de forma segura

Zod — validação dos dados de forma declarativa

Day.js — manipulação de datas sem dor de cabeça

Docker — ambiente isolado e pronto pra produção

⚙️ Como rodar o projeto
Siga os passos abaixo para colocar a API no ar:

Clone o repositório:

bash
Copiar
Editar
git clone https://github.com/Fernando-Gabriel-Tesori/elitetracker-api.git
cd elitetracker-api
Instale as dependências:

bash
Copiar
Editar
npm install
Configure o arquivo .env:

Crie um arquivo .env na raiz do projeto e adicione:

dotenv
Copiar
Editar
PORT=3000
MONGO_URI=coloque_sua_string_de_conexao_mongodb
JWT_SECRET=sua_chave_secreta_jwt
Rode em modo desenvolvimento:

bash
Copiar
Editar
npm run dev
Pronto! A API estará disponível em http://localhost:3000.

🌐 Endpoints disponíveis
Aqui estão alguns dos principais caminhos que a API oferece:

Método	Rota	Descrição
POST	/login	Login do usuário
POST	/habits	Cria um novo hábito
GET	/habits	Lista todos os hábitos
PUT	/habits/:id	Atualiza um hábito existente
DELETE	/habits/:id	Remove um hábito

🤝 Contribuindo
Achou algum bug? Tem ideias de melhorias? Fique à vontade para abrir uma issue ou um pull request. Toda ajuda é bem-vinda!

