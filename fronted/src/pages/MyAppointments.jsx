import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return `${dateArray[0]} ${months[Number(dateArray[1]) - 1]} ${dateArray[2]}`
  }

  const navigate = useNavigate()

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, { headers: { token } })
      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  //for cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      
      const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment', {appointmentId}, {headers: {token}})
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      }else{
        toast.error(data.message)
      }
    
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
//payment
const initPay = (order) => {
  const options = {
    key : import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: 'Appointment Payment',
    description: 'Appointment Payment',
    order_id: order.id,
    receipt: order.receipt,
    handler: async(response) => {
      console.log(response)

      try {
      
      const {data} = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, {headers: {token}})
      if (data.success) {
        
        getUserAppointments()
        navigate('/my-appointments')
      }
    
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

    }
  }

  const rzp = new window.Razorpay(options)
  rzp.open()

}



  //for payment
  const appointmentRazorpay = async (appointmentId) => {

    try {
      
      const {data} = await axios.post(backendUrl + '/api/user/payment-razorpay', {appointmentId}, {headers: {token}})
      if (data.success) {
        
        initPay(data.order)
       
        // console.log(data.order)
      }
    
    } catch (error) {
      
    }

  }





  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b text-lg'>My Appointments</p>

      {appointments.length === 0 ? (
        <div className="text-center mt-16">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="No appointments"
            className="w-24 mx-auto opacity-40"
          />
          <p className="text-gray-600 text-xl font-semibold mt-4">No Appointments Booked Yet</p>
          <p className="text-gray-500 text-base mt-1">You haven’t scheduled any consultations yet. Book one when you're ready!</p>
        </div>
      ) : (
        <div>
          {appointments.map((item, index) => (
            <div
              className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b'
              key={index}
            >
              <div>
                <img className='w-32 bg-indigo-50 rounded-md' src={item.docData.image} alt='Doctor' />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                <p className='text-xs'>{item.docData.address.line1}</p>
                <p className='text-xs'>{item.docData.address.line2}</p>
                <p className='text-xs mt-1'>
                  <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
              <div className='flex flex-col gap-2 justify-end'>

               {!item.cancelled && item.payment && !item.isCompleted &&
               <button className='sm:min-w-48 py-2 border rounded text-gray-700 bg-indigo-200'>
                Paid
               </button>
               }

               {!item.cancelled && !item.payment && !item.isCompleted &&
                <button onClick={() => appointmentRazorpay(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 cursor-pointer'>
                  Pay Online
                </button> }

                {!item.cancelled && !item.isCompleted &&
                <button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer'>
                  Cancel Appointment
                </button> 
                }

                    {
                      item.cancelled && !item.isCompleted &&
                      <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>
                        Appointment Cancelled
                      </button>
                    }
                  {
                    item.isCompleted &&
                    <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>
                      Completed</button>
                  }


              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyAppointments
