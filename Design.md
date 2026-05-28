<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Creative Cafe | Board Feed</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "surface": "#faf8ff",
                    "secondary": "#006c49",
                    "on-error": "#ffffff",
                    "tertiary-fixed": "#ffdadc",
                    "secondary-container": "#6cf8bb",
                    "on-error-container": "#93000a",
                    "secondary-fixed": "#6ffbbe",
                    "outline": "#6f7883",
                    "primary-container": "#13a8ff",
                    "surface-bright": "#faf8ff",
                    "on-tertiary-container": "#730525",
                    "on-tertiary-fixed-variant": "#891933",
                    "on-primary-fixed": "#001d32",
                    "outline-variant": "#bec7d3",
                    "primary": "#00639a",
                    "on-background": "#131b2e",
                    "on-secondary-fixed-variant": "#005236",
                    "secondary-fixed-dim": "#4edea3",
                    "tertiary-container": "#ff7488",
                    "tertiary": "#a93349",
                    "tertiary-fixed-dim": "#ffb2b9",
                    "on-surface": "#131b2e",
                    "surface-variant": "#dae2fd",
                    "surface-container": "#eaedff",
                    "on-primary-container": "#003a5d",
                    "surface-tint": "#00639a",
                    "surface-container-low": "#f2f3ff",
                    "on-secondary": "#ffffff",
                    "on-tertiary": "#ffffff",
                    "inverse-surface": "#283044",
                    "on-tertiary-fixed": "#400010",
                    "inverse-on-surface": "#eef0ff",
                    "primary-fixed": "#cde5ff",
                    "background": "#faf8ff",
                    "error": "#ba1a1a",
                    "inverse-primary": "#95ccff",
                    "surface-container-highest": "#dae2fd",
                    "surface-container-lowest": "#ffffff",
                    "error-container": "#ffdad6",
                    "on-secondary-container": "#00714d",
                    "surface-container-high": "#e2e7ff",
                    "on-surface-variant": "#3f4852",
                    "on-secondary-fixed": "#002113",
                    "surface-dim": "#d2d9f4",
                    "primary-fixed-dim": "#95ccff",
                    "on-primary": "#ffffff",
                    "on-primary-fixed-variant": "#004a75"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "gutter": "24px",
                    "stack-md": "12px",
                    "container-max": "1280px",
                    "margin-mobile": "16px",
                    "stack-sm": "4px",
                    "base": "8px",
                    "margin-desktop": "40px",
                    "stack-lg": "24px"
            },
            "fontFamily": {
                    "headline-md": ["Bricolage Grotesque"],
                    "body-md": ["Inter"],
                    "caption": ["Inter"],
                    "label-sm": ["Inter"],
                    "display-lg": ["Bricolage Grotesque"],
                    "body-lg": ["Inter"],
                    "display-lg-mobile": ["Bricolage Grotesque"]
            },
            "fontSize": {
                    "headline-md": ["24px", {"lineHeight": "1.3", "fontWeight": "700"}],
                    "body-md": ["16px", {"lineHeight": "1.5", "fontWeight": "400"}],
                    "caption": ["12px", {"lineHeight": "1.4", "fontWeight": "500"}],
                    "label-sm": ["14px", {"lineHeight": "1.4", "letterSpacing": "0.01em", "fontWeight": "600"}],
                    "display-lg": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "800"}],
                    "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
                    "display-lg-mobile": ["32px", {"lineHeight": "1.2", "fontWeight": "800"}]
            }
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .doodle-underline {
            background-image: url("data:image/svg+xml,%3Csvg width='100' height='10' viewBox='0 0 100 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 8C20 4 80 4 98 8' stroke='%2313a8ff' stroke-width='3' stroke-linecap='round'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: bottom;
            background-size: 100% 8px;
        }
        .marker-highlight:hover {
            background: linear-gradient(120deg, rgba(19, 168, 255, 0.15) 0%, rgba(19, 168, 255, 0.15) 100%);
            background-repeat: no-repeat;
            background-size: 100% 0.4em;
            background-position: 0 88%;
        }
        .sticky-note {
            transform: rotate(-1.5deg);
        }
        .sticky-note:nth-child(even) {
            transform: rotate(1.2deg);
        }
    </style>
</head>
<body class="bg-background text-on-background font-body-md selection:bg-primary-container selection:text-on-primary-container">
<!-- TopNavBar -->
<nav class="bg-surface docked full-width top-0 border-b border-outline-variant z-50 sticky">
<div class="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-20 max-w-container-max mx-auto">
<div class="flex items-center gap-8">
<span class="font-display-lg text-display-lg-mobile md:text-display-lg text-primary tracking-tight">Creative Cafe</span>
<div class="hidden lg:flex items-center gap-6">
<a class="text-primary font-bold border-b-2 border-primary pb-1 font-label-sm text-label-sm" href="#">Home</a>
<a class="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm" href="#">Boards</a>
<a class="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm" href="#">Members</a>
<a class="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm" href="#">Activity</a>
</div>
</div>
<div class="flex items-center gap-4">
<div class="hidden md:flex items-center bg-surface-container-low px-4 py-2 rounded-lg gap-2">
<span class="material-symbols-outlined text-outline">search</span>
<input class="bg-transparent border-none focus:ring-0 text-body-md w-48" placeholder="Search boards..." type="text"/>
</div>
<div class="flex items-center gap-2">
<button class="p-2 hover:bg-surface-container-low rounded-lg transition-all active:scale-95 duration-200">
<span class="material-symbols-outlined text-on-surface-variant">notifications</span>
</button>
<button class="p-2 hover:bg-surface-container-low rounded-lg transition-all active:scale-95 duration-200">
<span class="material-symbols-outlined text-on-surface-variant">mail</span>
</button>
<div class="w-10 h-10 rounded-full overflow-hidden ml-2 border-2 border-primary-container">
<img alt="User Profile Avatar" data-alt="A professional headshot of a creative individual with a warm smile, set against a soft, blurred studio background. The lighting is bright and clean, matching a modern light-mode interface. The person has a friendly, accessible look, wearing a minimalist neutral-toned shirt, perfectly suited for a collaborative professional community platform." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjMk1TK_cGpmqdzg43q_5PFfZpKW9lj7M9GUO1EgFroYtULXjtiu0UBpjzO_Uue0N9g0KrAWDA5AFTXJiDBNNV1k3FT5icaTR4szYJwFHoj39znDNWmeTyBOHGgbpOx4JHjP5gcB5b9bAYNAQ4slfjlBWJBau92lEtcm7urTepd5MB8Tnm869wHoqg9OJ5rZ-JrKNdbiJRg_liVYGX-lvNprKNuYJEm4HsXxRp2o-sJtiXC5vd1TycIqOGHk9sP4e67tGlkP03pzg"/>
</div>
</div>
</div>
</div>
</nav>
<main class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg flex flex-col md:flex-row gap-gutter">
<!-- SideNavBar -->
<aside class="hidden md:flex flex-col gap-stack-lg w-full max-w-[320px] p-stack-lg h-fit">
<div class="bg-surface-container-low rounded-xl p-6 shadow-sm">
<div class="flex items-center gap-4 mb-6">
<div class="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">palette</span>
</div>
<div>
<h2 class="font-headline-md text-headline-md font-bold text-on-surface">Designers Collective</h2>
<p class="text-label-sm font-label-sm text-on-surface-variant">12.4k Members Active</p>
</div>
</div>
<nav class="flex flex-col gap-1">
<a class="flex items-center gap-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all pl-4 py-2" href="#">
<span class="material-symbols-outlined">home</span>
<span class="font-label-sm text-label-sm">Cafe Home</span>
</a>
<a class="flex items-center gap-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all pl-4 py-2" href="#">
<span class="material-symbols-outlined">campaign</span>
<span class="font-label-sm text-label-sm">Announcements</span>
</a>
<a class="flex items-center gap-3 text-primary font-bold border-l-4 border-primary pl-3 py-2 bg-primary-container/10 translate-x-1 transition-transform" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">forum</span>
<span class="font-label-sm text-label-sm">Free Board</span>
</a>
<a class="flex items-center gap-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all pl-4 py-2" href="#">
<span class="material-symbols-outlined">collections_bookmark</span>
<span class="font-label-sm text-label-sm">Q&amp;A Gallery</span>
</a>
<a class="flex items-center gap-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all pl-4 py-2" href="#">
<span class="material-symbols-outlined">chat_bubble</span>
<span class="font-label-sm text-label-sm">Member Chat</span>
</a>
</nav>
<div class="mt-8 pt-6 border-t border-outline-variant flex flex-col gap-1">
<a class="flex items-center gap-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all pl-4 py-2" href="#">
<span class="material-symbols-outlined text-outline">settings</span>
<span class="font-label-sm text-label-sm">Settings</span>
</a>
<a class="flex items-center gap-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all pl-4 py-2" href="#">
<span class="material-symbols-outlined text-outline">help</span>
<span class="font-label-sm text-label-sm">Help</span>
</a>
</div>
</div>
<!-- Sticky Note Notice -->
<div class="bg-tertiary-fixed text-on-tertiary-fixed p-5 rounded-lg shadow-md sticky-note border border-tertiary/20">
<div class="flex items-center gap-2 mb-2">
<span class="material-symbols-outlined text-tertiary">push_pin</span>
<span class="font-bold">Hot Topics</span>
</div>
<p class="text-body-md font-medium">Join the "Sketchbook Challenge" starting this Friday! 🎨</p>
</div>
</aside>
<!-- Main Feed Canvas -->
<section class="flex-1">
<!-- Header & Filters -->
<div class="mb-stack-lg">
<div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-stack-lg">
<div>
<h1 class="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-2">Free Board</h1>
<p class="text-body-lg text-on-surface-variant max-w-xl">Share your thoughts, inspirations, and daily sketches with the community.</p>
</div>
</div>
<!-- Sorting & View Options -->
<div class="flex items-center justify-between border-b border-outline-variant pb-stack-md">
<div class="flex items-center gap-6">
<button class="text-primary font-bold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-primary after:rounded-t-full">Newest</button>
<button class="text-on-surface-variant hover:text-on-surface transition-colors pb-2">Popular</button>
<button class="text-on-surface-variant hover:text-on-surface transition-colors pb-2">Member Choice</button>
</div>
<div class="flex items-center gap-2">
<button class="p-2 hover:bg-surface-container-low rounded-lg text-primary">
<span class="material-symbols-outlined">grid_view</span>
</button>
<button class="p-2 hover:bg-surface-container-low rounded-lg text-on-surface-variant">
<span class="material-symbols-outlined">view_list</span>
</button>
</div>
</div>
</div>
<!-- Posts Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
<!-- Post Card 1 -->
<article class="group bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:shadow-[0_8px_30px_rgb(19,168,255,0.12)] transition-all duration-300 transform hover:-translate-y-1">
<div class="h-48 overflow-hidden relative">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="An expressive abstract painting with vibrant splashes of primary blue and deep reds. The brushwork is energetic and tactile, showing thick layers of acrylic paint on a white canvas. The lighting is bright and gallery-style, emphasizing the texture and modern artistic flair of the piece." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzWDvYH2LyxKstANhxxU1J4KutL_zjaxy4rK5sPiL_jYwrLp50n05s6CftVVbcW0A7dzX4hYU30RVdQlxaf9wVSNeDIh3U5a1NJ-TPoK_KoXplygIjeGqtBvLxmaxgPD3n3rtBIb7ZxLADGvp-wJZ6ufydUFv1CVnL4ZNlhf7mxRxd7Lai3wgnQe3_aqxGNzbJDG6aJUQNRqumZDGM3xK6DFGM5YnuSCnBUa95Hsyuu1dFgyoF-cyLezFxPEeSj1rgwfDS1WwNkzQ"/>
<div class="absolute top-4 left-4 bg-primary/90 text-white px-3 py-1 rounded-full text-caption font-bold">New Creation</div>
</div>
<div class="p-6">
<div class="flex items-center gap-3 mb-4">
<img alt="Author" class="w-8 h-8 rounded-full" data-alt="Close-up portrait of a young male designer with a creative look, wearing stylish glasses. Soft ambient lighting, vibrant but professional vibe." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzpHZ3R3bh3-KMCpnJk2cQHVoa_5cv9qKdqp_ujNT1e3UbFxRvztIFym_FdfMiCUjfBY0IFS6rudGn9OCtBYZJ08fZ9BfAyIDbxGyax8o5tHqSONsa2EFck6A6F1OLrElR9o0QIhlycS8RTeuoq9l9-6q835DSPxN480m9mXgPK3-s5MBa65lcXMBqd_hjMjYV7DoU3U5YXXHNZ3CbZi98Ea8i6Jssg_8P5aeYm8sQvdXF-awUp5XXG-o-V_Mrh0Xch0PEaFKuPLg"/>
<span class="font-label-sm text-label-sm text-on-surface">Alex River</span>
<span class="text-caption text-on-surface-variant ml-auto">2h ago</span>
</div>
<h3 class="font-headline-md text-headline-md mb-2 group-hover:text-primary transition-colors marker-highlight">Exploring Neon Typography</h3>
<p class="text-body-md text-on-surface-variant line-clamp-2 mb-4">Just finished this series of experimental posters focusing on how neon light refracts through glass textures...</p>
<div class="flex items-center gap-4 text-on-surface-variant">
<span class="flex items-center gap-1 font-label-sm"><span class="material-symbols-outlined text-[18px]">favorite</span> 124</span>
<span class="flex items-center gap-1 font-label-sm"><span class="material-symbols-outlined text-[18px]">chat_bubble</span> 18</span>
<span class="flex items-center gap-1 font-label-sm ml-auto"><span class="material-symbols-outlined text-[18px]">visibility</span> 1.2k</span>
</div>
</div>
</article>
<!-- Post Card 2 -->
<article class="group bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:shadow-[0_8px_30px_rgb(19,168,255,0.12)] transition-all duration-300 transform hover:-translate-y-1">
<div class="h-48 overflow-hidden relative">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A minimalist 3D render of soft, flowing fabric in shades of pale blue and silver. The composition is clean and airy, with elegant curves and gentle shadows that create a sense of calm and sophistication. The lighting is diffused and high-key, reinforcing the modern minimalist aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-eJKUIPe-W5L9MK94KKYexON5c-Xy706ziZUtHiyTNDhdSC3ildLO_d7-KQubS5ZPLSOo9ZKZvRQhzqUskQSZ7ZhzHBHGPIpaZO5Q05vAoz1eLR93McYjYEXfgQOJL5aFRVbNSDV-pCxmVtNVbdTrzFS2yIYSAe8agJkraN1rEEBPNpI2vqV9BjUJrnO2-3oVSRWyqcIRpUQCHy5lNWVByeA2m9Xm_FXIc1NaEySgD7MJ4gMYTSQIXlIv-q78BncUePEul5BvAt0"/>
<div class="absolute top-4 left-4 bg-secondary/90 text-white px-3 py-1 rounded-full text-caption font-bold">Featured</div>
</div>
<div class="p-6">
<div class="flex items-center gap-3 mb-4">
<img alt="Author" class="w-8 h-8 rounded-full" data-alt="Portrait of a female digital artist with a bright, enthusiastic expression. The background is a brightly lit creative studio. Clean, modern aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhXo_KQIWPm4nMMqGKLvaCXU1_WpM0ifLpT0rs_DcPFNUelYAmiOUrq-AI-R0wahjz-eeEndihIG0E1gGDCVdK5d7LFwW_jPqW5BsHw7AtRdmKxx8GdoM-Jjcqq-c8qkuq3aYz2HajhZOP4aaWlAV8V3XgVmQAChS2PPpvSMXeFJKyCBda-_OFrWjr_RT687PDnJbQW2WDJrw_19K0keyD0so7IXc-JkkP8WzzMRwghka6gSVKVCCDV8rd0XzsKyg7S9CmPMN5S04"/>
<span class="font-label-sm text-label-sm text-on-surface">Maya Chen</span>
<span class="text-caption text-on-surface-variant ml-auto">5h ago</span>
</div>
<h3 class="font-headline-md text-headline-md mb-2 group-hover:text-primary transition-colors marker-highlight">Minimalist UI Patterns for 2024</h3>
<p class="text-body-md text-on-surface-variant line-clamp-2 mb-4">Sharing my recent findings on high-contrast accessibility in minimalist mobile interfaces...</p>
<div class="flex items-center gap-4 text-on-surface-variant">
<span class="flex items-center gap-1 font-label-sm"><span class="material-symbols-outlined text-[18px]">favorite</span> 89</span>
<span class="flex items-center gap-1 font-label-sm"><span class="material-symbols-outlined text-[18px]">chat_bubble</span> 42</span>
<span class="flex items-center gap-1 font-label-sm ml-auto"><span class="material-symbols-outlined text-[18px]">visibility</span> 2.4k</span>
</div>
</div>
</article>
<!-- Post Card 3 (Text Only Variant) -->
<article class="group bg-surface-container-lowest border border-outline-variant rounded-xl p-6 hover:shadow-[0_8px_30px_rgb(19,168,255,0.12)] transition-all duration-300 transform hover:-translate-y-1">
<div class="flex items-center gap-3 mb-4">
<img alt="Author" class="w-8 h-8 rounded-full" data-alt="A portrait of a male illustrator with a thoughtful look. High-key lighting, bright studio background, modern and clean style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfAX1ih9Ii2hbjV10JDgO0NPfH67Bnst9xmTwYx6HFOLSOiJDjCN7mrAwR7kPbvCQ6odIzVP68aouymDhrv-pFqybXu4qHKLvZvixIcQ_vmJwPn6vztoa8ny2cnC4CKJRAF9a8NYa5qSzBZHsIIwudADz-knqPteQDUTEbd2OrViJ3OHLRUqeYpUIds6ysMlrNOCEIUm0_qBZ5WvhhS345_1Alsp9mN8huBTj9Xq38-GNL5gE6OMOJg8T7-_l3WqmHN5euTbXak68"/>
<span class="font-label-sm text-label-sm text-on-surface">Marcus Thorne</span>
<span class="text-caption text-on-surface-variant ml-auto">Yesterday</span>
</div>
<h3 class="font-headline-md text-headline-md mb-2 group-hover:text-primary transition-colors marker-highlight">Question about Wacom drivers on MacOS</h3>
<p class="text-body-md text-on-surface-variant mb-6">Is anyone else experiencing cursor lag after the latest update? I've tried reinstalling but it still feels sluggish in Photoshop...</p>
<div class="flex items-center gap-4 text-on-surface-variant">
<span class="flex items-center gap-1 font-label-sm"><span class="material-symbols-outlined text-[18px]">favorite</span> 12</span>
<span class="flex items-center gap-1 font-label-sm"><span class="material-symbols-outlined text-[18px]">chat_bubble</span> 56</span>
<span class="flex items-center gap-1 font-label-sm ml-auto"><span class="material-symbols-outlined text-[18px]">visibility</span> 850</span>
</div>
</article>
<!-- Post Card 4 -->
<article class="group bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:shadow-[0_8px_30px_rgb(19,168,255,0.12)] transition-all duration-300 transform hover:-translate-y-1">
<div class="h-48 overflow-hidden relative">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A vibrant, multi-layered collage of paper textures and hand-drawn doodles. The palette is dominated by soft yellows and electric blues. The design feels playful and energetic, like a digital scrapbook page. Bright, clean studio lighting highlights the paper textures." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdx50DWPtyfAM8I1y_aQuZ63616Qw3apq_khaYtqSVhB0yW3eaC9kU7TvhdCtFvZmy3QoGUsvOjdJKPzXgAGHeXl2QtsuU_pkMWjvuMZiatx7xRipX2PXImV2HyN8PENU2l8JsFKPSjtvc7mw_x5X3_8q1J-YIpGOBGaqhN_m6JXkJlCCHhr4z-SyuTCcSieC5QkdXyNTp6fl1N9B4JQWcDvZEygppXQur4pX4fy92EWXUyP8kJ-I3UCOtB3TRAtznxdOQhmpi7wU"/>
<div class="absolute top-4 left-4 bg-tertiary/90 text-white px-3 py-1 rounded-full text-caption font-bold">Inspiration</div>
</div>
<div class="p-6">
<div class="flex items-center gap-3 mb-4">
<div class="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-[12px]">SL</div>
<span class="font-label-sm text-label-sm text-on-surface">Sara Lopez</span>
<span class="text-caption text-on-surface-variant ml-auto">2d ago</span>
</div>
<h3 class="font-headline-md text-headline-md mb-2 group-hover:text-primary transition-colors marker-highlight">Finding Color in Concrete</h3>
<p class="text-body-md text-on-surface-variant line-clamp-2 mb-4">A photography series exploring urban textures and the hidden palettes in everyday city life...</p>
<div class="flex items-center gap-4 text-on-surface-variant">
<span class="flex items-center gap-1 font-label-sm"><span class="material-symbols-outlined text-[18px]">favorite</span> 240</span>
<span class="flex items-center gap-1 font-label-sm"><span class="material-symbols-outlined text-[18px]">chat_bubble</span> 31</span>
<span class="flex items-center gap-1 font-label-sm ml-auto"><span class="material-symbols-outlined text-[18px]">visibility</span> 3.1k</span>
</div>
</div>
</article>
</div>
<!-- Pagination -->
<div class="mt-stack-lg flex items-center justify-center gap-2 py-8">
<button class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors"><span class="material-symbols-outlined">chevron_left</span></button>
<button class="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold">1</button>
<button class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors">2</button>
<button class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors">3</button>
<span class="mx-2">...</span>
<button class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors">12</button>
<button class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors"><span class="material-symbols-outlined">chevron_right</span></button>
</div>
</section>
</main>
<!-- Footer -->
<footer class="w-full py-stack-lg px-margin-mobile md:px-margin-desktop border-t border-outline-variant mt-stack-lg bg-surface-container">
<div class="max-w-container-max mx-auto">
<div class="flex flex-col md:flex-row justify-between items-center gap-6">
<div>
<span class="font-headline-md text-headline-md text-on-surface mb-2 block">Creative Cafe</span>
<p class="text-on-surface-variant font-caption text-caption">© 2024 Creative Cafe. Built for collaborators.</p>
</div>
<div class="flex flex-wrap justify-center gap-6">
<a class="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md focus:ring-2 focus:ring-primary focus:ring-offset-2" href="#">Privacy Policy</a>
<a class="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md focus:ring-2 focus:ring-primary focus:ring-offset-2" href="#">Community Guidelines</a>
<a class="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md focus:ring-2 focus:ring-primary focus:ring-offset-2" href="#">Contact Support</a>
<a class="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md focus:ring-2 focus:ring-primary focus:ring-offset-2" href="#">Terms of Service</a>
</div>
</div>
</div>
</footer>
<!-- Floating Action Button -->
<div class="fixed bottom-8 right-8 z-[100]">
<button class="group relative bg-primary text-white flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-primary/40 hover:-translate-y-1 transition-all active:scale-95 overflow-visible">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">edit</span>
            Write a Post
            <!-- Doodle Stroke Overlay -->
<svg class="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewbox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
<path d="M5 40C5 15 45 5 100 5C155 5 195 15 195 40C195 65 155 75 100 75C45 75 5 65 5 40Z" stroke="#13a8ff" stroke-dasharray="8 4" stroke-linecap="round" stroke-width="2"></path>
</svg>
</button>
</div>
<script>
        // Simple micro-interaction for markers
        document.querySelectorAll('.marker-highlight').forEach(el => {
            el.addEventListener('mouseenter', () => {
                // Potential for JS based effects if needed
            });
        });
    </script>
</body></html>