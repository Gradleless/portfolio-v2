---
title: "DuckDuckGo AI Chat – Why its \"protection\" is so… limited?"
description: "A technical analysis of DuckDuckGo's AI chat protection mechanisms. An in-depth look revealing the trade-offs between privacy and effective security."
date: "2025-08-07"
published: true
tags: ["security", "reverse-engineering", "DuckDuckGo", "JavaScript", "obfuscation", "technical analysis"]
image: "/blog-images/duckduckgo-security.webp"
---

# Analysing DuckDuckGo AI Chat Security: Between Philosophy and Protection

## Why I looked into DuckDuckGo AI Chat's security

When I first discovered the protections DuckDuckGo put in place around their AI chat, I quickly started wondering how solid they actually were. For the past year or two, understanding how these kinds of protection systems work — and where they break — has become something of a hobby of mine. So I decided to dig into their code and their verification system.

What I found genuinely surprised me — both by its simplicity and by how well it reflects their philosophy. Here's what I found.

## What DuckDuckGo is actually trying to protect

[DuckDuckGo](https://duckduckgo.com/)'s stated mission is simple: [_not knowing who you are_](https://duckduckgo.com/duckduckgo-help-pages/privacy/no-tracking).

No ad cookies, no [cross-site tracking](https://en.wikipedia.org/wiki/Cross-site_tracking), no [device fingerprinting](https://en.wikipedia.org/wiki/Device_fingerprint), no persistent network footprint — the complete antithesis of Big Tech.

It's almost a love letter to privacy… but it comes with a price.

By refusing to collect any personal data, DuckDuckGo also **rules out** the entire toolkit that normally lets you recognise a malicious user, even across multiple attempts.

**The result:** their "protection" scripts don't try to figure out _who_ you are — only whether **your browsing environment looks like a "normal" browser** at that precise moment.

Like an AI-content filter that just checks whether you ticked "AI-generated image" (hey, Pinterest…) — and if you didn't, lets everything through.

## What's hiding behind Duck AI Chat's "security"

### Obfuscation

The security DuckDuckGo uses for its AI chat relies on JavaScript obfuscation that, sure, might slow down beginners — but it doesn't hold up against straightforward tools like [webcrack](https://webcrack.netlify.app/docs/) or even [deobfuscate.io](https://deobfuscate.io/).

In short, it doesn't really protect against anyone who knows where to look. It's even more disappointing that they didn't even try a custom approach, like [Cloudflare](https://www.cloudflare.com/) does with its [JavaScript challenges](https://blog.noah.ovh/cloudflare-js-challenge-1/) — a way to avoid paying for robust alternatives like [JSDefender](https://www.preemptive.com/products/jsdefender/) while still creating a barrier strong enough to discourage most people.

### Lightweight checks, easy to bypass

Beyond obfuscation, DuckDuckGo implements several simple checks directly in the **user's browser** to detect certain **suspicious** or **automated behaviours**. These checks often consist of basic tests analysing the state of the [DOM](https://developer.mozilla.org/en-US/docs/Glossary/DOM) or the presence of specific objects associated with bots or automated environments — split across **3 separate scripts**.

Concretely, each verification function is returned **with every request to the chat or on page reload**, base64-encoded in the **x-vqd-hash-1** [header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers). Once decoded, it is immediately executed as a self-invoking function ([IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)). The result is then sent back — also base64-encoded — with each new message sent in the chat.

#### Quick summary + explanation of similarities

All scripts share the same structure: a **server_hashes** variable, some metadata, then the creation of a **client_hashes** array that gets returned at the end.

The first element of client_hashes is **always** the [userAgent](https://en.wikipedia.org/wiki/User_agent) — typically your browser name and version, along with some system info.

The next two elements are numbers:

- The **first** reflects whether the check was actually performed on DuckDuckGo's AI page.
- The **second** indicates whether the detected environment looks like a bot.

Since the checks are deterministic for a given browser, the logical results (true/false) never change.

However, each script applies different **offsets** (base values) to each number, which changes the final values returned. So the same environment will always produce the same result for a given script, but different numbers across variants.

<small><a href="#why-duckduckgo-cant-really-do-better">Pssst, click here to skip the nerdy bits</a></small>

#### First script

For example, the script might measure the length of the `innerHTML` attribute of an element, count the number of tags in the DOM and multiply them together — exploiting the fact that browsers correctly reconstruct malformed DOM.

![Script 1 example DuckDuckGo](/blog-images/exemple-1-duckai.png)

It also checks whether certain APIs like `navigator.webdriver` are enabled — a classic indicator that a [browser is being driven by a script](https://en.wikipedia.org/wiki/Headless_browser) (via [Puppeteer](https://pptr.dev/), [Selenium](https://www.selenium.dev/), etc.). These tests run instantly, but their effectiveness is very limited: a simple non-headless browser, or a correctly configured environment, bypasses them without difficulty.

![Webdriver check](/blog-images/webdriver-check.png)

The issue is that these scripts never change. You just run them once, observe the difference introduced by the offset, and reapply it every time.

#### Second script

The second script takes a different angle. It's less interested in HTML and more in the internal behaviour of the JavaScript engine.

It checks, for example, that `parseInt.toString()` contains `[native code]`, tests class inheritance from Array, or verifies that objects like NodeList or HTMLDivElement match their expected types.

It adds and removes an element from document.body to measure changes, then repeats the same checks on `navigator.webdriver` and the keys of `window.top`. Again, everything relies on a fixed set of results: once known, you can simply add up the values for each test you know is valid without the server noticing.

![Script 2 example DuckDuckGo](/blog-images/exemple-2-duckai.png)

#### Third script

The third script mainly targets the parent environment and a specific iframe (#jsa). It checks two things there: the **Content-Security-Policy** meta tag and the **sandbox** attribute, which it compares to fixed values. It also checks for two specific properties on window.top, which are always present on the page.

Each successful test adds +1 to a counter initialized at a base number, always producing the same result. The outcome: a mostly decorative check with no real security impact.

![Script 3 example DuckDuckGo](/blog-images/exemple-3-duckai.png)

#### Conclusion

This minimalist approach remains consistent with DuckDuckGo's philosophy, which refuses invasive fingerprinting methods or persistent data collection.

**The result:** these checks do no more than filter the obvious cases or discourage beginners. Against more sophisticated malicious use, they offer only surface-level security… at least at first glance.

## Why DuckDuckGo can't (really) do better

In practice, this philosophy translates into scripts that never try to "recognise" you over time — only to test the current state of your browser.

**No persistent data, no unique identifier:** if you reload the page, it's as if you're a brand new user.

**The result:** the checks boil down to very simple tests on the DOM, a few JavaScript properties, and the presence of **APIs specific to automated browsers** — signals that are **easy to spoof**.

The idea behind this system probably isn't to provide **ultra-sophisticated protection**, but rather to make the **cost prohibitive** for someone who wants to flood DuckDuckGo with **tens or hundreds of thousands of automated requests** (a bit like [Hashcash](https://en.wikipedia.org/wiki/Hashcash) back in the day for email spam, or for [Bitcoin](http://www.hashcash.org/bitcoin/)). Forcing full emulation of a "normal" browser is a significant barrier against these mass attacks.

Unfortunately, as we've seen, the results produced by these scripts are actually **very predictable**. The numbers returned by the tests are always the same, except for "offsets" that can easily be extracted with [regular expressions (regex)](https://en.wikipedia.org/wiki/Regular_expression).

```javascript
// Regex example
const INNER_REGEX = /innerHTML\s*=\s*"([^"]*)"/;
const REDUCE_REGEX = /\b\d{3,4}\b/g; // :)
```

This means that after a bit of analysis and deobfuscation with tools like deobfuscate.io, it becomes possible to completely skip full [browser emulation](https://developer.chrome.com/docs/devtools/device-mode/) — since you just need to reproduce these static values while fetching the others to pass the checks.

## What if they actually wanted to strengthen the protection?

If DuckDuckGo genuinely wanted to harden their AI chat's security, several more advanced technical approaches could be used — while still respecting their privacy commitment:

### WebAssembly (WASM)

Using a compiled WASM module for verifications would make the code far harder to read or decompile than obfuscated JavaScript.

Decompiling WASM produces essentially low-level code close to assembly, barely intelligible — almost like a "black box", similar to the [secure chip in a Trezor or Ledger hardware wallet](https://www.ledger.com/academy/security/the-secure-element-whistanding-security-attacks), where internal details remain opaque.

![WebAssembly security](/blog-images/wasm-security.png)

### Custom obfuscation (like Cloudflare)

Although DuckDuckGo already applies some rotation of variable and function names at each build, this simple rotation is insufficient — especially since they use a well-known obfuscator like obfuscator.io, which is **easily reversible**.

To genuinely **strengthen the protection**, the obfuscation would need to be more complex, less standardised and more dynamic, with keys and challenge formats that change frequently.

### Time-limited challenges

Generating JavaScript or WASM puzzles whose **validity expires quickly** (say, every 30 seconds). This forces **real-time execution**, making automation attempts and reverse engineering more complex — though it does require having a Redis instance alongside.

These measures would **raise the barrier** without betraying the **privacy promise**, but they would also require a **more significant technical investment**.

## Conclusion – The price of privacy

Honestly, these **protections** look like they were thrown together by some kid working on a site like **vidsrc** (a service supplying movies and TV shows to illegal streaming sites). Easy-to-bypass checks, not-so-hidden code, and obfuscation you can crack in two minutes… It really feels **cheap** for the company it is.

**But it's also a direct reflection of DuckDuckGo's philosophy:** rather than tracking you like Big Tech does, they'd rather keep their hands clean and settle for basic checks, even if that means letting the slightly clever bots through.

This illustrates the **difficulty of reconciling privacy and effective security**. By limiting data collection and refusing any form of deep fingerprinting, DuckDuckGo **leaves itself exposed** to automated attacks that can bypass these rudimentary protections fairly **easily**.

> For now, their choice clearly leans toward privacy, at the expense of robust protection.

Anyway, if anyone can hook me up with a DuckDuckGo API key, I am begging you, on my knees, I'm ready to bark for it 🙏
