import { useState } from 'react';
import { FiSearch, FiMessageSquare, FiSend, FiPaperclip, FiMoreVertical } from 'react-icons/fi';

type Message = {
  id: number;
  sender: 'user' | 'other';
  content: string;
  timestamp: string;
};

type Conversation = {
  id: number;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: boolean;
  avatar: string;
};

const MessagingPage = () => {
  const [activeConversation, setActiveConversation] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');
  
  const conversations: Conversation[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      lastMessage: 'I\'ve sent the updated design files. Let me know if you need any changes.',
      lastMessageTime: '10:30 AM',
      unread: false,
      avatar: 'SJ'
    },
    {
      id: 2,
      name: 'Michael Chen',
      lastMessage: 'The project is due next Friday. Can we schedule a call to discuss?',
      lastMessageTime: 'Yesterday',
      unread: true,
      avatar: 'MC'
    },
    {
      id: 3,
      name: 'Alex Rodriguez',
      lastMessage: 'Thanks for the quick turnaround on this!',
      lastMessageTime: 'Monday',
      unread: false,
      avatar: 'AR'
    }
  ];

  const messages: Record<number, Message[]> = {
    1: [
      {
        id: 1,
        sender: 'other',
        content: 'Hi there! I wanted to follow up on the design project we discussed.',
        timestamp: '10:00 AM'
      },
      {
        id: 2,
        sender: 'user',
        content: 'Hello! Yes, I\'ve been working on the initial mockups. I should have something to share by tomorrow.',
        timestamp: '10:05 AM'
      },
      {
        id: 3,
        sender: 'other',
        content: 'That sounds great! Looking forward to seeing your ideas.',
        timestamp: '10:10 AM'
      },
      {
        id: 4,
        sender: 'other',
        content: 'I\'ve sent the updated design files. Let me know if you need any changes.',
        timestamp: '10:30 AM'
      }
    ],
    2: [
      {
        id: 1,
        sender: 'other',
        content: 'The project is due next Friday. Can we schedule a call to discuss?',
        timestamp: 'Yesterday'
      }
    ],
    3: [
      {
        id: 1,
        sender: 'user',
        content: 'Just submitted the final deliverables for the website project.',
        timestamp: 'Monday'
      },
      {
        id: 2,
        sender: 'other',
        content: 'Thanks for the quick turnaround on this!',
        timestamp: 'Monday'
      }
    ]
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && activeConversation) {
      console.log('Message sent:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-indigo-600">WorkFinder</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-indigo-600">Jobs</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600">Freelancers</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600">Messages</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600">Profile</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row h-[600px]">
            {/* Conversation List */}
            <div className="w-full md:w-1/3 border-r border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Messages</h2>
                <div className="relative mt-3">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Search messages"
                  />
                </div>
              </div>

              <div className="overflow-y-auto h-[500px]">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${activeConversation === conversation.id ? 'bg-indigo-50' : ''}`}
                    onClick={() => setActiveConversation(conversation.id)}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                        {conversation.avatar}
                      </div>
                      <div className="ml-3 flex-1 min-w-0">
                        <div className="flex justify-between">
                          <p className={`text-sm font-medium ${conversation.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                            {conversation.name}
                          </p>
                          <p className="text-xs text-gray-500">{conversation.lastMessageTime}</p>
                        </div>
                        <p className={`text-sm truncate ${conversation.unread ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                          {conversation.lastMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Area */}
            <div className="w-full md:w-2/3 flex flex-col">
              {activeConversation ? (
                <>
                  {/* Message Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                        {conversations.find(c => c.id === activeConversation)?.avatar}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {conversations.find(c => c.id === activeConversation)?.name}
                        </p>
                        <p className="text-xs text-gray-500">Online</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-500">
                      <FiMoreVertical />
                    </button>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                    <div className="space-y-4">
                      {messages[activeConversation]?.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${message.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800 border border-gray-200'}`}
                          >
                            <p>{message.content}</p>
                            <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'}`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center">
                      <button className="p-2 text-gray-400 hover:text-gray-500">
                        <FiPaperclip />
                      </button>
                      <input
                        type="text"
                        className="flex-1 mx-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Type a message"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <button
                        className="p-2 text-indigo-600 hover:text-indigo-800"
                        onClick={handleSendMessage}
                      >
                        <FiSend />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <FiMessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No conversation selected</h3>
                    <p className="mt-1 text-sm text-gray-500">Select a conversation or start a new one</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MessagingPage;