const express = require('express')
const router = express.Router()

//CRUD

// import the model
const MovieModel = require('../models/Movie')
localhost:3000
// GET request with node-express-get snippet
router.get('/', (req, res) => {
  MovieModel.find()
  .then((movieList)=>{res.json(movieList)})
  .catch((err)=>{res.json(err)})
})

//SORT => 1, ASC || -1, DESC
// GET top 10 movies
router.get('/top10', (req, res)=>{
  MovieModel.find().sort({imdb_score:1}).limit(10)
  .then((movieList)=>{res.json(movieList)})
  .catch((err)=>{res.json(err)})
})

// GET details of a movie /api/movies/:movieId
router.get('/:movieId',(req,res)=>{
  MovieModel.findById(req.params.movieId)
  .then((movie)=>{res.json(movie)})
  .catch((err)=>{res.json(err)})
})
// List movies between specific date
router.get('/between/:startYear/:endYear',(req,res)=>{
  const {startYear, endYear}=req.params
  MovieModel.find({year:{"$gte":parseInt(startYear), "$lte":parseInt(endYear)}})
  .then((movieList)=>{res.json(movieList)})
  .catch((err)=>{res.json(err)})
})

// POST request  to save Movies in the DB
router.post('/',(req, res, next)=>{
  const newMovie = new MovieModel(req.body)
  newMovie.save()
  .then((movie)=>{res.json(movie)})
  .catch((error)=>{next({message:error})
                    /*res.json(error)*/})
})

// PUT Method to update a movie /api/movies/:movieId
router.put('/:movieId',(req,res,next)=>{
  MovieModel.findByIdAndUpdate(req.params.movieId, req.body,{new:true})
  .then((movie)=>{res.json(movie)})
  .catch((error)=>{res.json(error)})
})

// DELETE request to remove a movie from DB   /api/movies/:movieId
router.delete('/:movieId',(req, res, next)=>{
  MovieModel.findByIdAndRemove(req.params.movieId)
  .then(movie=>res.json(movie))
  .catch(err=>res.json(err))
})

// Export the route
module.exports = router