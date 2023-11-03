const {User, Thought} = require('../models'); 

module.exports = {
    async getThoughts(req,res){
        try {
            const thought = await Thought.find();
            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async getSingleThought(req,res){
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId})

            if (!thought){
                return res.status(404).json({message: 'No thought with that ID'})
            }
            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async updateThought(req,res){
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body }
                // { runValidators: true, new: true }
              );
              if (!thought) {
                res.status(404).json({ message: 'No thought with this id!' });
              }

              res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async deleteThought(req,res){
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      
            if (!thought) {
              res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json({ message: 'Thought deleted!' });
          } catch (error) {
            res.status(500).json(error);
          }
    }

}