import { Project, User, Feature, Issue, Suggestion } from '../models/index.js';

export default {
    get: {
        getSuggestion: async (req, res, next) => {
            try {
                const suggestion = await Suggestion
                                                .findById("603d887e7fb8712f7054641e")
                                                .populate('creator')
                                                .populate('feature')
                                                .populate('project');

                res
                .status(200)
                .send(suggestion);
                
            } catch (error) {

                console.log(error);

                res
                .status(400)
                .send({ 
                    errorMessage: `Something go wrong with get Suggestions` 
                });
            }
        },
    },
    post: {
        addSuggestion: async (req, res, next) => {
            const { name, description, featureId } = req.body;
            const creatorId = req.authUser._id;
            // TO DO VALDIATION OF DATA

            try {
                const user = await User.findById(creatorId);
                const feature = await Feature.findById(featureId);

                const projectId = feature.project;

                const createdSuggestion = await Suggestion.create({ name, description, status: "waiting for approval", date: Date.now(), creator: creatorId, feature: featureId, project: projectId  });
               
                user.suggestions.push(createdSuggestion._id);
                user.save();

                feature.suggestions.push(createdSuggestion._id);
                feature.save();

                const suggestion = await Suggestion
                    .findById(createdSuggestion._id)
                    .populate('creator')
                    .populate('feature')
                    .populate('project')

                res
                .status(201)
                .send({ 
                    successMessage: `${name} suggestion was added successfully!`,
                    suggestion: suggestion
                });

            } 
            catch (error) {
                console.log(error);

                res
                .status(400)
                .send({ 
                    errorMessage: `Something go wrong with add Suggestion` 
                });
            }
        },
    },
    put: {
        updateSuggestion: async (req, res, next) => {

        },
        updateSuggestionStatus: async (req, res, next) => {
            const { status } = req.body;
            const suggestionId = req.params.suggestionId;

            try {
                const suggestion = await Suggestion.findById(suggestionId);
            
                suggestion.status = status;
                suggestion.save();

                res
                    .status(200)
                    .send({ 
                        successMessage: `Suggestion was ${status} successfully!`,
                        suggestionId: suggestionId, 
                        status: status 
                    });
                } 
            catch (error) {
                console.log(error);

                res
                .status(400)
                .send({ 
                    errorMessage: `Something go wrong with update Suggestion` 
                });
            }

            
        },
    },
    delete: {
        removeSuggestion: async (req, res, next) => {
            const suggestionId = req.params.suggestionId;
            try {
                const suggestion = await Suggestion.findById(suggestionId);
                console.log(suggestion);
                const updatedFeature = await Feature.updateOne({ _id: suggestion.feature }, { $pull: { suggestions: { $in: [suggestionId] } }});
                const updatedUser = await User.updateOne({ _id: suggestion.creator }, { $pull: { suggestions: { $in: [suggestionId] } }});
            
                const deletedIssue = await Suggestion.deleteOne({_id: suggestionId});
                
                res
                .status(200)
                .send({ 
                    successMessage: "Suggestion was deleted!", 
                    suggestionId: suggestionId 
                });
            } 
            catch (error) {
                console.log(error);
                res
                .status(400)
                .send({ 
                    errorMessage: `Something go wrong with delete suggestion` 
                });
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
