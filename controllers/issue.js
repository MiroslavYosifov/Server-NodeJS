import { Project, User, Feature, Issue, Suggestion } from '../models/index.js';

export default {
    get: {
        getIssue: async (req, res, next) => {
            const { issueId } = req.body;
            try {
                const issue = await Issue
                                        .findById(issueId)
                                        .populate('creator')
                                        .populate('feature')
                                        .populate('project');
                res
                .status(200)
                .send(issue);
            } catch (error) {

                console.log(error);

                res
                .status(400)
                .send({ errorMessage: `Something go wrong with get Issues` });
            }
        }
    },
    post: {
        addIssue: async (req, res, next) => {
            const { name, description, featureId } = req.body;
            const creatorId = req.authUser._id;

            try {
                const user = await User.findById(creatorId);
                const feature = await Feature.findById(featureId);

                const projectId = feature.project;

                const createdIssue = await Issue.create({ name, description, status: "waiting for approval", date: Date.now(), creator: creatorId, feature: featureId, project: projectId });
                
                user.issues.push(createdIssue._id);
                user.save();

                feature.issues.push(createdIssue._id);
                feature.save();

                const issue = await Issue
                                        .findById(createdIssue._id)
                                        .populate('creator')
                                        .populate('feature')
                                        .populate('project');

                res
                .status(201)
                .send({ 
                    successMessage: `${name} issue was added successfully!`,
                    issue: issue
                });
            } 
            catch (error) {

                console.log(error);

                res
                .status(400)
                .send({ 
                    errorMessage: `Something go wrong with add Issue` 
                });
                
            }
        },
    },
    put: {
        updateIssue: async (req, res, next) => {

        },
        updateIssueStatus: async (req, res, next) => {
            const { status } = req.body;
            const issueId = req.params.issueId;

            try {
                const issue = await Issue.findById(issueId);

                issue.status = status;
                issue.save();

                res
                .status(200)
                .send({ 
                    successMessage: `Issue was ${status} successfully!`, 
                    issueId: issueId, 
                    status: status 
                });
            } 
            catch (error) {
                console.log(error);

                res
                .status(400)
                .send({ errorMessage: `Something go wrong with update Issues status` });
            }

            
        },
    },
    delete: {
        removeIssue: async (req, res, next) => {
            const issueId = req.params.issueId;

            try {
                const issue = await Issue.findById(issueId);
                const updatedFeature = await Feature.updateOne({ _id: issue.feature }, { $pull: { issues: { $in: [issueId] } }});
                const updatedUser = await User.updateOne({ _id: issue.creator }, { $pull: { issues: { $in: [issueId] } }});

                const deletedIssue = await Issue.deleteOne({_id: issueId});

                res
                .status(200)
                .send({ 
                    successMessage: `Issue was deleted successfully!`, 
                    issueId: issueId 
                });
            } 
            catch (error) {
                console.log(error);

                res
                .status(400)
                .send({ errorMessage: `Something go wrong with remove Issues` });
            }
        },
    }
}


// ISSUE
// name:  { type: String, required: true },
// description: { type: String, required: true },
// status: { type: String, required: true },
// date: { type: String, required: true },
// creator: { type: Schema.Types.ObjectId, ref: 'User' },
// project: { type: Schema.Types.ObjectId, ref: 'Project' },
// feature: { type: Schema.Types.ObjectId, ref: 'Feature' },

