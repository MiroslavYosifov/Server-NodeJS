import { Project, User, Feature, Issue, Suggestion } from '../models/index.js';

export default {
    get: {
        getIssue: async (req, res, next) => {
            // const { issueId } = req.body;
            try {
                const issue = await Issue
                                        .findById("603d88737fb8712f7054641d")
                                        .populate('creator')
                                        .populate('feature')
                                        .populate('project')
                res.send(issue);
            } catch (error) {
                console.log(error);
            }
        }
    },
    post: {
        addIssue: async (req, res, next) => {
            const { name, description, status, featureId } = req.body;
            const creatorId = req.authUser._id;
            // TO DO VALDIATION OF DATA
            try {
                const user = await User.findById(creatorId);
                const feature = await Feature.findById(featureId);

                const projectId = feature.project;

                const issue = await Issue.create({ name, description, status, date: Date.now(), creator: creatorId, feature: featureId, project: projectId });
                
                user.issues.push(issue._id);
                user.save();

                feature.issues.push(issue._id);
                feature.save();

                res
                .status(201)
                .send(issue);

    
            } 
            catch (error) {
                console.log(error);
            }
        },
    },
    put: {
        updateIssue: async (req, res, next) => {

        },
    },
    delete: {
        removeIssue: async (req, res, next) => {
            //const { issueId } = req.body;
            try {
                const issue = await Issue.findById("603e4f93f5aa7c0dc0e2a7bb");

                const updatedFeature = await Feature.updateOne({ _id: issue.feature }, { $pull: { issues: { $in: ["603e4f93f5aa7c0dc0e2a7bb"] } }});
                const updatedUser = await User.updateOne({ _id: issue.creator }, { $pull: { issues: { $in: ["603e4f93f5aa7c0dc0e2a7bb"] } }});

                const deletedIssue = await Issue.deleteOne({_id: "603e4f93f5aa7c0dc0e2a7bb"});
                
                res.send("Issue was deleted!")
            } 
            catch (error) {
                console.log(error);
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

