import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Image from "next/image";


export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
        <SectionHeaders 
          subHeader={'Our Story'}
          mainHeader={'About Us'} />
        <div className="text-gray-500 text-sm mx-auto max-w-2xl mt-4 flex
        flex-col gap-4">
          <p> 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </section>
      <section className="text-center my-8">
        <SectionHeaders 
          subHeader={'Don\'t hesitate'}
          mainHeader={'Contact Us'} 
        />
        <div className="mt-8">
          <a href="tel:555-555-5555" className="text-gray-500 text-2xl underline ">
            +46 555-555-5555
          </a>
        </div>
      </section>
      <footer className="border-t p-8 text-center text-gray-500 my-16">
        &copy; 2024 All rights reserved
        </footer>
    </>

  );
}
