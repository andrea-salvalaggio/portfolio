<template>
    <section class="hero-section">
        <div class="container p-0">
            <div class="row g-md-0">
                <div class="col-12 mb-4">
                    <div class="hero-avatar">
                        <NuxtImg format="webp" src="/img/profile.png" width="90" height="90" densities="x1 x2" class="img-fluid rounded-circle img-profile"
                            alt="Profile picture" fetchpriority="high" preload />
                        <span class="status-dot" title="Available for new projects">
                            <span class="visually-hidden">Available for new projects</span>
                        </span>
                    </div>
                </div>
                <div class="col-12 col-md-10">
                    <h1 class="hero-title fw-bold mb-2" :aria-label="PHRASES[1]">
                        <span v-for="(phrase, p) in phrases" :key="p" class="hero-phrase" :class="{ 'hero-phrase--draft': p === 0 }"
                            aria-hidden="true">
                            <span v-for="(item, i) in phrase" :key="i" class="hero-char" :style="item.style">{{ item.char }}</span>
                        </span>
                    </h1>
                    <p class="hero-description mb-4">
                        Web & Frontend Developer based in Padua, Italy
                        with a design-first mindset. I focus on building intuitive, responsive,
                        combining aesthetics with clean and maintainable code.
                    </p>
                    <div class="hero-links d-md-flex">
                        <div class="flex-wrap row gx-1 gx-sm-2">
                            <a href="https://drive.google.com/file/d/1IKwbs_N8WZrnHX9v3Jl8cWi9HPtqZgAC/view?usp=sharing"
                                class="btn-link me-md-3" target="_blank" rel="noopener noreferrer" aria-label="Download CV">
                                Download CV <img src="/img/icons/arrow-top-right.svg" width="8" height="8" class="btn-icon"
                                    alt="" aria-hidden="true">
                            </a>
                            <a href="https://linkedin.com/in/andrea-salvalaggio" class="btn-link" target="_blank" rel="noopener noreferrer"
                                aria-label="LinkedIn">
                                LinkedIn <img src="/img/icons/arrow-top-right.svg" width="8" height="8" class="btn-icon" alt="" aria-hidden="true">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
// A draft is typed, held and deleted, then the headline is typed
const PHRASES = ['Hello world!', 'I’m Andrea']

const START = 400
const TYPE = 85
const DELETE = 40
const HOLD = 800
const PAUSE = 250
const BLINK = 2400

// Characters and carets switch opacity at fixed times through CSS animations: no hydration, same output on server and client
const at = (name: string, ms: number) => `${name} 0s ${ms}ms forwards`
const toggles = (times: number[]) => times.map((ms, k) => at(k % 2 === 0 ? 'hero-show' : 'hero-hide', ms)).join(', ')

const typeTimes = (text: string, from: number) => {
    let time = from

    return Array.from(text).map((_, i) => {
        const start = time

        time += TYPE + (i * 7 % 4) * 18
        return start
    })
}

const draft = Array.from(PHRASES[0]!)
const headline = Array.from(PHRASES[1]!)

const draftIn = typeTimes(PHRASES[0]!, START)
const lastDraftIn = draftIn[draftIn.length - 1]!
const deleteFrom = lastDraftIn + TYPE + HOLD

// The last character goes first
const draftOut = draft.map((_, i) => deleteFrom + (draft.length - 1 - i) * DELETE)
const headlineIn = typeTimes(PHRASES[1]!, draftOut[0]! + DELETE + PAUSE)

const draftChars = draft.map((char, i) => {
    const last = i === draft.length - 1
    const caret = last
        ? [draftIn[i]!, draftOut[i]!]
        : [draftIn[i]!, draftIn[i + 1]!, draftOut[i + 1]!, draftOut[i]!]

    return {
        char,
        style: {
            '--char-anim': toggles([draftIn[i]!, draftOut[i]!]),
            '--caret-anim': toggles(caret),
            // Before the first character the caret waits, then comes back once the draft is gone
            ...(i === 0 && { '--lead-anim': toggles([0, draftIn[0]!]) })
        }
    }
})

