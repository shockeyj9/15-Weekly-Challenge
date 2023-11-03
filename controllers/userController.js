const {User, Thought} = require('../models'); 

module.exports = {
    async getUsers(req,res){
        try {
            const thought = await User.find();
            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    

}