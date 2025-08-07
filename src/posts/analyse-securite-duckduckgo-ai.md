---
title: "DuckDuckGo AI Chat – Pourquoi sa “protection” est aussi… limitée ?"
description: "Analyse technique des mécanismes de protection du chat IA de DuckDuckGo. Une analyse approfondie qui révèle les compromis entre respect de la vie privée et sécurité efficace."
date: "2025-08-07"
published: true
tags: ["sécurité", "reverse-engineering", "DuckDuckGo", "JavaScript", "obfuscation", "analyse technique"]
image: "/blog-images/duckduckgo-security.webp"
---

# Analyse de la sécurité du chat IA de DuckDuckGo : entre philosophie et protection

## Pourquoi je me suis penchée sur la sécurité du chat IA de DuckDuckGo

Quand j'ai découvert les protections mises en place autour du chat IA de [DuckDuckGo](https://duckduckgo.com/), je me suis vite demandé à quel point elles étaient solides. Depuis un an ou deux, c'est devenu mon hobby de comprendre le fonctionnement et les limites des moyens de protection de ce genre, alors j'ai décidé d'analyser leur code et leur système de vérification.

Ce que j'ai trouvé m'a beaucoup surpris — tant par leur simplicité que par le respect de leur philosophie. Voilà ce que ça donne.

## Ce que DuckDuckGo veut protéger avant tout

