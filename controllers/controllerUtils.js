import { Feature } from '../models/index.js';

export const getFeatureWithRelations = async (featureId) => {
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