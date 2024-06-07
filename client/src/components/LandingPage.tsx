import { useLayoutEffect , useRef } from 'react'
import gsap from "gsap"

const LandingPage = () => {
 
    const comp = useRef(null)

    useLayoutEffect(() => {
        let control = gsap.context(()=>{
        const t1 = gsap.timeline()
        t1.from('#intro-slider',{
            yPercent:'100',
            duration:1.3,
            delay:0.6,
        })
        .to("#intro-slider",{
            opacity:0,
            xPercent:"-100",
            duration:0.4,
            onComplete:()=>{
                gsap.set(['#intro-slider','.title-1'],{display:'none'})
            }
        })
        },comp)

        return () => control.revert()
    },[])

    const content = [
        {
        title:"",
        para:" Campus Space is a cutting-edge solution tailored for institutions to streamline the management of their classrooms. It empowers both students and teachers with the tools they need to effortlessly check room availability, ensuring that vacant rooms are efficiently utilized."
        }, 
         {
          title:"Real-Time Room Availability",
         para:"Campus Space provides up-to-the-minute information on room availability, allowing users to quickly find and reserve vacant rooms. This dynamic feature helps in reducing scheduling conflicts and optimizes the use of institutional resources."
          },
          {
            title:"Efficient Booking System",
           para:"Teachers can log into their accounts to book available rooms with just a few clicks. This intuitive booking system is designed to save time and reduce the hassle of finding a suitable room for classes, meetings, or events."
            },
            {
             title:"Daily Data Management",
             para:"An admin manages the data on a daily basis, ensuring that all information is current and accurate. This role is crucial for maintaining the reliability of the system and providing users with the most up-to-date room availability."
             },
             {
                title:"Student Timetables",
                para:"Students can easily access their timetables through Campus Space, offering them a clear view of their daily schedules. This feature helps students stay organized and manage their time more effectively."
             },
             {
                title:"Teacher Absence Notifications",
                para:"Campus Space keeps students informed about teacher absences, so they can adjust their plans accordingly. This transparency helps in minimizing disruptions to the academic schedule and enhances overall communication within the institution."
             },
             {
                title:"Better Communication",
                para:"With features like timetable access and absence notifications, Campus Space fosters better communication between students, teachers, and administrators. This seamless flow of information enhances the overall educational experience."
             },
]

 return (
   
    <div  ref={comp}>
  
    <div id='intro-slider' 
    className='h-screen p-10 '>
   
   <h1  id='title-1'
   className='text-xl font-bold md:text-6xl lg:text-9xl' >
    Welcome to <span className='text-green-500'> campus space...</span> </h1>
    </div>

    <div id='body' className='m-5 md:m-9 lg:m-14 flex items-center '>

       
    <div>
       {
        content.map(({title,para}) => (
            <div className='border m-4 rounded-xl p-2'>   
                <div className='text-3xl text-primary '><b>{title}</b></div>
                <div>{para}</div>
            </div>
        ))
       }
   </div>
      
   
      </div> 
       </div>
        
 
  )
}

export default LandingPage
