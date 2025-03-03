const { MongoClient, ObjectId } = require('mongodb');

class NoteDatabase {
    /**
     * @param {string} connectionString - Your MongoDB connection string.
     * @param {string} dbName - The name of the database.
     */
    constructor(connectionString, dbName = 'note-app-db') {
        this.connectionString = connectionString;
        this.dbName = dbName;
        this.client = new MongoClient(this.connectionString);
        this.db = null;
        this.collection = null;
    }

    async connect() {
        if (!this.db) {
            await this.client.connect();
            this.db = this.client.db(this.dbName);
            this.collection = this.db.collection('notes');
        }
    }

    async getAll() {
        await this.connect();
        const dataset = await this.collection.find({}).toArray();
        console.log(dataset);
        return dataset;
    }

    async getById(id) {
        await this.connect();
        const objectId = new ObjectId(id);
        try {
            const note = await this.collection.findOne({ _id: objectId });
            return note
        } catch (error) {
            console.error('Invalid ID format:', error);
            return null;
        }
    }

    async create(note) {
        await this.connect();
        // If a string is provided, wrap it in an object with a "content" field.
        if (typeof note === 'string') {
            note = { content: note };
        }
        const result = await this.collection.insertOne(note);
        return this.getById(new ObjectId(result.insertedId));
    }

    async update(id, noteData) {
        await this.connect();
        const result = await this.collection.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: noteData },
            { returnDocument: 'after' }
        );
        return result;
    }

    async delete(id) {
        await this.connect();
        const result = await this.collection.findOneAndDelete({ _id: new ObjectId(id) });
        return result;
    }
}

module.exports = NoteDatabase;
