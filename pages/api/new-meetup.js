import { MongoClient } from "mongodb";

const handler = async (req, res)=>{
    if(req.method ==='POST')
    {
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://samaan:IoliZqYzwDxNiH7I@meetups.nzp8ytk.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp');
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        console.log(result);
        
        client.close();

        res.status(201).json({message: 'inserted Successfully'});
    }
};





export default handler;