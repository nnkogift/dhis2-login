import axios from "axios";

export const LOGIN_ENDPOINT = 'dhis-web-commons-security/login.action'


export async function login(username: string, password: string) {

    const formData = new FormData();
    formData.append('j_username', username);
    formData.append('j_password', password);
    try {

        const response = await axios.post(`${process.env.REACT_APP_DHIS2_BASE_URL}/${LOGIN_ENDPOINT}`, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
            }
        });

        console.log(response.data)

        return response.status === 200;

    } catch (e) {

    }
}


export async function preserveCookies(baseUrl: string) {
    localStorage.setItem("DHIS2_BASE_URL", baseUrl);
}
