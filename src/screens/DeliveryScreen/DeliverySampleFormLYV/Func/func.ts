// hàm lấy thông tin po, testno, version

import axios from "axios";
import { connect_string } from "../../../LoginScreen/ChooseFactory";

export const fromPOgetTestNoVersion = async (pono: string) => {
    const url = connect_string + "api/get_testNo_Version"
    const data = {
        PONO: pono
    }

    try {
        const res = await axios.post(url, data);
        return res.data
    } catch (error) {
        console.error("Error during get test no and version:", error);
    }
}

export const fromPOgetTestNoVersion_WH = async (pono: string) => {
    const url = connect_string + "api/get_testNo_Version_WH"
    const data = {
        PONO: pono
    }

    try {
        const res = await axios.post(url, data);
        return res.data
    } catch (error) {
        console.error("Error during get test no and version:", error);
    }
}