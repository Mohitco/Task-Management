const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { addTask, editTask, getTask, deleteTask } = require('../controller/task');
const router = express.Router();

router.post('/addTask',authMiddleware,addTask);
router.put('/editTask/:id',authMiddleware,editTask);
router.post('/getTask',authMiddleware,getTask);
router.delete('/deleteTask/:id',authMiddleware,deleteTask);

module.exports = router;