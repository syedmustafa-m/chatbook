import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import './App.css';
import 'stream-chat-react/dist/css/index.css';

// Importing Components
import {
    ChannelContainer,
    ChannelListContainer,
    Auth
} from './components';

const api_key = 'nfvwz58bnwg8';

const client = StreamChat.getInstance(api_key);

const cookies = new Cookies();

const authToken = cookies.get('token');

if (authToken) {
    client.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber')
    }, authToken)
}



const App = () => {

    const [createType, setCreateType] = useState();
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    if (!authToken) return <Auth />

    return (
        <div className='app__wrapper'>
            <Chat client={client} theme="team light">
                <ChannelListContainer
                    isCreating={isCreating}
                    setCreateType={setCreateType}
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}
                />
                <ChannelContainer
                    isCreating={isCreating}
                    isEditing={isEditing}
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}
                    createType={createType}
                />
            </Chat>
        </div>
    )
}

export default App
