
const CardApplicant = ({children, bg = 'bg-[#E8F0F5]'}) => {
  return (
    <div className={`${bg} p-4 rounded-lg shadow-md`}>
      {children}
    </div>
  )
}

export default CardApplicant