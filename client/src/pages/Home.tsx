import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, MessageCircle, Users, Utensils, Zap } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function Home() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [, navigate] = useLocation();

  // Redirect to feed if already authenticated
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate("/feed");
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header Navigation */}
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
            <a href="#features" className="text-foreground/70 hover:text-foreground transition-colors">功能</a>
            <a href="#about" className="text-foreground/70 hover:text-foreground transition-colors">关于</a>
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-foreground/70">{user?.name}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    logout();
                  }}
                >
                  退出
                </Button>
              </>
            ) : (
              <Button 
                size="sm"
                onClick={() => {
                  window.location.href = getLoginUrl();
                }}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                登录
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663506480782/XzEWDxgSS5RTJYj5etncA4/chileoma-banner-M83GBf74gLN5tQbLeEViGZ.webp"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              发现美食，分享快乐
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-8">
              "吃了吗"是一个温暖的美食社区，让你发现身边最好吃的餐厅，分享美食体验，获得AI智能推荐。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => {
                  window.location.href = getLoginUrl();
                }}
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-base"
              >
                开始探索
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => {
                  document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-base"
              >
                了解更多
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
            核心功能
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: Share Posts */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Utensils className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">分享美食</h3>
              <p className="text-foreground/70">
                发布图文内容，分享你的美食发现和餐厅体验，与社区互动。
              </p>
            </div>

            {/* Feature 2: AI Recommendations */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">AI智能推荐</h3>
              <p className="text-foreground/70">
                与AI对话，根据你的口味、预算和场景需求，获得最适合的餐厅推荐。
              </p>
            </div>

            {/* Feature 3: Map & Location */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">地图定位</h3>
              <p className="text-foreground/70">
                自动定位你的位置，在地图上查看推荐餐厅，获取导航和距离信息。
              </p>
            </div>

            {/* Feature 4: Rankings */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">地区排行榜</h3>
              <p className="text-foreground/70">
                发现你所在地区最受欢迎的餐厅，按评分和热度排序。
              </p>
            </div>

            {/* Feature 5: Community */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">社区互动</h3>
              <p className="text-foreground/70">
                点赞、评论、收藏，与其他美食爱好者分享和讨论。
              </p>
            </div>

            {/* Feature 6: Personal Center */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">个人中心</h3>
              <p className="text-foreground/70">
                管理账号信息，绑定邮箱和手机号，查看收藏和发布历史。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            准备好了吗？
          </h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
            加入"吃了吗"社区，开始你的美食探险之旅。无论是寻找新餐厅还是分享美食故事，这里都是你的家。
          </p>
          <Button 
            size="lg"
            onClick={() => {
              window.location.href = getLoginUrl();
            }}
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-base"
          >
            立即开始
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-white/50 py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-foreground mb-4">关于我们</h4>
              <p className="text-sm text-foreground/70">
                "吃了吗"是一个为美食爱好者打造的社交平台。
              </p>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">功能</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><a href="#" className="hover:text-foreground">美食分享</a></li>
                <li><a href="#" className="hover:text-foreground">餐厅推荐</a></li>
                <li><a href="#" className="hover:text-foreground">AI助手</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">社区</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><a href="#" className="hover:text-foreground">排行榜</a></li>
                <li><a href="#" className="hover:text-foreground">用户故事</a></li>
                <li><a href="#" className="hover:text-foreground">反馈</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">联系</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><a href="#" className="hover:text-foreground">帮助中心</a></li>
                <li><a href="#" className="hover:text-foreground">隐私政策</a></li>
                <li><a href="#" className="hover:text-foreground">服务条款</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 text-center text-sm text-foreground/70">
            <p>&copy; 2026 吃了吗. 所有权利保留。</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
