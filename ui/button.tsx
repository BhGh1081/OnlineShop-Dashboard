export default function Button ({type, caption, className}: { type?: 'submit' | 'reset' | 'button', caption:string, className?: string}) {


    return(
        <>
        <button type={type} className={`${className} bg-primary text-xl text-white rounded-lg cursor-pointer`}>{caption}</button>
        </>
    )
}