import Link from "next/link";
import { menuItem } from "../lib/definision";

export default function Menu({items} : {items: menuItem[]}) {


    return(
        <div>
            <ul className="flex gap-10 text-primary">
                {items.map((item,index) => <li key={index}>
                    <Link href={item.href}><p>{item.title}</p></Link>
                </li> )}
            </ul>
        </div>
    )
}