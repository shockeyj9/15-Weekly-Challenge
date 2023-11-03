const {User, user} = require('../models'); 

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
      // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req,res){
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body }
            // { runValidators: true, new: true }
          );
          if (!user) {
            res.status(404).json({ message: 'No user with this id!' });
          }

          res.json(user);
    } catch (error) {
        res.status(500).json(error);
    }
},
async deleteUser(req,res){
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
  
        if (!user) {
          res.status(404).json({ message: 'No user with that ID' });
        }

        res.json({ message: 'user deleted!' });
      } catch (error) {
        res.status(500).json(error);
      }
}
}