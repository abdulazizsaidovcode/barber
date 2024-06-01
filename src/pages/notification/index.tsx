import { useEffect } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Chat from "./chat/index";
import { getMasters } from "../../helpers/api-function/master/master";
import masterStore from "../../helpers/state_managment/master/masterStore";


const Natification = () => {
    const { setData, setTotalPage } = masterStore()
    useEffect(() => {
        getMasters({ setData, setTotalPage })
    }, [])
    return (
        <DefaultLayout  >
            <Chat />
        </DefaultLayout >
    )
}

export default Natification