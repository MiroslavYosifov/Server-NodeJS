import { Project, User, Feature, Issue, Suggestion } from '../models/index.js';
import { getFeatureWithRelations } from './controllerUtils.js';

export default {
    get: {
        getFeature: async (req, res, next) => {
            const featureId = req.params.featureId;
            try {
                const feature = await getFeatureWithRelations(featureId);
               
                res
                .status(200)
                .send(feature);
            } catch (error) {
                console.log(error);
            }
        },
    },
    post: {
        addFeature: async (req, res, next) => {
            const { name, description, status, projectId } = req.body;
            const creatorId = req.authUser._id;
            // const projectId = ''; // TO DO SHOULD GET PROJECT ID FROM URL PARAMS
            // TO DO VALDIATION OF DATA
            try {
                const createdFeature = await Feature.create({ name, description, status, date: Date.now(), creator: creatorId, project: projectId });
                const user = await User.findById(creatorId);
                const project = await Project.findById(projectId);
                
                project.features.push(createdFeature._id);
                project.save();

                user.features.push(createdFeature._id);
                user.save();
                
                const feature = await getFeatureWithRelations(createdFeature._id);

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
                                                
                res
                .status(200)
                .send('Feature was deleted');
            } 
            catch (error) {
                console.log(error);
            }
        },
    }
}

async function getFeatureWitH (featureId) {
    return await Feature.findById(featureId)
                                        .populate({ 
                                            path: 'suggestions', 
                                            populate: [
                                                { 
                                                    path: 'project',
                                                    model: 'Project',
                                                },
                                                {
                                                    path: 'feature',
                                                    model: 'Feature',
                                                },
                                                {
                                                    path: 'creator',
                                                    model: 'User',
                                                },
                                            ]
                                        })
                                        .populate({ 
                                            path: 'issues', 
                                            populate: [
                                                { 
                                                    path: 'project',
                                                    model: 'Project',
                                                },
                                                {
                                                    path: 'feature',
                                                    model: 'Feature',
                                                },
                                                {
                                                    path: 'creator',
                                                    model: 'User',
                                                },
                                            ]
                                        })
                                        .populate('project')
                                        .populate('creator');
};