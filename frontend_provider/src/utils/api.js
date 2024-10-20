import AsyncStorage from "@react-native-async-storage/async-storage";

export const attachToken = async (url, options={}) => {
    const token = await AsyncStorage.getItem('token');
    if(token){
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`
        };
    }
    const response = await fetch(url, options);
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
        return response.json();  
    } else {
        return response.text(); 
    }
}