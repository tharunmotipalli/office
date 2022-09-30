import ClearvueValidator from "App/Validators/ClearvueValidator"
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import axios from "axios"

export default class ClearvuesController {
    public async colourCode(count:number){
        
        if(count==1440){
            return "black"
        }
        else if(count<1440){
            return "blue"
        }else if(count<1400){
            return "red"
        }
    }
    public async getCircuitData(id: number,startTime,endTime,resolution) {

        const CircuitData=await axios({
            method: 'POST',
            url: Env.get('CIRCUIT_DATA_URL'),
            headers: {
                'Authorization': `Bearer ${Env.get('TOKEN')}`,
                'Content-Type': 'application/json'
            },
            data: {
                "startTime": `${startTime}`,
                "endTime": `${endTime}`,
                "resolution": resolution,
                "circuitIds": [id],
                "tags": [
                    {
                        "aggregator": [
                            "count"
                        ],
                        "field": "kwh"
                    }
                ]
            }
        }).then((response) => { return response.data.data
        }).catch((err) => { console.log(err) })
        const result={...CircuitData}
        return result
    }
    public async getResult({request}: HttpContextContract) {
        const payload = await request.validate(ClearvueValidator)//validating {startDate,endDate,customerId,resolution}
        const startTime = payload['startDate'].toFormat('yyyy-MM-dd HH:mm:ss')
        const endTime = payload['endDate'].toFormat('yyyy-MM-dd HH:mm:ss')
        const resolution=payload.resolution
        const circuitData = await axios.get(Env.get('CIRCUIT_DETAILS_URL'), {
            headers: { "Authorization": `Bearer ${Env.get('TOKEN')}` }
        }).then((response) => {
            return response.data.data
        })
        const result=await Promise.all(circuitData.map(async (data) => Object.assign({}, data, { consumptionData: await this.getCircuitData(data.id,startTime,endTime,resolution) })))
    return Object.entries(result)
    }











    public async generateToken() { //to generate jwt token for authorisation
        return await axios({
            method: 'POST',
            url: "https://dev-cmp-auth-4iqhzhf6zq-nw.a.run.app/cmp-auth/v2/auth/login",
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "email": "cmp-bot@ngpwebsmart.com",
                "password": "tma6sTX9sW7$wM2e69l"
            }
        }).then((response) => { return response.data }).catch((err) => { console.log(err) })
    }
}

