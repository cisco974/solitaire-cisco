import React from "react";
import { StandardPage } from "../components/StandardPage";

export function AboutUs() {
  return (
    <StandardPage title="About Us">
      <p className="lead text-xl text-gray-600 mb-8">
        Welcome to{" "}
        <span className="text-emerald-600 font-medium">SLTR.com</span>, your
        ultimate destination for enjoying the timeless card game of Solitaire
        and its many variations. Play your favorite game online for free, with
        no downloads required!
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
        Our Mission
      </h2>
      <p>
        Our mission is to provide a convenient and enjoyable platform for card
        game enthusiasts around the world. We understand the lasting appeal of
        Solitaire and are committed to delivering an exceptional online
        experience for those who love this classic game.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
        Quality First
      </h2>
      <p>
        At SLTR.com, we prioritize creating a high-quality product that shines
        through every aspect of our platform—from the seamless gameplay
        mechanics to the captivating visual design. We&apos;ve worked hard to
        make our site not just a place to play, but an inviting, visually
        stunning, and intuitively designed environment.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
        Global Accessibility
      </h2>
      <p>
        Recognizing Solitaire&apos;s global popularity, we wanted to make the
        game accessible to everyone. That&apos;s why SLTR.com supports multiple
        languages, enabling players from around the world to enjoy their
        favorite game. Alongside the classic version, you&apos;ll find popular
        variations like Spider Solitaire and FreeCell.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
        Cross-Platform Experience
      </h2>
      <p>
        One of the standout features of SLTR.com is its adaptability across
        devices. Whether you&apos;re playing on a desktop computer, tablet, or
        smartphone, you&apos;ll enjoy the same smooth, responsive experience.
        Our adaptive design ensures that the game looks and plays beautifully on
        any screen size.
      </p>

      <div className="bg-emerald-50 rounded-xl p-8 mt-12">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">
          Join Our Community
        </h2>
        <p className="text-emerald-800">
          We&apos;re more than just a gaming platform—we&apos;re a community of
          Solitaire enthusiasts. Whether you&apos;re a casual player or a
          dedicated fan, we invite you to join us in celebrating this timeless
          card game. Share your achievements, compete on the leaderboards, and
          connect with fellow players from around the world.
        </p>
      </div>
    </StandardPage>
  );
}
