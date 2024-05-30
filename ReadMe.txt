===========================Pre-requesitos==============================================
Dependencias da aplicaçao:
	- Node js;
	- Instale o MongoDb

1- assim que o node e o mongo estiverem instalados com sucesso:
	- va ao root do teminal, navegue ate /server e execute o comando "npm run dev"	
	- va ao root do teminal, navegue ate /client e execute o comando "npm run dev"	

2- se tudo estiver correcto devera ver as seguintes mensagens
	- terminal do server: the server is running in localhost:4000/
	- terminal do client: local: localhost:5173/

3- ir ao navegador e procurar a url: localhost:5173/
================================================Acessos==================================


======================================Como Fazer o deploy===============================
1- Va ao terminal do client e execute o comando "npm run build";
2- uma vez completo o processo, procure a pasta "dist";
3- mova a pasta dist, para o server.
4- va ao MongoDb, e crie uma collection no atlas.
5- copie o link que o MongoDb atlas fornece
6- subistitua o valor na variavel MONGO_DB no ficherio /server/.env pelo link fornecido pelo atlas(garanta que o username e a passowrd estejam devidamente alteradas no link fornecido pelo atlas)
7 - copie o seguinte comando para o "index.js" do server:

const path = require("path");
const __dirname1 = path.resolve();
console.log(__dirname1);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "./dist")));

  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });

8- va ao RENDER.com, e siga o tutorial basico
9- Acessar o Link.  