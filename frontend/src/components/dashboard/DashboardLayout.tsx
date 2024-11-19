import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  UserCircle,
  Settings,
  LogOut,
  Brain,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProfileForm } from './ProfileForm';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

interface DashboardLayoutProps {
  onLogout: () => void;
}

export function DashboardLayout({ onLogout }: DashboardLayoutProps) {
  const [activeTab, setActiveTab] = useState('profile');

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile', icon: UserCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex gap-2 items-center">
            <Brain className="h-6 w-6" />
            <span className="font-bold text-xl">Gemoedje.nl</span>
          </div>
        </div>
      </header>
      
      <div className="flex">
        <aside className="w-64 border-r bg-muted/40 min-h-[calc(100vh-4rem)] sticky top-16">
          <div className="flex flex-col h-full p-4">
            <div className="space-y-4">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      activeTab === item.id && "bg-secondary"
                    )}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
            <div className="mt-auto">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-50"
                onClick={onLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </aside>
        <main className="flex-1 p-6 bg-background">
          {activeTab === 'profile' && <ProfileForm />}
          {activeTab === 'overview' && (
            <div className="grid gap-4">
              <h2 className="text-2xl font-bold">Welcome back, Dr. Sarah!</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Profile Views</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">127</p>
                    <p className="text-sm text-muted-foreground">This week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">New Messages</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">5</p>
                    <p className="text-sm text-muted-foreground">Unread</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Total Clients</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">24</p>
                    <p className="text-sm text-muted-foreground">Active</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}