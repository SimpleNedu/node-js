const express = require('express')
const {getAllTours, createTour, getTour, updateTour, deleteTour, getBestTour} = require('../controllers/tourcontroller')

const router = express.Router();

// router
// .param('id', validateId)

router
    .route('/')
    .get(getAllTours)
    .post(createTour)

router 
    .route('/top-5-cheap')
    .get(getBestTour, getAllTours)

router
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

    // //////////////////////////////////////////


module.exports = router
