import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import summonerSchema from '@/lib/models/summoner'
import connectDb from '@/services/mongo'



async function getSummonerData() {
    try {

        const Summoner = mongoose.model('Summoner', summonerSchema)
        await connectDb()
  
        const summoners = await Summoner.find({}); 
        
  
        return summoners

    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error)
      throw error
    }
}


export async function POST(request : Request) {

    const Summoner = mongoose.model('Summoner', summonerSchema)
    await connectDb()

    const summoners = await Summoner.find({});

    let url = ""


    for(const Summs in summoners){
        url = `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${Summs["name"]}`

        const API_KEY = process.env.RIOT_API_KEY || ""
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "X-Riot-Token" : API_KEY
            }
        })
        const json = await response.json()
    }









    

    
}