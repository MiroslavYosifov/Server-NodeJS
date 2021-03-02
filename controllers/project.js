import { Project, User, Feature, Issue, Suggestion } from '../models/index.js';

export default {
    get: {
        getProject: async (req, res, next) => {
            // const { projectId } = req.body;
            try {

                const project = await Project
                                        .findById("603daf2a5978f827fc05794b")
                                        .populate({ 
                                            path: 'features', 
                                            populate: { 
                                                path: 'issues',
                                                model: 'Issue',
                                                populate: {
                                                    path: 'creator',
                                                    select: 'name',
                                                    model: 'User',
                                                }
                                            }
                                        })
                                        .populate('creator');
                                    
                res
                .send(project);

            } catch (error) {
                console.log(error);
            }
           
        },
        getAllProjects: async (req, res, next) => {

        }
    },
    post: {
        addProject: async (req, res, next) => {
            const { name, description } = req.body;
            const creatorId = req.authUser._id;
            // TO DO VALDIATION OF DATA
            try {
                const project = await Project.create({ name, description, date: Date.now(), creator: creatorId });
                const user = await User.findById(creatorId);
            
                project.members.push(creatorId);
                project.save();

                user.ownProjects.push(project._id);
                user.save();
                
                res
                .status(201)
                .send(project);
            } 
            catch (error) {
                console.log(error);
            }
        }
    },
    put: {
        updateProject: async (req, res, next) => {

        }
    },
    delete: {
        removeProject: async (req, res, next) => {

            // 1. TO DO VALIDATION OF DATA
            // 2. TO DO PROTECTION ONLY ADMINS AND CREATOR CAN DELETE PROEJECT
            // 3. TO DO ERROR HANDLING
            
            //const { projectId } = req.body;

            try {

                const project = await Project
                                        .findById("603e4a180d0d8405f0c8cf57")
                                        .populate({ path: 'features', populate: { path: 'issues', model: 'Issue' }})
                                        .populate({ path: 'features', populate: { path: 'suggestions', model: 'Suggestion' }});

                let issues = [];
                let suggestions = [];
                let features = [];

                for (const feature of project.features) {

                    const issuesID = feature.issues.map(x => { return x._id });
                    const suggestionsID = feature.suggestions.map(x => { return x._id });
                  
                    issues = [...issues, ...issuesID];
                    suggestions = [...suggestions, ...suggestionsID];
                    features.push(feature._id);
                   
                }
         
                const deletedProject = await Project.deleteOne({ _id: "603e4a180d0d8405f0c8cf57"});
                const deletedFeatures = await Feature.deleteMany({_id: { $in: features }});
                const deletedIssues = await Issue.deleteMany({_id: { $in: issues}});
                const deletedSuggestions = await Suggestion.deleteMany({_id: { $in: suggestions }});

                const updatedUsers = await User.updateMany({}, { $pull: { 
                                                                    ownProjects: { $in: ["603e4a180d0d8405f0c8cf57"] },
                                                                    participantsInProjects: { $in: ["603e4a180d0d8405f0c8cf57"] },
                                                                    features: { $in: features },
                                                                    suggestions: { $in: suggestions },
                                                                    issues: { $in: issues }
                                                            }});

                res.send("Project was deleted");
            } 
            catch (error) {
                console.log(error);
            }
           
        }
    }
}


// ownProjects: [{ type: Schema.Types.ObjectId, ref: 'Project' }], // TO DO REF TO PROJECT MODEL
// participantsInProjects: [{ type: Schema.Types.ObjectId, ref: 'Project' }], // TO DO REF TO PROJECT MODEL
// features: [{ type: Schema.Types.ObjectId, ref: 'Feature' }],
// suggestions: [{ type: Schema.Types.ObjectId, ref: 'Suggestion' }],
// issues: [{ type: Schema.Types.ObjectId, ref: 'Issue' }],

// ISSUE
// name:  { type: String, required: true },
// description: { type: String, required: true },
// status: { type: String, required: true },
// date: { type: String, required: true },
// creator: { type: Schema.Types.ObjectId, ref: 'User' },
// project: { type: Schema.Types.ObjectId, ref: 'Project' },
// feature: { type: Schema.Types.ObjectId, ref: 'Feature' },

//  FEATURE
//  name:  { type: String, required: true },
//  date: { type: String, required: true },
//  status: { type: String, required: true }, // IN SUGGESTED // IN DEVELOPMENT // IN TESTING // COMPLETED
//  creator: { type: Schema.Types.ObjectId, ref: 'User' },
//  project: { type: Schema.Types.ObjectId, ref: 'Project' },
//  suggestion: [{ type: Schema.Types.ObjectId, ref: 'Suggestion' }],
//  issues: [{ type: Schema.Types.ObjectId, ref: 'Issue' }],

//  PROJECT
//  name:  { type: String, required: true },
//  description: { type: String, required: true },
//  date: { type: String, required: true },
//  creator: { type: Schema.Types.ObjectId, ref: 'User' },
//  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
//  features: [{ type: Schema.Types.ObjectId, ref: 'Feature' }],
