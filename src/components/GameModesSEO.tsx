import React from "react";
import {
  BookOpen,
  Brain,
  History,
  Sparkles,
  Target,
  Vibrate as Strategy,
} from "lucide-react";

export function GameModesSEO() {
  return (
    <div className="prose prose-lg max-w-none">
      {/* Game Modes Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Modes de jeu</h2>

        {/* Klondike */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-emerald-600" />
            Klondike
          </h3>
          <div className="space-y-4 text-gray-600">
            <p>
              Le Klondike est la variante la plus populaire du Solitaire. Le jeu
              utilise un jeu standard de 52 cartes, disposées en 7 colonnes (le
              tableau) avec un nombre croissant de cartes par colonne, la carte
              supérieure étant face visible.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-medium text-gray-900 mb-2">
                  Mode Tirage 1 carte
                </h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Plus facile à maîtriser</li>
                  <li>Meilleur contrôle du jeu</li>
                  <li>Idéal pour les débutants</li>
                  <li>Taux de réussite plus élevé</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-medium text-gray-900 mb-2">
                  Mode Tirage 3 cartes
                </h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Plus stratégique et challengeant</li>
                  <li>Scoring plus élevé</li>
                  <li>Pour joueurs expérimentés</li>
                  <li>Partie plus longue et complexe</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Spider */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-emerald-600" />
            Spider
          </h3>
          <div className="space-y-4 text-gray-600">
            <p>
              Spider Solitaire est une variante plus complexe utilisant
              plusieurs jeux de cartes. Le but est de créer des séquences
              complètes du Roi à l&apos;As dans la même couleur. Le jeu propose
              trois niveaux de difficulté basés sur le nombre de couleurs
              utilisées.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-medium text-gray-900 mb-2">1 Couleur</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Utilise uniquement les piques</li>
                  <li>Plus facile à comprendre</li>
                  <li>Idéal pour l&apos;apprentissage</li>
                  <li>8 jeux de piques</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-medium text-gray-900 mb-2">2 Couleurs</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Piques et cœurs</li>
                  <li>Difficulté intermédiaire</li>
                  <li>4 jeux de chaque couleur</li>
                  <li>Plus stratégique</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-medium text-gray-900 mb-2">4 Couleurs</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Toutes les couleurs</li>
                  <li>Niveau expert</li>
                  <li>2 jeux de chaque couleur</li>
                  <li>Maximum de complexité</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          À propos du Solitaire
        </h2>

        {/* History */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <History className="w-6 h-6 text-emerald-600" />
            Histoire et Origines
          </h3>
          <div className="space-y-4 text-gray-600">
            <p>
              Le Solitaire, également connu sous le nom de &quot;Patience&quot;
              en Europe, trouve ses origines au XVIIIe siècle. Initialement joué
              avec des cartes physiques, il est devenu mondialement célèbre
              grâce à son inclusion dans Windows 3.0 en 1990, devenant ainsi
              l&apos;un des jeux électroniques les plus joués de
              l&apos;histoire.
            </p>
            <p>
              La version Klondike, la plus populaire, tire son nom de la région
              de Klondike au Canada, où elle était très appréciée des chercheurs
              d&apos;or pendant la ruée vers l&apos;or du Yukon à la fin du XIXe
              siècle.
            </p>
          </div>
        </div>

        {/* Rules and Strategy */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Strategy className="w-6 h-6 text-emerald-600" />
            Stratégies Gagnantes
          </h3>
          <div className="space-y-4 text-gray-600">
            <p>
              Pour maximiser vos chances de victoire au Solitaire, plusieurs
              stratégies clés sont essentielles :
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Libérer les cartes face cachée le plus tôt possible</li>
              <li>Maintenir un équilibre entre les piles de fondation</li>
              <li>Créer des espaces vides stratégiquement</li>
              <li>Garder les Rois en réserve pour les colonnes vides</li>
              <li>Planifier plusieurs coups à l&apos;avance</li>
            </ul>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Brain className="w-6 h-6 text-emerald-600" />
            Bénéfices Cognitifs
          </h3>
          <div className="space-y-4 text-gray-600">
            <p>
              Le Solitaire n&apos;est pas qu&apos;un simple passe-temps, il
              offre de nombreux avantages cognitifs :
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Amélioration de la concentration et de la mémoire</li>
              <li>Développement des capacités de planification</li>
              <li>Renforcement de la pensée logique</li>
              <li>Réduction du stress et relaxation mentale</li>
              <li>Stimulation de la patience et de la persévérance</li>
            </ul>
          </div>
        </div>

        {/* Glossary */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-600" />
            Glossaire du Solitaire
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
            <div>
              <dl className="space-y-4">
                <div>
                  <dt className="font-medium text-gray-900">Tableau</dt>
                  <dd>
                    Zone principale de jeu composée de sept colonnes de cartes
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Fondation</dt>
                  <dd>
                    Piles finales où les cartes sont rangées par couleur de
                    l&apos;As au Roi
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Talon</dt>
                  <dd>Pile de cartes restantes disponibles pour le tirage</dd>
                </div>
              </dl>
            </div>
            <div>
              <dl className="space-y-4">
                <div>
                  <dt className="font-medium text-gray-900">Séquence</dt>
                  <dd>
                    Suite de cartes alternant les couleurs en ordre décroissant
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Cascade</dt>
                  <dd>Groupe de cartes pouvant être déplacé ensemble</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Auto-complétion</dt>
                  <dd>
                    Fonction permettant de terminer automatiquement une partie
                    gagnée
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
