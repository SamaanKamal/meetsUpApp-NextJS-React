import React from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "@/components/meetups/MeetupList";


const HomePage =(props)=>{
    return(
    <React.Fragment>
      <Head>
        <title>Meetups</title>
        <meta
          name='description'
          content='Browse a huge list of highly active React meetups!'
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </React.Fragment>
    );
};


// runs on the server 
// runs for every incoming request / effecient for data changing frequently
// export const getServerSideProps=(context)=>{
//   const req = context.req;
//   const res = context.res;
//   return {
//     props:{
//       meetups:DUMMY_MEETUPS
//     },
//   };
// };

// runs after deployment 
// runs for every number of seconds / effecient for data changing unfrequently 
// data and page is cached and stored and it will be reused 
export const getStaticProps=async()=>{
  const client = await MongoClient.connect('mongodb+srv://samaan:IoliZqYzwDxNiH7I@meetups.nzp8ytk.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp');
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
      props:{
        meetups:meetups.map((meetup)=>({
          title:meetup.title,
          address: meetup.address,
          image: meetup.image,
          id: meetup._id.toString()
        }))
      },
      revalidate:1
  };
};

export default HomePage;