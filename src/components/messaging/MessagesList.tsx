import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, MessageCircle, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Conversation {
  id: string;
  user_id: string;
  professional_id: string;
  last_message_at: string;
  recipient_name: string;
  recipient_type: 'user' | 'professional';
  last_message?: string;
  unread_count?: number;
}

interface MessagesListProps {
  onSelectConversation: (conversationId: string, recipientName: string, recipientType: 'user' | 'professional') => void;
}

export const MessagesList: React.FC<MessagesListProps> = ({
  onSelectConversation,
}) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadConversations();
    
    // Subscribe to conversation updates
    const channel = supabase
      .channel('conversations-list')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversations',
        },
        () => {
          loadConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadConversations = async () => {
    try {
      const { data: currentUser } = await supabase.auth.getUser();
      if (!currentUser.user) return;

      // Get conversations where current user is participant
      const { data: conversationsData, error: conversationsError } = await supabase
        .from('conversations')
        .select(`
          id,
          user_id,
          professional_id,
          last_message_at
        `)
        .or(`user_id.eq.${currentUser.user.id},professional_id.eq.${currentUser.user.id}`)
        .order('last_message_at', { ascending: false });

      if (conversationsError) throw conversationsError;

      // Get profile data for recipients
      const recipientIds = conversationsData.map(conv => 
        conv.user_id === currentUser.user.id ? conv.professional_id : conv.user_id
      );

      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('user_id, full_name, user_type')
        .in('user_id', recipientIds);

      if (profilesError) throw profilesError;

      // Combine data
      const conversationsWithRecipients = conversationsData.map(conv => {
        const recipientId = conv.user_id === currentUser.user.id ? conv.professional_id : conv.user_id;
        const recipientProfile = profiles.find(p => p.user_id === recipientId);
        
        return {
          ...conv,
          recipient_name: recipientProfile?.full_name || 'Unknown User',
          recipient_type: (recipientProfile?.user_type || 'user') as 'user' | 'professional',
        };
      });

      setConversations(conversationsWithRecipients);
    } catch (error) {
      console.error('Error loading conversations:', error);
      toast({
        title: "Error",
        description: "Failed to load conversations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.recipient_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-4">
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-muted rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No conversations yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Start chatting with professionals or customers
            </p>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Start New Chat
            </Button>
          </div>
        ) : (
          <div className="p-2">
            {filteredConversations.map((conversation) => (
              <Card
                key={conversation.id}
                className="mb-2 cursor-pointer hover:shadow-medium transition-shadow"
                onClick={() => onSelectConversation(
                  conversation.id,
                  conversation.recipient_name,
                  conversation.recipient_type
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {conversation.recipient_name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-foreground truncate">
                          {conversation.recipient_name}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {new Date(conversation.last_message_at).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant={conversation.recipient_type} 
                          className="text-xs"
                        >
                          {conversation.recipient_type === 'professional' ? 'Professional' : 'Customer'}
                        </Badge>
                        
                        {conversation.unread_count && conversation.unread_count > 0 && (
                          <Badge variant="destructive" className="h-5 w-5 p-0 text-xs flex items-center justify-center">
                            {conversation.unread_count}
                          </Badge>
                        )}
                      </div>
                      
                      {conversation.last_message && (
                        <p className="text-sm text-muted-foreground truncate mt-1">
                          {conversation.last_message}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesList;