"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { MessagingService } from '@/lib/services/messaging'
import { MessageThread, Message } from '@/lib/contracts'
import { MessageSquare, Send, Mic, Paperclip, Search } from 'lucide-react'

export default function MessagesPage() {
  const [threads, setThreads] = useState<MessageThread[]>([])
  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadThreads()
  }, [])

  const loadThreads = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const threadsData = await MessagingService.getThreads('current_user')
      setThreads(threadsData)
      
      if (threadsData.length > 0) {
        setSelectedThread(threadsData[0])
        loadMessages(threadsData[0].id)
      }
    } catch (err) {
      setError('Failed to load messages')
      console.error('Error loading messages:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadMessages = async (threadId: string) => {
    try {
      const messagesData = await MessagingService.getMessages(threadId)
      setMessages(messagesData)
    } catch (err) {
      console.error('Error loading messages:', err)
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedThread) return
    
    try {
      await MessagingService.sendMessage(selectedThread.id, 'current_user', newMessage)
      setNewMessage('')
      loadMessages(selectedThread.id) // Refresh messages
    } catch (err) {
      console.error('Failed to send message:', err)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSendMessage()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <span className="ml-2">Loading messages...</span>
      </div>
    )
  }

  if (error) {
    return <ErrorState onRetry={loadThreads} />
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Messages</h1>
          <p className="text-muted-foreground">
            Communicate with your network and build relationships
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Threads List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center gap-2 mb-4">
                <Search className="h-4 w-4" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-8"
                />
              </div>
              <CardTitle className="text-lg">Conversations</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {threads.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No conversations yet
                </div>
              ) : (
                <div className="space-y-1">
                  {threads.map((thread) => (
                    <div
                      key={thread.id}
                      className={`p-4 cursor-pointer hover:bg-muted/50 border-b ${
                        selectedThread?.id === thread.id ? 'bg-muted' : ''
                      }`}
                      onClick={() => {
                        setSelectedThread(thread)
                        loadMessages(thread.id)
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <MessageSquare className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">
                            Conversation with {thread.participants.length - 1} other{thread.participants.length > 2 ? 's' : ''}
                          </div>
                          {thread.lastMessage && (
                            <div className="text-sm text-muted-foreground truncate">
                              {thread.lastMessage.content}
                            </div>
                          )}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {thread.participants.length}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Messages */}
          <Card className="lg:col-span-2 flex flex-col">
            {selectedThread ? (
              <>
                <CardHeader className="border-b">
                  <CardTitle className="text-lg">
                    Conversation with {selectedThread.participants.length - 1} other{selectedThread.participants.length > 2 ? 's' : ''}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex-1 p-0 flex flex-col">
                  {/* Messages List */}
                  <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {messages.length === 0 ? (
                      <div className="text-center text-muted-foreground py-8">
                        No messages yet. Start the conversation!
                      </div>
                    ) : (
                      messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.senderId === 'current_user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] p-3 rounded-lg ${
                              message.senderId === 'current_user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            {message.type === 'file' && (
                              <div className="mt-2 flex items-center gap-2">
                                <Mic className="h-4 w-4" />
                                <span className="text-xs">Voice message</span>
                              </div>
                            )}
                            <p className="text-xs opacity-70 mt-1">
                              {new Date(message.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" disabled title="UI-only prototype">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" disabled title="UI-only prototype">
                        <Mic className="h-4 w-4" />
                      </Button>
                      <div className="flex-1">
                        <Textarea
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Type your message... (Ctrl+Enter to send)"
                          className="min-h-[40px] max-h-[120px] resize-none"
                          rows={1}
                        />
                      </div>
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        size="sm"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Press Ctrl+Enter to send
                    </p>
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <EmptyState
                  icon={MessageSquare}
                  title="No conversation selected"
                  description="Select a conversation from the list to start messaging"
                />
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
