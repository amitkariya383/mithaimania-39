import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, ArrowLeft, Home, MessageSquare } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const { playClickSound } = useSound();

  const handleNavigation = (path: string) => {
    playClickSound();
    navigate(path);
  };

  const handleEmailClick = () => {
    playClickSound();
    window.location.href = 'mailto:mithaimania15@gmail.com';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 dark:from-orange-950 dark:via-yellow-950 dark:to-red-950 relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-orange-200 to-yellow-200 dark:from-orange-800 dark:to-yellow-800 rounded-full blur-xl"></div>
        <div className="absolute top-3/4 right-1/4 w-40 h-40 bg-gradient-to-br from-red-200 to-pink-200 dark:from-red-800 dark:to-pink-800 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-yellow-200 to-orange-200 dark:from-yellow-800 dark:to-orange-800 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-2xl mx-auto border-0 shadow-2xl backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <MessageSquare className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-red-600 bg-clip-text text-transparent">
              Contact Us
            </CardTitle>
            <p className="text-lg text-muted-foreground mt-2">
              We'd love to hear from you! Get in touch with the Mithai Mania team.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Email Section */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center">
                <Mail className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-2xl font-semibold">Email Us</h3>
              </div>
              
              <div className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900 dark:to-yellow-900 p-6 rounded-xl border border-orange-200 dark:border-orange-700">
                <p className="text-muted-foreground mb-4">
                  Have questions about the game, feedback, or suggestions? Drop us an email!
                </p>
                <Button 
                  onClick={handleEmailClick}
                  className="text-lg px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0"
                  size="lg"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  mithaimania15@gmail.com
                </Button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900 p-6 rounded-xl border border-yellow-200 dark:border-yellow-700">
              <h4 className="text-xl font-semibold mb-4 text-center">What can we help you with?</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <ul className="space-y-2">
                    <li>• Game feedback and suggestions</li>
                    <li>• Technical support</li>
                    <li>• Partnership opportunities</li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2">
                    <li>• Bug reports</li>
                    <li>• Feature requests</li>
                    <li>• General inquiries</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center pt-6">
              <Button
                onClick={() => handleNavigation('/')}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;