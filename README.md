# Conheça Garanhuns

Aplicativo móvel desenvolvido em React Native com Expo para apresentar pontos turísticos, culturais e naturais da cidade de Garanhuns - PE.

## 🚀 Como Executar

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Inicie o projeto:**
   ```bash
   npx expo start
   ```

3. **Execução:**
   - Abra o aplicativo **Expo Go** no celular e escaneie o QR Code exibido no terminal.
   - Ou pressione `w` no terminal para rodar na versão web.

## 📁 Estrutura do Projeto

```
ConhecaGaranhuns
├── App.js                         # Configuração da navegação principal
├── package.json                   # Dependências do projeto
├── README.md                      # Instruções do projeto
│
└── src
    ├── components
    │   └── PlaceCard
    │       └── index.js           # Componente de cartão dos locais
    │
    ├── data
    │   └── places.js              # Base de dados dos locais de Garanhuns
    │
    └── pages
        ├── Home
        │   └── index.js           # Tela inicial com busca e filtros
        │
        └── Details
            └── index.js           # Tela de detalhes do local
```
