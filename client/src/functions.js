import store from "./redux/store";
import axios from "axios";
import qs from "qs";


function isLogged() {
    axios.get(
        "/user/islogged").then(data => {

            console.log("response isLogged: " + data.data);

            if (data.data) store.dispatch({ type: "EXIST" })
            else store.dispatch({ type: "NULL" })

            console.log("after isLogged response store.getState() " + store.getState())
        });
}



function loginUser() {

    axios({
        method: "post",
        url: "/user/login",
        data: qs.stringify({
            email: "fb@gmail.com",
            password: "test123"
        }),
        headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' }
    })
        .then(result => {
            //const jsonResult = result.json();
            console.log(result)

            store.dispatch({ type: "EXIST" })
            console.log("after login post request store.getState() " + store.getState());

            isLogged();
        });
}

export { isLogged, loginUser };