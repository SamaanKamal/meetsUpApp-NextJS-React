import React from "react";
import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

const NewMeetupPage = () =>{
    const router = useRouter();
    const addMeetupHandler = async(enteredMeetupData) => {
        const response = await fetch('/api/new-meetup',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(enteredMeetupData)
        });
        const data = await response.json();
        console.log(data);
        router.push('/');
    };
    return(
        <React.Fragment>
            <Head>
                <title>Add a New Meetup</title>
                <meta
                name='description'
                content='Add your own meetups and create amazing networking opportunities.'
                />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </React.Fragment>
    );
};

export default NewMeetupPage;