import { Hourglass } from "lucide-react"

export default function Logo(){
  return (
    <div className="flex justify-center items-center gap-1">
      <div className="bg-green-600 rounded p-1">
        <Hourglass className="w-5 h-5"/>
      </div>
      <h1 className="font-extrabold text-center text-2xl">UsePomo</h1>
    </div>
  )
}