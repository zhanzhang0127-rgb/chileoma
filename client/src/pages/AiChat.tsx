import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Loader2, Bot, User } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useState, useRef } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AiChat() {
  const { isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "你好！👋 我是吃了吗AI助手。我可以根据你的口味偏好、预算、用餐场景等信息，为你推荐最适合的餐厅。\n\n请告诉我：\n• 你想吃什么菜系？\n• 你的预算范围是多少？\n• 用餐场景是什么？（约会、家庭聚餐、商务宴请等）\n• 你所在的城市或地区？",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, loading, navigate]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response (in production, this would call your LLM API)
    setTimeout(() => {
      const responses = [
        "根据你的描述，我为你推荐以下几家餐厅：\n\n1. **美食天堂餐厅** - 中式菜系，人均100-150元\n   地址：北京市朝阳区\n   评分：4.8/5 (256评价)\n   特色：家常菜、地方特色菜\n\n2. **味蕾之旅** - 创意融合菜，人均200-300元\n   地址：北京市东城区\n   评分：4.7/5 (189评价)\n   特色：创意菜、精致摆盘\n\n3. **家的味道** - 粤菜，人均150-200元\n   地址：北京市西城区\n   评分：4.9/5 (312评价)\n   特色：正宗粤菜、点心",
        "我了解了你的需求。根据你的预算和场景，我建议选择**味蕾之旅**。这家餐厅适合约会，环境优雅，菜品精致，虽然价格稍高，但性价比很好。\n\n你想了解更多关于这家餐厅的信息吗？或者你想要其他推荐？",
        "太好了！我已经为你整理了推荐列表。你可以：\n\n1. 点击\"查看详情\"了解更多信息\n2. 添加到收藏以便后续查看\n3. 在地图上查看位置和导航\n4. 查看其他用户的评价和分享\n\n有其他问题吗？我随时准备帮助你！",
      ];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663506480782/XzEWDxgSS5RTJYj5etncA4/chileoma-logo-J5D7zC5YTWiDqDhd7fMXt5.webp" 
              alt="吃了吗 Logo" 
              className="h-10 w-10"
            />
            <span className="text-xl font-bold text-primary">吃了吗</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="/feed" className="text-foreground/70 hover:text-foreground transition-colors">首页</a>
            <a href="/restaurants" className="text-foreground/70 hover:text-foreground transition-colors">餐厅</a>
            <a href="/rankings" className="text-foreground/70 hover:text-foreground transition-colors">排行榜</a>
            <a href="/ai-chat" className="text-foreground font-medium">AI助手</a>
          </nav>

          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/profile")}
            >
              个人中心
            </Button>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <main className="flex-1 container py-8 flex flex-col">
        <div className="max-w-3xl mx-auto w-full flex flex-col h-full">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto mb-6 space-y-4 pr-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                )}

                <Card className={`max-w-lg p-4 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 text-foreground"
                }`}>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-2 ${
                    message.role === "user"
                      ? "text-primary-foreground/70"
                      : "text-foreground/60"
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </Card>

                {message.role === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-secondary" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <Card className="bg-muted/50 p-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </Card>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex gap-3">
            <Input
              placeholder="告诉我你想吃什么..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !isLoading) {
                  handleSendMessage();
                }
              }}
              disabled={isLoading}
              className="flex-1 bg-muted/50 border-border"
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
