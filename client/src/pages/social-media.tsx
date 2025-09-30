import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import URLAnalyzer from "@/components/dashboard/url-analyzer";
import FilterBar from "@/components/dashboard/filter-bar";
import MetricCard from "@/components/dashboard/metric-card";
import RankingTrendsChart from "@/components/dashboard/ranking-trends-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Share2, Heart, MessageCircle, Repeat2 } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function SocialMedia() {
  const [selectedPeriod, setSelectedPeriod] = useState("7");
  const [selectedCategory, setSelectedCategory] = useState("social");
  const [socialData, setSocialData] = useState<any>(null);

  const { data: analyses, isLoading } = useQuery({
    queryKey: ['/api/analyses'],
  });

  const { data: instagramData, isLoading: isLoadingInstagram } = useQuery({
    queryKey: ['instagram'],
    queryFn: async () => {
      const response = await axios.get("https://instagram-data1.p.rapidapi.com/user/info", {
        headers: {
          'x-rapidapi-key': process.env.INSTAGRAM_API,
          'x-rapidapi-host': 'instagram-data1.p.rapidapi.com'
        },
        params: { username: 'instagram' }
      });
      return response.data;
    }
  });

  useEffect(() => {
    if (instagramData) {
      setSocialData(instagramData);
    }
  }, [instagramData]);

  const latestAnalysis = Array.isArray(analyses) ? analyses[0] : undefined;

  const socialMetrics = socialData ? [
    {
      title: "Social Score",
      value: latestAnalysis?.socialScore || 0,
      change: 0,
      trend: "stable" as const,
      icon: "fas fa-share-alt",
      color: "primary",
      description: "Overall social media performance"
    },
    {
      title: "Total Followers",
      value: socialData.followers,
      change: 8,
      trend: "up" as const,
      icon: "fas fa-users",
      color: "chart-1",
      description: "Combined followers across platforms"
    },
    {
      title: "Engagement Rate",
      value: 4.2,
      change: 12,
      trend: "up" as const,
      icon: "fas fa-heart",
      color: "chart-2",
      description: "Average engagement rate percentage"
    },
    {
      title: "Reach",
      value: 85600,
      change: -5,
      trend: "down" as const,
      icon: "fas fa-eye",
      color: "chart-3",
      description: "Monthly social media reach"
    }
  ] : [];

  const platformData = socialData ? [
    { platform: "Instagram", followers: socialData.followers, engagement: "4.1%", posts: socialData.posts, growth: -2 },
    { platform: "Facebook", followers: "5.2K", engagement: "3.8%", posts: 12, growth: 5 },
    { platform: "Twitter", followers: "3.1K", engagement: "5.2%", posts: 18, growth: 12 },
    { platform: "LinkedIn", followers: "1.3K", engagement: "3.5%", posts: 8, growth: 8 }
  ] : [];

  const recentPosts = socialData ? socialData.latest_posts.map((post: any) => ({
    platform: "Instagram",
    content: post.caption,
    likes: post.likes,
    shares: 0,
    comments: post.comments,
    time: "2 hours ago"
  })) : [];

  if (isLoading || isLoadingInstagram) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading social media data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <URLAnalyzer />
        <FilterBar 
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        
        <main className="flex-1 overflow-auto p-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Page Header */}
            <motion.div variants={itemVariants} className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Share2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Social Media</h1>
                <p className="text-muted-foreground">Monitor your social media performance and engagement</p>
              </div>
            </motion.div>

            {/* Social Metrics Grid */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {socialMetrics.map((card, index) => (
                <MetricCard key={index} {...card} />
              ))}
            </motion.div>

            {/* Charts and Platform Analysis */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <RankingTrendsChart period={selectedPeriod} />
              
              <Card data-testid="card-platform-analysis">
                <CardHeader>
                  <CardTitle>Platform Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {platformData.map((platform, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-b-0" data-testid={`row-platform-${index}`}>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <i className={`fab fa-${platform.platform.toLowerCase()} text-sm`}></i>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{platform.platform}</p>
                            <p className="text-sm text-muted-foreground">{platform.followers} followers</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">{platform.engagement}</p>
                          <p className={`text-xs ${platform.growth > 0 ? 'text-green-600' : platform.growth < 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                            {platform.growth > 0 ? '+' : ''}{platform.growth}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Posts Performance */}
            <motion.div variants={itemVariants}>
              <Card data-testid="card-recent-posts">
                <CardHeader>
                  <CardTitle>Recent Posts Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPosts.map((post, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg" data-testid={`post-${index}`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">{post.platform}</Badge>
                            <span className="text-sm text-muted-foreground">{post.time}</span>
                          </div>
                        </div>
                        <p className="text-foreground mb-4">{post.content}</p>
                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Repeat2 className="h-4 w-4" />
                            <span>{post.shares}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}