import { User, Note } from '../models/index.js';

export default {
    get: {
        listNotes: async (req, res, next) => {
            const creatorId = req.authUser._id;
            
            try {

                const user = await User
                                        .findById(creatorId)
                                        .populate('notes');

                const userNotes = user.notes;

                res
                .status(201)
                .send(userNotes);

            } catch (error) {
                console.log(error);
                res
                .status(400)
                .send({ errorMessage: `Something go wrong with get Note` });
            }
        }
    },
    post: {
        addNote: async (req, res, next) => {
            const { title, description } = req.body;
            const creatorId = req.authUser._id;

            try {
                const user = await User.findById(creatorId);

                const createdNote = await Note.create({ title, description, date: Date.now(), creator: creatorId });
                
                user.notes.push(createdNote._id);
                user.save();

                const note = await Note
                                        .findById(createdNote._id)
                                        .populate('creator');

                console.log(note);

                res
                .status(201)
                .send({ 
                    successMessage: `${title} note was added successfully!`, 
                    note: note
                });
            } 
            catch (error) {
                console.log(error);
                res
                .status(400)
                .send({ 
                    errorMessage: `Something go wrong with add Note` 
                });
            }
        },
    },
    put: {
        updateNote: async (req, res, next) => {

        },
    },
    delete: {
        removeNote: async (req, res, next) => {
            const noteId = req.params.noteId;
            try {

                const deletedNote = await Note.deleteOne({ _id: noteId });
                res
                .status(201)
                .send({ 
                    successMessage: 'Note was deleted successfuly', 
                    noteId: noteId 
                });
            } 
            catch (error) {
                console.log(error);
                res
                .status(400)
                .send({ errorMessage: `Something go wrong with remove Note` });
            }
        },
    }
}
