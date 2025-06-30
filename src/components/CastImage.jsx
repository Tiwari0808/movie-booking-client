
const CastImage = ({url,name }) => {
    return (
            <div className="flex items-center flex-col">
                <img className='rounded-4xl w-[101px] h-[101px] bg-cover bg-center' src={url} alt="Actor Photo" />
                <p className="text-center">{name}</p>
                <p className='text-[#B7B7B7] font-light text-[12px]'>Salman khan</p>
            </div>
    )
}

export default CastImage