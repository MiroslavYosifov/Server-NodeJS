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
                res
                .status(400)
                .send({ 
                    errorMessage: `Something go wrong with GET Project` 
                });
            }
           
        },
        listProjects: async (req, res, next) => {
            const countClicks = req.query.countClicks;
            console.log(countClicks);

            try {
                const projects = await Project
                                        .find()
                                        .sort({date: -1})
                                        .limit((Number(countClicks) * 5))
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
                res
                .status(400)
                .send({ 
                    errorMessage: `Something go wrong with List Project` 
                });
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
                .send({
                    successMessage: `${name} project was added successfully!`,
                    project: project
                });
            } 
            catch (error) {
                console.log(error);
                res
                .status(400)
                .send({ 
                    errorMessage: `Something go wrong with add Project` 
                });
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

            const projectId = req.params.projectId;

            try {

                const project = await Project
                                        .findById(projectId)
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
         
                const deletedProject = await Project.deleteOne({ _id: projectId});
                const deletedFeatures = await Feature.deleteMany({_id: { $in: features }});
                const deletedIssues = await Issue.deleteMany({_id: { $in: issues}});
                const deletedSuggestions = await Suggestion.deleteMany({_id: { $in: suggestions }});

                const updatedUsers = await User.updateMany({}, { $pull: { 
                                                                    ownProjects: { $in: [projectId] },
                                                                    participantsInProjects: { $in: [projectId] },
                                                                    features: { $in: features },
                                                                    suggestions: { $in: suggestions },
                                                                    issues: { $in: issues }
                                                            }});

                res
                .status(200)
                .send({
                    successMessage: `Project was deleted!`,
                    project: project
                });
            } 
            catch (error) {
                console.log(error);
                res
                .status(400)
                .send({ 
                    errorMessage: `Something go wrong with remove Project` 
                });
            }
           
        }
    }
}
