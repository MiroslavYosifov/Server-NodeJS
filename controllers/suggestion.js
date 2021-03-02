import { Project, User, Feature, Issue, Suggestion } from '../models/index.js';

export default {
    get: {
        getSuggestion: async (req, res, next) => {
            try {
                const suggestion = await Suggestion
                                                .findById("603d887e7fb8712f7054641e")
                                                .populate('creator')
                                                .populate('feature')
                                                .populate('project')


                res.send(suggestion);
            } catch (error) {
                console.log(error);
            }
        },
    },
    post: {
        addSuggestion: async (req, res, next) => {
            const { name, description, status, featureId } = req.body;
            const creatorId = req.authUser._id;
            // TO DO VALDIATION OF DATA
            try {
                const user = await User.findById(creatorId);
                const feature = await Feature.findById(featureId);

                const projectId = feature.project;

                const suggestion = await Suggestion.create({ name, description, status, date: Date.now(), creator: creatorId, feature: featureId, project: projectId  });
               
                user.suggestions.push(suggestion._id);
                user.save();

                feature.suggestions.push(suggestion._id);
                feature.save();

                res
                .status(201)
                .send(suggestion);

    
            } 
            catch (error) {
                console.log(error);
            }
        },
    },
    put: {
        updateSuggestion: async (req, res, next) => {

        },
    },
    delete: {
        removeSuggestion: async (req, res, next) => {
            //const { issueId } = req.body;
            try {
                const suggestion = await Suggestion.findById("603e4f9ef5aa7c0dc0e2a7be");
            
                const updatedFeature = await Feature.updateOne({ _id: suggestion.feature }, { $pull: { suggestions: { $in: ["603e4f9ef5aa7c0dc0e2a7be"] } }});
                const updatedUser = await User.updateOne({ _id: suggestion.creator }, { $pull: { suggestions: { $in: ["603e4f9ef5aa7c0dc0e2a7be"] } }});
            
                const deletedIssue = await Suggestion.deleteOne({_id: "603e4f9ef5aa7c0dc0e2a7be"});
                
                res.send("Suggestion was deleted!")
            } 
            catch (error) {
                console.log(error);
            }
        },
    }
}


// Suggestions
// name:  { type: String, required: true },
// description: { type: String, required: true },
// status: { type: String, required: true },
// date: { type: String, required: true },
// creator: { type: Schema.Types.ObjectId, ref: 'User' },
// project: { type: Schema.Types.ObjectId, ref: 'Project' },
// feature: { type: Schema.Types.ObjectId, ref: 'Feature' },
