import { getUserId } from "../../lib/actions";
import React, {useState, useEffect } from 'react';
import apiService from "@/app/services/apiService";
import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import { UserType } from "../page";
import { getAccesToken } from "../../lib/actions";

export type MessageType = {
    id: string;
    name: string;
    body: string;
    conversationId: string;
    set_to_id: UserType;
    created_by: UserType
}

const ConversationPage = async ({ params }: { params: {id: string }}) => {
    const userId = await getUserId();
    const token = await getAccesToken();
    console.log('token', token)
    if (!userId || !token) {
        return (
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>You need to be authenticated...</p>
            </main>
        )
    }

    const conversation = await apiService.get(`/api/chat/${params.id}/`)

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <ConversationDetail 
                token={token}
                userId={userId}
                messages={conversation.messages}
                conversation={conversation.conversation}
            />
        </main>
    )
}

export default ConversationPage;