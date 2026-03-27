import tabelaBrasil from "./tabela.js";
import express, { request } from "express";

const app = express();

/* Traz a informação de todos os times */

app.get("/", (requisicao, resposta) => {
  resposta.send(tabelaBrasil);
});

/* Busca as informações de um time de acordo com a sigla: */

app.get("/:sigla", (request, response) => {
  const siglaInformada = request.params.sigla.toUpperCase();
  const time = tabelaBrasil.find(
    (infoTime) => infoTime.sigla === siglaInformada,
  );

  if (!time) {
    response
      .status(404)
      .send(
        "Não foi encontrado o time com a sigla informada!!!",
      );
    return;
  }

  response.status(200).send(time);
});

/* Cria um servidor com a porta 300 e exibirá uma mensagem 'Servidor rodando com sucesso!!!' */

app.listen(300, () => console.log("Servidor rodando com sucesso!!!"));
