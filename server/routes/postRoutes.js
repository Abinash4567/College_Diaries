const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController.js");

//App Routes
router.get("/", postController.homepage);
router.get("/categories", postController.exploreCategories);
router.get("/Post/:id", postController.explorePost);
router.get("/categories/:id", postController.exploreCategoriesById);
router.post('/search', postController.searchpost);
router.get('/explore-latest', postController.exploreLatest);
router.get('/explore-random', postController.exploreRandom);
router.get('/submit-post', postController.submitPost);
router.post('/submit-post', postController.submitfinal);

module.exports = router;