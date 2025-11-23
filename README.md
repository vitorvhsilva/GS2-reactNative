# SkillShift - Mobile App

SkillShift é uma aplicação mobile desenvolvida em React Native que permite aos usuários explorar e seguir trilhas de aprendizado profissional.

## Vídeo demonstrativo da aplicaçao

#### https://youtu.be/obDgXwKUiQA

## Integrantes

#### Brendon de Paula- RM559196
#### João Gananca - RM556405
#### Vitor Hugo - RM558961

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 14 ou superior) - [Download aqui](https://nodejs.org/)
- **npm** (gerenciador de pacotes do Node)
- **Git** (para clonar o repositório)
- **Docker e Docker Compose** (para rodar o mockserver)

Verifique as instalações executando:
```bash
node --version
npm --version
docker --version
docker-compose --version
```

## 🚀 Como Baixar as Dependências e Rodar o Frontend

### 1. Clonar o Repositório
```bash
git clone https://github.com/vitorvhsilva/GS2-reactNative.git
cd GS2-reactNative/SkillShift
```

### 2. Instalar as Dependências
```bash
npm install
```

Este comando irá instalar todas as dependências do projeto listadas no `package.json`.

### 3. Rodar a Aplicação
```bash
npm start
```

O aplicativo iniciará no modo de desenvolvimento. Você verá informações no terminal sobre como acessar a aplicação.

### 4. Acessar a Aplicação
Dependendo do seu setup (Expo, React Native CLI, etc.), a aplicação estará disponível em:
- Web: `http://localhost:19006` (se usando Expo Web)
- Dispositivo móvel: Escaneie o QR code exibido no terminal

## 🐳 Como Subir o MockServer

O mockserver é uma API simulada que fornece dados de teste. Ele é definido no arquivo `docker-compose.yaml`.

### 1. Iniciar o MockServer com Docker Compose
```bash
docker-compose up --build --force-recreate
```

Este comando irá:
- Construir a imagem Docker do mockserver
- Iniciar o container com a API simulada
- Disponibilizar a API em `http://localhost:1080`


Você deve ver a interface do MockServer indicando que está funcionando.

### 2. Parar o MockServer
```bash
docker-compose down
```

## 🔄 Alternando entre MockServer e API Web (Deploy)

### Usando MockServer (Desenvolvimento Local)

No arquivo `src/services/contants.ts`, certifique-se de que as variáveis estão **comentadas** para usar o mockserver:

```typescript
//DEPLOY
//export const TRILHAS_API = 'https://gs2-dotnet.onrender.com';
//export const USUARIOS_API = "http://localhost:8080";

//MOCKSERVER 
export const TRILHAS_API = "http://localhost:1080";
export const USUARIOS_API = "http://localhost:1080";

export const TRILHAS_API_KEY = '93592d64-940e-4ee7-b7b1-4e9e1792d755';
```

**Passos:**
1. Garanta que o mockserver está rodando com `docker-compose up`
2. Mantenha as URLs do MOCKSERVER descomentadas
3. Execute `npm start` para rodar o frontend
4. A aplicação utilizará os dados do mockserver local

### Usando API Web (Deploy)

Para usar a API web em produção, edite o arquivo `src/services/contants.ts`:

```typescript
//DEPLOY
export const TRILHAS_API = 'https://gs2-dotnet.onrender.com';
export const USUARIOS_API = "http://localhost:8080";

//MOCKSERVER 
//export const TRILHAS_API = "http://localhost:1080";
//export const USUARIOS_API = "http://localhost:1080";

export const TRILHAS_API_KEY = '93592d64-940e-4ee7-b7b1-4e9e1792d755';
```

**Passos:**
1. Comente as URLs do MOCKSERVER
2. Descomente as URLs do DEPLOY
3. Certifique-se de que as APIs em produção estão acessíveis
4. Execute `npm start` para rodar o frontend
5. A aplicação utilizará as APIs web em produção

## 📁 Estrutura do Projeto

```
SkillShift/
├── src/
│   ├── components/      # Componentes reutilizáveis
│   ├── contexts/        # Context API para gerenciamento de estado
│   ├── routes/          # Configuração de rotas
│   ├── screens/         # Telas da aplicação
│   ├── services/        # Serviços e integração com APIs
│   ├── styles/          # Temas e estilos globais
│   └── types/           # Definições de tipos TypeScript
├── assets/              # Imagens, fontes e recursos
├── mockserver/          # Configuração do mockserver
├── App.tsx              # Componente raiz da aplicação
├── docker-compose.yaml  # Configuração do Docker Compose
├── package.json         # Dependências e scripts
└── tsconfig.json        # Configuração do TypeScript
```