import axios from "axios";

//server test
export const connect_string = 'https://192.168.32.81/'

// server tỷ xuân
// export const connect_string = 'https://192.168.60.21:7777/'

//server lạc tỷ 2
// export const connect_string = 'https://192.168.32.100:7777/'

export const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export const checkPermissionPrint = async (UserId: string) => {
    const url = connect_string + 'api/check_print_name';
    const data = {
        user_id1: UserId,
    };
    try {
        const response = await axios.post(url, data, config);
        return response.data;
    } catch (error) {
        return false; 
    }
};