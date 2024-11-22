import axios from "axios";
import { connect_string } from "../screens/LoginScreen/ChooseFactory";

export function barcodeToMaterial(barcode: string): Promise<any> {

    const url = connect_string + "api/Barcode_To_Material";
    const data = {
        Barcode: barcode.trim(),
    };

    return new Promise((resolve, reject) => {
      axios.post(url, data)
        .then(response => {
          resolve(response.data); // Trả về dữ liệu từ response
        })
        .catch(error => {
          reject(error); // Reject với lỗi nếu có lỗi xảy ra
        })
    });
  }

export const isEmptyOrNull = (val: any) => val === "" || val === null;
