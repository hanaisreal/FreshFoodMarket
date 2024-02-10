import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Image from "next/image";


export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
        <SectionHeaders 
          subHeader={'about us'}
          mainHeader={'우리의 미션'} />
        <div className="text-gray-500 text-sm mx-auto max-w-2xl mt-4 flex
        flex-col gap-4">
          <p> 
          우리는 자연 그대로의 모습을 담은 농산물을 통해 지속 가능한 식문화를 창조합니다.
          완벽하지 않은 모양도, 그 안에 담긴 진정한 가치를 인정하고 사랑합니다.
          모든 이가 건강한 식탁을 누릴 수 있도록, 우리는 못난이 농산물의 가치를 전합니다.
          지구를 위한 작은 실천, 못난이 농산물과 함께하는 매일이 더욱 특별해집니다.
          </p>
          <p>
          우리의 열정은 단순히 농산물을 판매하는 데 그치지 않습니다. 
          우리는 소비자와 자연이 하나 될 수 있는 지속 가능한 미래를 꿈꿉니다. 
          못난이 농산물을 통해, 우리는 외모가 아닌 진짜 맛과 영양의 가치를 재발견하고, 
          이를 통해 더 많은 사람들이 의식 있는 소비를 실천하도록 영감을 줍니다. 
          우리의 노력이 모여, 건강한 식생활 문화와 지구 환경 보호에 기여하는 큰 변화를 만들어갑니다.
          </p>
        </div>
      </section>
      <section className="text-center my-8">
        <SectionHeaders 
          subHeader={'맛난이 농산물 고객센터'}
          mainHeader={'연락주세요'} 
        />
        <div className="mt-8">
          <a href="tel:555-555-5555" className="text-gray-500 text-2xl underline ">
            +82 555-555-5555
          </a>
        </div>
      </section>
    </>

  );
}
