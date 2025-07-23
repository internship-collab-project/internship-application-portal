import {Link} from 'react-router-dom';


const NotFoundPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen text-center'>
        <h1 className='text-8xl text-dark font-extrabold'>404</h1>
        <h2 className='text-4xl font-bold mt-4'>Page Not Found</h2>
        <p className='text-lg mt-2'>The page you are looking for does not exist.</p>
        <Link to="/applicantDashboard" className='btn btn-primary'>Go Back to Dashboard</Link>

    </div>
  )
}

export default NotFoundPage