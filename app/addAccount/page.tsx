"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function addAccount(){

    const [accountName, setAccountName] = useState("")

    async function handleFormSubmit(){
        event?.preventDefault()

        let response = await fetch('/api/addAccount', {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                accountName
            })
        })
    }

    return (
        <form className="w-1/5">
            <Input type="text" placeholder="Account Name" value={accountName} onChange={(e) => setAccountName(e.target.value) }/>
            <Button onClick={() => handleFormSubmit()}>Submit</Button>
        </form>
    )
}