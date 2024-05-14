import axios from "axios";


 class ApiService{
     async getAllDemands(){
        let demands = await axios.get("http://localhost:8080/project/alldemands");
        console.log(demands);
    }
}
export default new ApiService();