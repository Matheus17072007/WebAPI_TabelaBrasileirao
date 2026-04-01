import tabelaBrasil from "./tabela.js";
import express, { request } from "express";
import { modeloTimeNovo, modeloUpdateTime } from "./validacao.js";

const app = express();

app.use(express.json());

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
      .send("Não foi encontrado o time com a sigla informada!!!");
    return;
  }

  response.status(200).send(time);
});

app.put("/:sigla", (req, res) => {
  const siglaPesquisada = req.params.sigla.toUpperCase();
  const time = tabelaBrasil.find((t) => t.sigla === siglaPesquisada);
  if (!time) {
    res.status(404).send("Não foi encontrado o time com a sigla informada!!!");
    return;
  }
  const { error } = modeloUpdateTime.validate(req.body);
  if (error) {
    res.status(400).send(error);
    return;
  }
  console.log(resultValidate);
  const campos = Object.keys(req.body);
  for (let campo of campos) {
    time[campo] = req.body[campo];
  }
  res.status(200).send(time);
});

app.post("/", (req, res) => {
  const novoTime = req.body;
  const { error } = modeloTimeNovo.validate(novoTime);
  if (error) {
    res.status(400).send(error);
    return;
  }
  tabelaBrasil.push(novoTime);
  res.status(201).send(novoTime);
});

app.delete("/:sigla", (req, res) => {
  const siglaInformada = req.params.sigla.toUpperCase;
  const timeIndice = tabelaBrasil.findIndex(
    (tm) => tm.sigla === siglaInformada,
  );
  if (timeIndice === -1) {
    res.status(404).send("O time não foi encontrado na tabela do brasileirão");
    return;
  }
  const timeRemovido = tabelaBrasil.splice(timeIndice, 1);
  res.status(200).send(timeRemovido);
});

/* Cria um servidor com a porta 300 e exibirá uma mensagem 'Servidor rodando com sucesso!!!' */

app.listen(300, () => console.log("Servidor rodando com sucesso!!!"));
