import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const {docId} = useParams()
  const{doctors, currencySymbol, backendUrl, token, getDoctorsData} = useContext(AppContext)

  const [docInfo, setDocInfo] = useState(null)

  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const[slotTime, setSlotTime] = useState('')


  const navigate = useNavigate()

  const getAvailableSlot = async () => {
  setDocSlots([]);
  let today = new Date();

  for (let i = 0; i < 7; i++) {
    let currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);

    let startHour = 10;
    let endHour = 20; // ✅ 7 PM

    if (i === 0) {
      let now = new Date();
      let hourNow = now.getHours();
      if (now.getMinutes() > 0) hourNow += 1;

      startHour = Math.max(hourNow, 10);
      if (startHour >= endHour) {
        setDocSlots(prev => ([...prev, []]));
        continue;
      }
    }

    currentDate.setHours(startHour, 0, 0, 0);
    let endTime = new Date(currentDate);
    endTime.setHours(endHour, 0, 0, 0);

    let timeSlots = [];
    while (currentDate < endTime) {
      let formattedTime = currentDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });

      let day = currentDate.getDate()
let month = currentDate.getMonth() + 1
let year = currentDate.getFullYear()

const slotDate = day + "_" + month + "_" + year
const slotTime = formattedTime

const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

if (isSlotAvailable) {
    // add slot to array
    timeSlots.push({
        datetime: new Date(currentDate),
        time: formattedTime
    })
}



      //increment current time by 60minutes
      currentDate.setMinutes(currentDate.getMinutes() + 60);
    }

    setDocSlots(prev => ([...prev, timeSlots]));
  }
};

//to book appointment

const bookAppointment = async () => {

  if(!token){
    toast.warn('Login to Book Appointment')
    return navigate('/login')
  }

  try {

    const date = docSlots[slotIndex][0].datetime

    let day = date.getDate()
    let month = date.getMonth()+1
    let year = date.getFullYear()

    const slotDate = day + "_" + month + "_" + year
    
    const { data } = await axios.post(backendUrl + '/api/user/book-appointment', {docId, slotDate, slotTime}, {headers:{token}})

    if(data.success){
      toast.success(data.message)
      getDoctorsData()
      navigate('/my-appointments')
    }else{

      toast.error(data.message)
    }

  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}

  useEffect(() => {
    getAvailableSlot()
  },[docInfo])

  useEffect(()=> {
    console.log(docSlots);
  },[docSlots])

  const fetchDocInfo = async () => {
    const docInfo = doctors.find (doc => doc._id === docId)
    setDocInfo(docInfo)
    // console.log(docInfo)
  }

  useEffect (() => {
    fetchDocInfo()
  },[doctors, docId])//if any of the value either doctors or docid changes then only the useeffect function wll be excuted

  return docInfo &&(
    <div>
         {/* -------- doctor details---- */}
         <div className='flex flex-col sm:flex-row gap-4'>
          <div>
            <img src = {docInfo.image} className='bg-[#5f6FFF] w-full sm:max-w-72 rounded-lg'/>
          </div>

          <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
            {/* --------doc info name degree----- */}
            <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
              {docInfo.name} <img src = {assets.verified_icon} className='w-5'/> </p>
            <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
              <p>{docInfo.degree} - {docInfo.speciality}</p>
              <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
            </div>

            {/* -------about doctors----- */}
            <div>
              <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'> 
                About <img src = {assets.info_icon} /></p>
              <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{docInfo.about}</p>
            </div>
            <p className='text-gray-500 font-medium mt-4'>
              Appointment Fee : <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
            </p>
          </div>
         </div>

        {/* -------BOOKING SLOT ------ */}
        <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
          <p>Booking Slots</p>
          <div className='flex gap-4 items-center w-full overflow-x-scroll mt-4'>
  {docSlots.length > 0 &&
    docSlots.map((item, index) => {
      const isToday = index === 0;
      const isSelected = slotIndex === index;
      const hasSlots = item.length > 0;

      return (
        <div
          onClick={() => hasSlots && setSlotIndex(index)}
          key={index}
          className={`flex flex-col justify-center items-center min-w-16 w-16 h-20 rounded-full cursor-pointer text-center transition-all duration-200
            ${isSelected && hasSlots ? 'bg-[#5f6FFF] text-white' : ''}
            ${!hasSlots ? 'bg-red-100 border border-red-500 text-red-700 cursor-not-allowed' : 'border border-gray-300'}
          `}
        >
          {hasSlots ? (
            <>
              <p className='font-semibold text-sm'>{daysOfWeek[item[0].datetime.getDay()]}</p>
              <p className='text-sm'>{item[0].datetime.getDate()}</p>
            </>
          ) : (
            <>
              <p className='font-semibold text-sm'>Today</p>
              <p className='text-xs font-semibold text-red-700'>No Slots</p>
            </>
          )}
        </div>
      );
    })}
</div>



            <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
              {docSlots.length && docSlots[slotIndex].map((item, index) =>(
                <p onClick={()=> setSlotTime(item.time)} key = {index} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-[#5f6FFF] text-white' : 'text-gray-600 border border-gray-400'}`}>
                  {item.time.toLowerCase()}

                </p>
              ))}
            </div>
              
              <button onClick={bookAppointment} className='bg-[#5f6FFF] text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer'>Book an Appointment</button>
        </div>
                {/* --------- listing related doctors----- */}
            <RelatedDoctors docId = {docId} speciality = {docInfo.speciality}/>
    </div>
  )
}

export default Appointment