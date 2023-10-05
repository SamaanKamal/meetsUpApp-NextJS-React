import MeetupList from "@/components/meetups/MeetupList";

const DUMMY_MEETUPS = [
    {
      id: 'm1',
      title: 'A First Meetup',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
      address: 'Some address 5, 12345 Some City',
      description: 'This is a first meetup!'
    },
    {
      id: 'm2',
      title: 'A Second Meetup',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
      address: 'Some address 10, 12345 Some City',
      description: 'This is a second meetup!'
    }
  ];

const HomePage =(props)=>{
    return(
    <MeetupList meetups={props.meetups} />
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
  return {
      props:{
        meetups:DUMMY_MEETUPS
      },
      revalidate:10
  };
};

export default HomePage;