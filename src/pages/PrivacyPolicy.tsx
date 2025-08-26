import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useSound } from "@/hooks/useSound";

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();
  const { playClickSound } = useSound();

  return (
    <div className="min-h-screen p-4 pattern-mandala">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 bg-gradient-warm shadow-festive">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gradient-festival mb-4">
              🔒 Privacy Policy 🔒
            </h1>
            <p className="text-xl text-muted-foreground">
              Your Privacy Matters to Us
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-8 text-sm leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Game Progress Data</h3>
                  <p className="text-muted-foreground">
                    We store your game progress, including completed levels, scores, and difficulty preferences 
                    locally on your device using browser storage. This data helps us provide you with a 
                    seamless gaming experience across sessions.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Usage Analytics</h3>
                  <p className="text-muted-foreground">
                    We may collect anonymous usage statistics such as levels completed, time spent playing, 
                    and general gameplay patterns to improve our game design and user experience.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Game Experience:</strong> To save and restore your game progress</li>
                <li>• <strong>Improvement:</strong> To analyze gameplay patterns and improve game features</li>
                <li>• <strong>Technical Support:</strong> To help troubleshoot any technical issues you may encounter</li>
                <li>• <strong>Updates:</strong> To inform you about new levels, features, and game updates</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Data Storage and Security</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Local Storage</h3>
                  <p className="text-muted-foreground">
                    Your game progress is stored locally on your device using browser localStorage. 
                    This means your data stays on your device and is not transmitted to our servers 
                    unless explicitly needed for game functionality.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Security Measures</h3>
                  <p className="text-muted-foreground">
                    We implement appropriate technical and organizational measures to protect your 
                    information against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services</h2>
              <p className="text-muted-foreground mb-4">
                Mithai Mania may use third-party services for:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Analytics:</strong> To understand how players interact with our game</li>
                <li>• <strong>Performance Monitoring:</strong> To ensure smooth gameplay experience</li>
                <li>• <strong>Advertising:</strong> To display relevant ads that support free gameplay</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                These services may collect information as governed by their own privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Children's Privacy</h2>
              <p className="text-muted-foreground">
                Mithai Mania is designed to be enjoyed by players of all ages, including children. 
                We do not knowingly collect personal information from children under 13 years of age. 
                If you are a parent or guardian and believe your child has provided us with personal 
                information, please contact us so we can take appropriate action.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Your Rights and Choices</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Data Control</h3>
                  <p className="text-muted-foreground">
                    You can clear your game progress and stored data at any time by clearing your 
                    browser's local storage or using the game's reset feature.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Opt-Out</h3>
                  <p className="text-muted-foreground">
                    You may opt out of analytics collection through your browser settings or by 
                    contacting us directly.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Cookies and Local Storage</h2>
              <p className="text-muted-foreground">
                We use browser local storage and may use cookies to enhance your gaming experience. 
                These technologies help us remember your preferences, save your progress, and provide 
                a personalized experience. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time to reflect changes in our practices 
                or for other operational, legal, or regulatory reasons. We will notify users of any 
                material changes by updating the "Last updated" date at the top of this policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy or our privacy practices, 
                please contact us through the game's feedback system or support channels. 
                We are committed to addressing your privacy concerns promptly and transparently.
              </p>
            </section>

            <section className="border-t pt-6">
              <h2 className="text-2xl font-semibold mb-4">🌟 Our Commitment</h2>
              <p className="text-muted-foreground text-lg">
                At Mithai Mania, we believe that gaming should be fun, safe, and respectful of your privacy. 
                We are committed to protecting your personal information and providing you with a sweet, 
                secure gaming experience that celebrates the joy of Indian culture and traditions.
              </p>
            </section>
          </div>

          <div className="text-center mt-8">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => {
                playClickSound();
                navigate('/');
              }}
            >
              🎮 Continue Playing
            </Button>
          </div>

          <div className="text-center mt-6">
            <Button 
              variant="ghost"
              onClick={() => {
                playClickSound();
                navigate('/');
              }}
            >
              ← Back to Home
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;