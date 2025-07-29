
const Hero = ({title ='Welcome to the Presidio Internship Portal!', subtitle='Here you can manage your profile, view internships, and track applications'}) => {
  return (
    <section className="bg-[#E8F0F5] py-20 text-center mb-4">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="mt-4 text-lg">{subtitle}</p>
    </section>

  )
}

export default Hero