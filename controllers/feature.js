import { Project, User, Feature, Issue, Suggestion } from '../models/index.js';

export default {
    get: {
        getFeature: async (req, res, next) => {
            // const { featureId } = req.body;
            try {
                const feature = await Feature.findById("603d7e1c6ee45924e479eee5");
                console.log(feature);
                res.send(feature);
            } catch (error) {
                console.log(error);
            }
        },
    },
    post: {
        addFeature: async (req, res, next) => {
            const { name, description, status, projectId } = req.body;
            console.log(projectId);
            const creatorId = req.authUser._id;
            // const projectId = ''; // TO DO SHOULD GET PROJECT ID FROM URL PARAMS
            // TO DO VALDIATION OF DATA
            try {
                const feature = await Feature.create({ name, description, status, date: Date.now(), creator: creatorId, project: projectId });
                const user = await User.findById(creatorId);
                const project = await Project.findById(projectId);
                console.log(user);
                console.log(project);
                project.features.push(feature._id);
                project.save();

                user.features.push(feature._id);
                user.save();

                res
                .status(201)
                .send(feature);

            } 
            catch (error) {
             console.log(error);
            }
        }
    },
    put: {
        updateFeature: async (req, res, next) => {

        },
    },
    delete: {
        removeFeature: async (req, res, next) => {
            const { featureId } = req.body;

            try {
                const feature = await Feature
                                            .findById("603e4a420d0d8405f0c8cf5a")
                                            .populate({ path: 'issues' })
                                            .populate({ path: 'suggestions'});
                
                console.log(feature);

                const issuesId = feature.issues.map(x => { return x._id });
                const suggestionsId = feature.suggestions.map(x => { return x._id });

                const deletedFeatures = await Feature.deleteOne({_id: "603e4a420d0d8405f0c8cf5a"});
                const deletedIssues = await Issue.deleteMany({_id: { $in: issuesId }});
                const deletedSuggestions = await Suggestion.deleteMany({_id: { $in: suggestionsId }});

                const updatedProject = await Project.updateOne({ _id: feature.project }, { $pull: { features: { $in: ["603e4a420d0d8405f0c8cf5a"] } }});
                const updatedUsers = await User.updateMany({}, { $pull: { 
                                                                    features: { $in: ["603e4a420d0d8405f0c8cf5a"] },
                                                                    suggestions: { $in: suggestionsId },
                                                                    issues: { $in: issuesId }
                                                            }});
                                                
                res.send('Feature was deleted');
            } 
            catch (error) {
                console.log(error);
            }
        },
    }
}

//  FEATURE
//  name:  { type: String, required: true },
//  date: { type: String, required: true },
//  status: { type: String, required: true }, // IN SUGGESTED // IN DEVELOPMENT // IN TESTING // COMPLETED
//  creator: { type: Schema.Types.ObjectId, ref: 'User' },
//  project: { type: Schema.Types.ObjectId, ref: 'Project' },
//  suggestion: [{ type: Schema.Types.ObjectId, ref: 'Suggestion' }],
//  issues: [{ type: Schema.Types.ObjectId, ref: 'Issue' }],
