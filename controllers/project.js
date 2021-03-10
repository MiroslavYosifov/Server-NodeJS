import { Project, User, Feature, Issue, Suggestion } from '../models/index.js';

export default {
    get: {
        getProject: async (req, res, next) => {
            const projectId = req.params.projectId;
            try {

                const project = await Project
                                        .findById(projectId)
                                        .populate({ 
                                            path: 'features', 
                                            populate: { 
                                                path: 'creator',
                                                model: 'User'
                                            },
                                        })
                                        .populate('creator')
                                        .populate('project');
                                    
                res
                .status(200)
                .send(project);

            } catch (error) {
                console.log(error);
            }
           
        },
        listProjects: async (req, res, next) => {
            try {
                const projects = await Project
                                        .find()
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
                .status(200)
                .send(projects);

            } catch (error) {
                console.log(error);
            }
        }
    },
    post: {
        addProject: async (req, res, next) => {
            const { name, description } = req.body;
            const creatorId = req.authUser._id;
            console.log(name, description);
            // TO DO VALDIATION OF DATA
            try {
                const createdProject = await Project.create({ name, description, date: Date.now(), creator: creatorId })
                                
                const user = await User.findById(creatorId);
            
                createdProject.members.push(creatorId);
                createdProject.save();

                user.ownProjects.push(createdProject._id);
                user.save();
                
                const project = await Project
                                        .findById(createdProject._id)
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

                res
                .status(200)
                .send("Project was deleted");
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
