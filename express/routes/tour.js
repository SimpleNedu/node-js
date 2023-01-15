const express = require('express')
const {getAllTours, createTour, getTour, updateTour, deleteTour, validateId, validatePostData} = require('../controllers/tourcontroller')

const router = express.Router();

router
.param('id', validateId)

router
    .route('/')
    .get(getAllTours)
    .post(validatePostData, createTour)

router
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

module.exports = router
