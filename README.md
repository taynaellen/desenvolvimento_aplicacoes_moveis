# desenvolvimento_aplicacoes_moveis
Trabalho final da Unidade Curricular de Desenvolvimento de Aplicações Móveis

- Aplicativo mobile com 7 telas:
Login
Cadastro
Home (Catálogo de Filmes)
Detalhes do Filme
Favoritos
Perfil do Usuário
Configurações

- O aplicativo permite login/cadastro, exibe filmes de uma API, permite marcar favoritos e fazer logout.

- Tecnologias: React Native, Expo, SQLite, Axios


Para rodar o projeto:
- Clonar o repositório
- Nos arquivos LoginSreen.js e RegisterScreen.js altere o await fetch de acordo com o ip de sua máquina (use o Endereço IPv4 da rede ativa). E no arquivo Home Screen.js adicione a api_key do https://www.themoviedb.org/
- Dentro da pasta backend, instalar as dependências (npm install) e iniciar o servidor (node index.js)
- Em outro terminal, na pasta catalogo-filmes instale novamente as dependências (npm install) e inicie o projeto (npx expo start)
- Use o aplicativo Expo Go no celular para escanear o QR Code e rodar o app ou teste via web (digite w no terminal para abrir a página)
