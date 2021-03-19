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
                res
                .status(400)
                .send({ 
                    errorMessage: `Something go wrong with get feature` 
                });
            }
        },
    },
    post: {
        addFeature: async (req, res, next) => {
            const { name, description, projectId } = req.body;
            const creatorId = req.authUser._id;
            // const projectId = ''; // TO DO SHOULD GET PROJECT ID FROM URL PARAMS
            // TO DO VALDIATION OF DATA
            try {
                const createdFeature = await Feature.create({ name, description, status: "suggestion", date: Date.now("#DD#/#MM#/#YYYY# #hh#:#mm#:#ss#"), creator: creatorId, project: projectId });
                const user = await User.findById(creatorId);
                const project = await Project.findById(projectId);
                
                project.features.push(createdFeature._id);
                project.save();

                user.features.push(createdFeature._id);
                user.save();
                
                const feature = await getFeatureWithRelations(createdFeature._id);

                res
                .status(201)
                .send({
                    successMessage: `${feature.name} feature was added successfully!`,
                    feature: feature
                });

            } 
            catch (error) {
                res
                .status(400)
                .send({ 
                    errorMessage: `Something go wrong with add feature` 
                });
            }
        }
    },
    put: {
        updateFeature: async (req, res, next) => {

        },
        updateFeatureStatus: async (req, res, next) => {
            const { status } = req.body;
            const featureId = req.params.featureId;

            try {
                const feature = await Feature.findById(featureId);

                feature.status = status;
                feature.save();

                res
                .status(200)
                .send({
                    successMessage: `Feature was send to ${status} successfully!`,
                    feature: feature
                });
            } 
            catch (error) {
                console.log(error);
                res
                .status(400)
                .send({ 
                    errorMessage: `Something go wrong with update ${feature.name} feature status` 
                });
            }

            
        },
    },
    delete: {
        removeFeature: async (req, res, next) => {
            const featureId = req.params.featureId;
            
            try {
                const feature = await Feature
                                            .findById(featureId)
                                            .populate({ path: 'issues' })
                                            .populate({ path: 'suggestions'});
                
                const issuesId = feature.issues.map(x => { return x._id });
                const suggestionsId = feature.suggestions.map(x => { return x._id });

                const deletedFeatures = await Feature.deleteOne({_id: featureId});
                const deletedIssues = await Issue.deleteMany({_id: { $in: issuesId }});
                const deletedSuggestions = await Suggestion.deleteMany({_id: { $in: suggestionsId }});

                const updatedProject = await Project.updateOne({ _id: feature.project }, { $pull: { features: { $in: [featureId] } }});
                const updatedUsers = await User.updateMany({}, { $pull: { 
                                                                    features: { $in: [featureId] },
                                                                    suggestions: { $in: suggestionsId },
                                                                    issues: { $in: issuesId }
                                                            }});
                                                
                res
                .status(200)
                .send({
                    successMessage: `Feature was deleted successfully!`,
                });
            } 
            catch (error) {
                res
                .status(400)
                .send({ errorMessage: `Something go wrong with remove Feature` });
            }
        },
    }
}