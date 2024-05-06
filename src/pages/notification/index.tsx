import DefaultLayout from "../../layout/DefaultLayout";
import Chat from "./chat/chat";


const Natification = () => {

    interface dataInter {
        id: string,
        phoneNumber: string,
        sentDate: string,
        provider: string,
        error: string,
        activationCode: string,
        confirmed: string
    }

    const data: dataInter[] = [
        {
            id: "1",
            phoneNumber: "1234567890",
            sentDate: "2020-01-01",
            provider: "Twilio",
            error: "true",
            activationCode: "111",
            confirmed: "No"
        },
        {
            id: "2",
            phoneNumber: "1234567890",
            sentDate: "2020-01-01",
            provider: "Twilio",
            error: "true",
            activationCode: "111",
            confirmed: "No"
        }
    ];

    return (
        <DefaultLayout  >
            <Chat />
        </DefaultLayout >
    )
}

export default Natification