import axios from "axios";
import { newsletters_url } from "../../api";
import { config } from "../../token";
import { clearFunction } from "../../../common/clear-function/clear-function.tsx";

interface IChatLetters {
  subject?: string;
  date?: string;
  page: number;
  size: number;
  setLetterData: (val: any) => void;
}

export const GetChatLetters = async ({
  subject,  
  date,
  page = 0,
  size = 10,
  setLetterData,
}: IChatLetters) => {
  await axios
    .get(
      `${newsletters_url}/list${subject ? `?subject=${subject}` : ""}${
        date ? (subject ? `&date=${date}` : `?date=${date}`) : ""
      }${subject || date ? "&" : "?"}page=${page}&size=${size}`,
      config
    )
    .then((res) => {
      if (res.data.success === true) {
        setLetterData(res.data.body);
      } else {
        setLetterData([]);
        clearFunction();
      }
    })
    .catch(() => {
      setLetterData([]);
      clearFunction();
    });
};
