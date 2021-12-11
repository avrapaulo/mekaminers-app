import Image from 'next/image'

const Homepage = () => {
  return (
    <div className="uppercase flex justify-center items-center h-screen -mt-16 lg:-mt-28 text-white font-bold">
      <div className="md:relative md:p-80">
        <Image alt="Logo Meka Miners" layout="fill" objectFit="contain" src="/ops.png" />
      </div>
    </div>
  )
}

export default Homepage
