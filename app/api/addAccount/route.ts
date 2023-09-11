import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import summonerSchema from '@/lib/models/summoner'
import connectDb from '@/services/mongo'

const Summoner = mongoose.model('Summoner', summonerSchema);

async function createSummoner(json){
    await connectDb()

    try{
        await Summoner.create(json)
        return {message : "all okay"}
    }
    catch (e) {
        return {error : e.message}
    }
}

export async function POST(request : Request) {
    const { accountName } = await request.json()

    const url = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${accountName}`
    
    const API_KEY = process.env.RIOT_API_KEY || ""
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "X-Riot-Token" : API_KEY
        }
    })
    const json = await response.json()

    console.log(json)

    const result = await createSummoner(json)
    if (result?.error){
        return NextResponse.json({message : "Server Error"}, {status : 500})
    }
    
    return NextResponse.json({message : "Account created successfully"})
}