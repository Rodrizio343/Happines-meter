import { addPeople } from "@/redux/states"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { PeopleTable } from "./components"
import { People } from "@/data/people"



const Home = () => {

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(addPeople(People))
  }, [])
  

  return <PeopleTable />
}

export default Home