La mission affichée de [DuckDuckGo](https://duckduckgo.com/), c'est simple : [_ne pas savoir qui vous êtes_](https://duckduckgo.com/duckduckgo-help-pages/privacy/no-tracking).

Pas de cookies publicitaires, pas de [tracking inter-sites](https://silexo.fr/article/117/le-suivi-intersite-comment-ca-marche), pas de [fingerprinting matériel](https://fr.wikipedia.org/wiki/Empreinte_digitale_d%27appareil), pas d'empreinte réseau persistante, l'antithèse des [GAFAM](https://fr.wikipedia.org/wiki/GAFAM).

C'est presque une déclaration d'amour au respect de la vie privée… mais ça vient avec un prix.

En refusant de collecter la moindre donnée personnelle, DuckDuckGo **s'interdit** aussi toute une panoplie d'outils qui permettent normalement de reconnaître un utilisateur malveillant, même après plusieurs tentatives.

**Résultat :** leurs scripts de "protection" ne cherchent pas à savoir _qui_ vous êtes, mais seulement si **votre environnement de navigation ressemble à un navigateur "normal"** à cet instant précis.

Comme si un filtre anti-IA sur DuckDuckGo se contentait de vérifier si vous aviez coché la case "Image générée par IA" (coucou, Pinterest…) — et, sinon, laissait tout passer.

## Ce qui se cache derrière la "sécurité" du Duck AI Chat

### L'obfuscation

La sécurité mise en place par Duck pour son chat IA utilise une obfuscation JavaScript qui, certes, peut freiner les débutants, mais qui ne résiste pas face à des outils simples comme [webcrack](https://webcrack.netlify.app/docs/), et même [deobfuscate.io](https://deobfuscate.io/).

En bref, elle ne protège pas vraiment contre quelqu'un qui sait où aller. C'est d'autant plus décevant qu'ils n'ont même pas tenté une approche maison, comme le fait [Cloudflare](https://www.cloudflare.com/fr-fr/) avec ses [challenges JavaScript](https://blog.noah.ovh/cloudflare-js-challenge-1/), pour éviter de payer des alternatives robustes comme [JSDefender](https://www.preemptive.com/products/jsdefender/), tout en créant une barrière suffisante pour décourager certains utilisateurs.

### Des contrôles légers et faciles à contourner

Au-delà de l'obfuscation, DuckDuckGo implémente plusieurs contrôles simples directement dans le **navigateur de l'utilisateur** afin de détecter certains **comportements suspects** ou **automatisés**. Ces vérifications consistent souvent en des tests basiques qui analysent l'état du [DOM](https://developer.mozilla.org/fr/docs/Glossary/DOM) ou la présence d'objets spécifiques associés aux bots ou aux environnements automatisés et sont séparés en **3 scripts différents**.

Concrètement, chaque fonction de vérification est renvoyée **à chaque requête vers le chat ou lors du rechargement de la page**, encodée en base64 dans l'[en-tête](https://developer.mozilla.org/fr/docs/Web/HTTP/Reference/Headers) **x-vqd-hash-1**. Une fois décodée, elle est immédiatement exécutée sous forme de fonction auto-appelée ([IIFE](https://developer.mozilla.org/fr/docs/Glossary/IIFE)). Le résultat obtenu est ensuite renvoyé — lui aussi encodé en base64 — à chaque envoi d'un nouveau message dans le chat.

#### Résumé rapide + explication des similarités

Tous les scripts partagent la même structure : une variable **server_hashes**, quelques métadonnées, puis la création d'un tableau **client_hashes**, qui seront renvoyés à la fin.

Le premier élément de client_hashes est **toujours** le [userAgent](https://fr.wikipedia.org/wiki/User_agent) — généralement le nom et la version de votre navigateur, ainsi que quelques infos système.

Les deux éléments suivants sont des nombres :

- Le **premier** reflète si la vérification a bien été effectuée sur la page IA de DuckDuckGo.
- Le **second** indique si l'environnement détecté ressemble à celui d'un bot.

Les vérifications étant déterministes pour un même navigateur, les résultats logiques (vrai/faux) ne changent pas.

En revanche, chaque script applique des **offsets** (valeur de base) différents pour chaque nombre, ce qui modifie les nombres finaux renvoyés. Ainsi, un même environnement produira toujours le même résultat pour un script donné, mais des nombres différents entre variantes.

<small><a href="#pourquoi-duckduckgo-ne-peut-pas-vraiment-faire-mieux">Pssst, c'est par ici pour passer tout ces trucs de nerd là</a></small>

#### Premier script

Par exemple, le script peut mesurer la longueur de l'attribut `innerHTML` d'un élément, compter le nombre de balises présentes dans le DOM et les multiplier ensemble en jouant sur le fait que les navigateurs reconstruisent le DOM correctement quand il est mal écrit.

![Exemple script 1 DuckDuckGo](/blog-images/exemple-1-duckai.png)

Ou encore, il vérifie si certaines API comme `navigator.webdriver` sont activées — un indicateur classique qu'un [navigateur est piloté par un script](https://fr.wikipedia.org/wiki/Navigateur_headless) (via [Puppeteer](https://pptr.dev/), [Selenium](https://www.selenium.dev/), etc.). Ces tests s'exécutent en un clin d'œil, mais leur efficacité reste très limitée : un simple navigateur non-headless, ou un environnement correctement configuré, les contournera sans difficulté.

![Vérification webdriver](/blog-images/webdriver-check.png)

Le problème, c'est que ces scripts ne changent jamais. Il suffit donc de les exécuter une fois, d'observer la différence créée par l'offset, puis de la rappliquer à chaque fois.

#### Deuxième script

Le deuxième script change d'angle. Il s'intéresse moins au HTML et plus au comportement interne du moteur JavaScript.

Il vérifie, par exemple, que `parseInt.toString()` contient bien la mention `[native code]`, teste l'héritage de classes personnalisées depuis Array, ou encore contrôle que certains objets comme NodeList ou HTMLDivElement correspondent bien à leur type attendu.

Il ajoute et retire un élément du document.body pour mesurer les changements, puis refait les mêmes vérifications sur `navigator.webdriver` et les clés de `window.top`. Ici encore, tout repose sur un ensemble fixe de résultats : une fois connus, on peut juste additionner à chaque test dont on connaît la validité sans que le serveur s'en aperçoive.

![Exemple script 2 DuckDuckGo](/blog-images/exemple-2-duckai.png)

#### Troisième script

Le troisième script cible surtout l'environnement parent et un iframe précis (#jsa). Il y vérifie deux éléments : la balise meta **Content-Security-Policy** et l'attribut **sandbox**, qu'il compare à des valeurs figées. Il contrôle aussi la présence de deux propriétés spécifiques sur window.top, toujours présentes sur la page.

Chaque test valide ajoute +1 à un compteur fixé à un nombre de base, ce qui donne toujours le même résultat. Résultat : un contrôle surtout décoratif, sans réel impact sur la sécurité.

![Exemple script 3 DuckDuckGo](/blog-images/exemple-3-duckai.png)

#### Conclusion

Cette approche minimaliste reste cohérente avec la philosophie de DuckDuckGo, qui refuse les méthodes invasives de fingerprinting ou la collecte persistante de données.

**Résultat :** ces contrôles ne font pas plus que filtrer les cas évidents ou décourager les débutants. Face à des usages malveillants plus sophistiqués, ils n'offrent qu'une sécurité de façade… du moins au premier abord.

## Pourquoi DuckDuckGo ne peut pas (vraiment) faire mieux

En pratique, cette philosophie se traduit par des scripts qui ne cherchent jamais à vous "reconnaître" dans le temps, mais uniquement à tester l'état actuel de votre navigateur.

**Aucune donnée persistante, aucun identifiant unique** : si vous rechargez la page, c'est comme si vous étiez un tout nouvel utilisateur.

**Résultat :** les vérifications se résument à des tests très simples sur le DOM, sur quelques propriétés JavaScript et sur la présence d'**API propres aux navigateurs automatisés** — des signaux **faciles à falsifier**.

L'idée derrière ce système n'est probablement pas de proposer une **protection ultra sophistiquée**, mais plutôt de **rendre le calcul coûteux** pour quelqu'un qui voudrait inonder DuckDuckGo avec des **dizaines ou centaines de milliers de requêtes automatisées** (un peu comme [Hashcash](https://fr.wikipedia.org/wiki/Hashcash) à l'époque pour nos emails, ou pour [Bitcoin](http://www.hashcash.org/bitcoin/)). Forcer l'émulation complète d'un navigateur « normal » est alors un frein important pour ces attaques de masse.

Malheureusement, comme nous l'avons vu, les résultats produits par ces scripts sont en réalité **très prévisibles**. Les nombres renvoyés par les tests restent toujours les mêmes, à l'exception d'« offsets » que l'on peut facilement extraire avec des [expressions régulières (regex)](https://fr.wikipedia.org/wiki/Expression_r%C3%A9guli%C3%A8re).

```javascript
// Exemple de regex
const INNER_REGEX = /innerHTML\s*=\s*"([^"]*)"/;
const REDUCE_REGEX = /\b\d{3,4}\b/g; // :)
```

Cela signifie qu'après un peu d'analyse et une déobfuscation avec des outils comme deobfuscate.io, il devient possible d'ignorer complètement l'[émulation](https://learn.microsoft.com/fr-fr/microsoft-edge/devtools/device-mode/testing-other-browsers) complète d'un navigateur, puisqu'il suffit de reproduire ces valeurs statiques tout en récupérant les autres pour passer les contrôles.

## Et s'ils voulaient vraiment renforcer la protection ?

Si DuckDuckGo souhaitait vraiment durcir la sécurité de son chat IA, plusieurs pistes techniques plus avancées pourraient être mises en œuvre, tout en respectant leur engagement envers la vie privée :

### WebAssembly (WASM)

Utiliser un module WASM compilé pour les vérifications rendrait le code beaucoup plus difficile à lire ou décompiler que du JavaScript obfusqué.

La décompilation du WASM produit essentiellement un code bas niveau proche de l'assembleur, difficilement compréhensible, un peu comme une "blackbox" — à l'image de la [puce sécurisée d'un Trezor ou Ledger](https://www.ledger.com/fr/academy/security/the-secure-element-whistanding-security-attacks), où les détails internes restent opaques.

![WebAssembly sécurisé](/blog-images/wasm-security.png)

### Obfuscation maison (comme Cloudflare)

Bien que DuckDuckGo applique déjà une certaine variation des noms de variables et fonctions à chaque build, cette simple rotation reste insuffisante, d'autant plus qu'ils utilisent un obfuscateur connu comme obfuscator.io, **facilement réversible**.

Pour vraiment **renforcer la protection**, il faudrait que cette obfuscation soit plus complexe, moins standardisée et plus dynamique, avec des clés et formats de challenge qui changent fréquemment.

### Challenges temporaires

Générer des puzzles JavaScript ou WASM dont la **validité expire rapidement** (par exemple toutes les 30 secondes). Cela oblige à une **exécution rapide et en temps réel**, rendant les tentatives d'automatisation et la rétro-ingénierie plus complexes, mais nécessite d'avoir un Redis à côté.

Ces mesures **renforceraient la barrière** sans renier la **promesse de respect de la vie privée**, mais elles demanderaient aussi un **investissement technique plus important**.

## Conclusion – Le prix du respect de la vie privée

Franchement, on dirait que ces **protections** ont été bricolées par un gamin qui bossait sur un site comme **vidsrc** (un service fournissant films et séries à des sites de streaming illégal). Des vérifications faciles à contourner, un code pas si bien caché, et une obfuscation qu'on déchiffre en deux temps trois mouvements… Ça fait vraiment **low-cost** comparé à l'entreprise que c'est.

**Mais c'est aussi le reflet de la philosophie de DuckDuckGo :** plutôt que de vous pister comme un [GAFAM](https://fr.wikipedia.org/wiki/GAFAM), ils préfèrent garder les mains propres et se contenter d'un contrôle basique, quitte à laisser passer les bots un peu malins.

Cela illustre bien la **difficulté de concilier respect de la vie privée et sécurité efficace**. En limitant la collecte de données et en refusant toute forme de fingerprinting approfondi, DuckDuckGo **s'expose** à des attaques automatisées qui peuvent contourner assez **facilement** ces protections rudimentaires.

> Pour l'instant, leur choix se porte clairement sur la confidentialité, au détriment d'une protection robuste.

Bref, si quelqu'un peut me filer une clé d'API chez DuckDuckGo, je vous en supplie, à genoux, je suis prête à aboyer carrément 🙏