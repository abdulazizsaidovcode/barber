import { useEffect } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Chat from "./chat/index";
import { getMasters } from "../../helpers/api-function/master/master";
import masterStore from "../../helpers/state_managment/master/masterStore";
import clientStore from "../../helpers/state_managment/client/clientstore";
import { getClients } from "../../helpers/api-function/client/client";


const Natification = () => {
    const { setData, setTotalPage } = masterStore()
    useEffect(() => {
        getMasters({ setData, setTotalPage })
    }, [])

    const { setClientData, setClientTotalPage } = clientStore()
    useEffect(() => {
        getClients({setClientData, setClientTotalPage})
    }, [])

    return (
        <DefaultLayout  >
            <Chat />
        </DefaultLayout >
    )
}

export default Natification