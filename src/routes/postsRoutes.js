import express from "express";
import multer from "multer";
import { atualizarNovoPost, listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSucessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage});

const routes = (app) => {
        // Habilita o middleware para que o Express possa entender requisições com corpo no formato JSON.
    app.use(express.json());
    app.use(cors(corsOptions))

        // Define uma rota para buscar todos os posts.
        app.get("/posts", listarPosts);
        // Define uma rota para criar um novo post.
        app.post("/posts", postarNovoPost);
        app.post("/upload", upload.single("imagem"), uploadImagem);
        app.put("/upload/:id", atualizarNovoPost)
};

export default routes;