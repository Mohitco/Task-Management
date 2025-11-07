const Task = require('../model/task');
const taskSchema = require('../Validate/taskValidation');

const addTask = async(req,res) => {
    try {
        const {error} = taskSchema.validate(req.body,{abortEarly : false});

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ errors });
    }

    const {user} = req;
    
    const {title,description,priority,status} = req.body;

    const newTask = await Task.create({
        title,
        description,
        priority,
        status
    });
    user.tasks.push(newTask._id);
    await user.save();
    return res.status(201).json({message : "Task Added Sucessfully"});

    } catch (error) {
        return res.status(500).json({error : "Internal Server Error!"});
    }
};

const editTask = async(req,res) => {
    try {
        const {id} = req.params;
        const {error} = taskSchema.validate(req.body,{abortEarly : false});

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ errors });
    }

    const {title,description,priority,status} = req.body;

    await Task.findByIdAndUpdate(id,{title,description,priority,status})
    return res.status(201).json({message : "Task Updated Sucessfully"});

    } catch (error) {
        return res.status(500).json({error : "Internal Server Error!"});
    }
};

const getTask = async(req,res) => {
    try {
        const {id} = req.params;
        const taskDetails = await Task.findById(id);
        return res.status(200).json({taskDetails});
    } catch (error) {
        return res.status(500).json({error : "Internal Server Error!"});
    }
};

const deleteTask = async(req,res) => {
    try {
        const {id} = req.params;
        const task = await Task.findByIdAndDelete(id);
           if (!task) return res.status(404).json({ error: "Task not found" });
        return res.status(200).json({message : "Deleted Sucessfully"});
    } catch (error) {
        return res.status(500).json({error : "Internal Server Error!"});
    }
};


module.exports = {addTask,editTask,getTask,deleteTask}