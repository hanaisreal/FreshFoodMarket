import Image from 'next/image';
import Right from '../icons/Right';

export default function Hero() {
    return (
    <section className='hero mt-4'>
        <div className='py-12'>
                <h1 className='text-4xl font-semibold '>
                    우리의 건강한 한끼를 <br/> 
                    책임지는<br/> 
                    <span className='text-primary'>
                        맛난이 농산물
                    </span>
                </h1>
                <p className='my-6 text-gray-500 text-sm'>
                못난이 농산물, 완벽하지 않아도 괜찮아, 
                매일을 채우는 간단하면서도 진정한 맛의 기쁨.
                </p>
                <div className='flex gap-4 text-sm'>
                <button className='bg-primary uppercase flex justify-center items-center gap-2 text-white px-8 py-2 rounded-full'> 
                    정기배송
                    <Right />
                </button>
                <button className='flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold'> 
                    더 알아보기
                    <Right />
                </button>
                </div>
        </div>
        <div className="relative" > 
            <Image src={'/fruits.png'} 
            layout={'fill'} objectFit={'contain'} alt={'Pizza'} />
        </div>
        
    </section>
    )
}