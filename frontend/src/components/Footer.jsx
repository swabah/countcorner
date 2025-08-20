import { Link } from "react-router-dom";
import { Star, Heart, Calendar, Users } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-5xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Star className="h-8 w-8 text-accent" />
              <span className="text-xl font-bold">30-Day Salat Campaign</span>
            </Link>
            <p className="text-primary-foreground/80 leading-relaxed mb-4">
              Join our blessed community in sending Salawat upon Prophet
              Muhammad ﷺ. Together, we accumulate spiritual rewards and
              strengthen our connection with the beloved Prophet.
            </p>
            <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
              <Calendar className="h-4 w-4" />
              <span>Campaign Period: August 15 - September 15, 2024</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <Link to="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/join"
                  className="hover:text-accent transition-colors"
                >
                  Join Campaign
                </Link>
              </li>
              <li>
                <Link
                  to="/add-count"
                  className="hover:text-accent transition-colors"
                >
                  Add Count
                </Link>
              </li>
              <li>
                <Link
                  to="/leaderboard"
                  className="hover:text-accent transition-colors"
                >
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Islamic Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-accent" />
                <span className="text-sm">Virtues of Salawat</span>
              </li>
              <li className="flex items-center gap-2">
                <Users className="h-4 w-4 text-accent" />
                <span className="text-sm">Community Guidelines</span>
              </li>
            </ul>

            {/* Arabic Text */}
            <div className="mt-6 p-4 bg-primary-foreground/10 rounded-lg">
              <p className="text-center text-lg mb-2 text-accent">
                اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ
              </p>
              <p className="text-xs text-center text-primary-foreground/70">
                Allahumma salli 'ala Muhammad
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-primary-foreground/70">
              © 2024 30-Day Salat Campaign. Built with love for the Ummah.
            </div>
            <div className="text-sm text-primary-foreground/70 text-center md:text-right">
              May Allah accept our efforts and multiply our rewards.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
