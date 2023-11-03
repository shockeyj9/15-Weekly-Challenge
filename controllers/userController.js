const {User, Thought} = require('../models'); 

module.exports = {
    async getUsers(req,res){
        try {
            const user = await User.find();
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    
    async getSingleUser(req,res){
        try {
            const user = await User.findOne(
                {_id: req.params.userId}
            )
            .populate("thoughts")
            .populate("friends")

            if (!user){
                return res.status(404).json({message: 'No user with that ID'})
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
            console.log(error.message)
        }
    },

}