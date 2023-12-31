import React from "react";
import Head from "next/head";
import { MongoClient,ObjectId } from "mongodb";
import MeetupDetail from "@/components/meetups/MeetupDetail";

const MeetupDetails =(props)=>{
    return(
        <React.Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name='description' content={props.meetupData.description} />
            </Head>
            <MeetupDetail image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description} />
        </React.Fragment>
    );
};

export const getStaticPaths =async() =>{
    const client = await MongoClient.connect('mongodb+srv://samaan:IoliZqYzwDxNiH7I@meetups.nzp8ytk.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp');
    const db = client.db();
  
    const meetupsCollection = db.collection('meetups');
  
    const meetups = await meetupsCollection.find({}, { _id:1 }).toArray();
  
    client.close();
    return {
        fallback: 'blocking',
        paths: meetups.map((meetup)=>({
            params:{
                meetupId: meetup._id.toString()
            }
        }))
    }
};

export const getStaticProps=async(context)=>{
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://samaan:IoliZqYzwDxNiH7I@meetups.nzp8ytk.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp');
    const db = client.db();
  
    const meetupsCollection = db.collection('meetups');
  
    const selectedMeetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId)});
  
    client.close();
    return {
        props:{
            meetupData:{
                id:selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            }
        },
    };
  };

export default MeetupDetails