const headlineChars = headline.map((char, i) => {
    const last = i === headline.length - 1

    return {
        char,
        style: {
            '--char-anim': at('hero-show', headlineIn[i]!),
            '--caret-anim': last
                ? `hero-caret-end ${BLINK}ms linear ${headlineIn[i]!}ms forwards`
                : toggles([headlineIn[i]!, headlineIn[i + 1]!]),
            ...(i === 0 && { '--lead-anim': toggles([draftOut[0]!, headlineIn[0]!]) })
        }
    }
})

const phrases = [draftChars, headlineChars]
</script>

<style scoped lang="scss">
@use "@/assets/scss/mixins/buttons" as *;

@include link-hover-fade(".hero-links");

/* Typing: the draft and the headline share one grid cell, so the layout does not move while they swap.
   Every character carries its own caret, shown only while it is the last visible one. */
.hero-title {
    display: inline-grid;
    font-size: $font-size-biggest;
    white-space: nowrap;

    @include up($bp-md) {
        font-size: 3.75rem;
    }

    /* The title is about 7.4em wide: scale it down on narrow screens so it always fits */
    @include down($bp-sm) {
        font-size: min(2.75rem, calc((100vw - 2.5rem) / 7.6));
    }
}

.hero-phrase {
    grid-area: 1 / 1;
}

.hero-char {
    position: relative;
    white-space: pre;
    opacity: 0;
    animation: var(--char-anim, none);

    &::before,
    &::after {
        content: "";
        position: absolute;
        top: 50%;
        width: 2px;
        height: 1em;
        background-color: $gray-300;
        translate: 0 -50%;
        opacity: 0;
    }

    &::before {
        right: 100%;
        animation: var(--lead-anim, none);
    }

    &::after {
        left: 100%;
        animation: var(--caret-anim, none);
    }
}

.hero-description {
    font-size: $font-size-smaller;
}

.hero-links {
    .btn-link {
        width: fit-content;
        display: flex;
        align-items: center;
        color: $light;
        padding: .65rem 1.75rem;
        border-radius: $radius-pill;
        text-decoration: none;
        white-space: nowrap;

        .btn-icon {
            margin-left: $spacer;
            transform: scale(1.35);
        }
        
        @include down($bp-md) {
            width: 100%;
            justify-content: space-between;
            padding: $spacer $spacer-4;
            margin-bottom: $spacer;
        }
    }
}

.hero-avatar {
    position: relative;
    display: inline-block;
    line-height: 0;
}

.status-dot {
    position: absolute;
    right: 5px;
    bottom: 5px;
    width: 18px;
    height: 18px;
    border: 3px solid $dark;
    border-radius: 50%;
    background-color: $green;

    &::after {
        content: "";
        position: absolute;
        inset: -3px;
        border-radius: 50%;
        background-color: $green;
        animation: status-pulse 2s ease-out infinite;
    }
}

@keyframes status-pulse {
    from {
        opacity: 0.6;
        transform: scale(1);
    }

    to {
        opacity: 0;
        transform: scale(2.2);
    }
}

@media (prefers-reduced-motion: reduce) {
    .status-dot::after {
        animation: none;
    }

    .hero-phrase--draft {
        display: none;
    }

    .hero-char {
        opacity: 1;
        animation: none;

        &::before,
        &::after {
            display: none;
        }
    }
}

.img-profile {
    border: 1px solid $gray-800;
}

@include down($bp-md) {
    .img-profile {
        width: 90px;
        height: 90px;
    }
}
</style>

<!-- Not scoped: inline custom properties reference these names, and scoped CSS would not rewrite them -->
<style lang="scss">
@keyframes hero-show {
    to {
        opacity: 1;
    }
}

@keyframes hero-hide {
    to {
        opacity: 0;
    }
}

@keyframes hero-caret-end {
    0%,
    24% {
        opacity: 1;
    }

    25%,
    49% {
        opacity: 0;
    }

    50%,
    74% {
        opacity: 1;
    }

    75%,
    100% {
        opacity: 0;
    }
}
</style>
