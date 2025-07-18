import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from 'next/image'
 
export default function Home() {

  
  return (
    <div>
      <Navbar />
      
        <div className='flex justify-center items-center h-[85vh] container mx-auto'>
            <div className='flex flex-col gap-4 items-center'> 
                  <Image
                  src="/chatbg.jpg"
                  alt="Picture of the author"
                  width={500}
                  height={500}
                />
              <h1 className="md:text-3xl font-bold text-2xl">🟢 Full-Stack Real-Time Chat App</h1>
              <h1 className="font-semibold text-sm">Built with Next.js, Django REST Framework & Django Channels</h1>
            <h1 className='text-center text-sm'> A modern chat application showcasing full-stack integration, authentication, and <br />live updates — all crafted from scratch.</h1>
            <Button>Chat Now!</Button>
            </div>
        </div>
    </div>
  );
}
