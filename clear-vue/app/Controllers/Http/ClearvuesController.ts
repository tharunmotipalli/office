import axios from "axios"

export default class ClearvuesController {
    public async read({request}) {
        const customerId=62
        //const StartDate=request.params().startDate
        //const EndDate=request.params().endDate
       // const Resolution=request.params().Resolution

        const search = await axios.get(`https://dev-cmp-business-1xhp7nh4.nw.gateway.dev/cmp-bo/api/v1/circuits?customerId=${customerId}&siteId&type[]=CIRCUIT&type[]=PIPE`, {
            headers: { "Authorization": `Bearer ${process.env.TOKEN}` }
        }).then((response) => { return response.data.data})
    
            const getData=await axios({
                method: 'POST',
                url: "https://dev-cmp-business-1xhp7nh4.nw.gateway.dev/analytics/energy",
                headers: {
                    'Authorization': `Bearer ${process.env.TOKEN}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    "startTime": `2022-09-12 00:00:00`,
                    "endTime": `2022-09-15 00:00:00`,
                    "resolution": 84600,
                    "circuitIds": [
                        119
                    ],
                    "tags": [
                        {
                            "aggregator": [
                                "count"
                            ],
                            "field": "kwh"
                        }
                    ]
                }
            }).then((response)=>{return response.data.data})
return {search,...getData}
       
    }
    public async generateToken() {
        return axios.post('https://dev-cmp-auth-4iqhzhf6zq-nw.a.run.app/cmp-auth/v2/auth/login').then((response) => { console.log(response) })

    }
}
