import Image from "next/image";

export default function Loading() {
    return <div className='flex-center w-full'>
        <Image src="/assets/icons/loader.svg"
            alt='loader'
            width={27}
            height={27} />
    </div>
}