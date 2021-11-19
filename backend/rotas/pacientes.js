const express = require("express");
const router = express.Router();
const multer = require("multer");
const Paciente = require("../models/paciente");
const armazenamento = multer.diskStorage({
  //requisição, arquivo extraido e uma função a ser
  //executada, capaz de indicar um erro ou devolver
  //o diretório em que as fotos ficarão
  destination: (req, file, callback) => {
    callback(null, "backend/imagens");
  },
  filename: (req, file, callback) => {
    const nome = file.originalname.toLowerCase().split(" ").join("-");
    const extensao = MIME_TYPE_EXTENSAO_MAPA[file.mimetype];
    callback(null, `${nome}-${Date.now()}.${extensao}`);
  },
  destination: (req, file, callback) => {
    let e = MIME_TYPE_EXTENSAO_MAPA[file.mimetype]
      ? null
      : new Error("Mime Type Invalido");
    callback(e, "backend/imagens");
  },
});

router.post(
  "",
  multer({ storage: armazenamento }).single("imagem"),
  (req, res, next) => {
    const imagemURL = `${req.protocol}://${req.get("host")}`;
    const paciente = new Paciente({
      _id: req.params.id,
      nome: req.body.nome,
      fone: req.body.fone,
      email: req.body.email,
      senha: req.body.senha,
      estado: req.body.estado,
      datanasc: req.body.datanasc,
      imagemURL: `${imagemURL}/imagens/${req.file.filename}`,
    });
    paciente.save().then((pacienteInserido) => {
      res.status(201).json({
        mensagem: "paciente inserido",
        id: pacienteInserido._id,
        nome: clienteInserido.nome,
        fone: clienteInserido.fone,
        email: clienteInserido.email,
        senha: clienteInserido.senha,
        estado: clienteInserido.estado,
        imagemURL: clienteInserido.imagemURL,
      });
    });
  }
);

router.get("", (req, res, next) => {
  debugger;
  Paciente.find().then((documents) => {
    console.log(documents);
    res.status(200).json({
      mensagem: "Tudo OK",
      pacientes: documents,
    });
  });
});
router.delete("/:id", (req, res, next) => {
  console.log("id: ", req.params.id);
  Paciente.deleteOne({ _id: req.params.id }).then((resultado) => {
    console.log(resultado);
    res.status(200).json({ mensagem: "Paciente removido" });
  });
});
router.put("/:id", (req, res, next) => {
  const paciente = new Paciente({
    _id: req.params.id,
    nome: req.body.nome,
    fone: req.body.fone,
    email: req.body.email,
    senha: req.body.senha,
    estado: req.body.estado,
    datanasc: req.body.datanasc,
    imagemURL: `${imagemURL}/imagens/${req.file.filename}`,
  });
  Paciente.updateOne({ _id: req.params.id }, paciente).then((resultado) => {
    console.log(resultado);
    res.status(200).json({ mensagem: "Atualização realizada com sucesso" });
  });
});
router.get("/:id", (req, res, next) => {
  Paciente.findById(req.params.id).then((pac) => {
    if (pac) {
      res.status(200).json(pac);
    } else res.status(404).json({ mensagem: "paciente não encontrado!" });
  });
});
module.exports = router;
