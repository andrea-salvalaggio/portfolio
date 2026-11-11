<template>
    <section class="hero-section">
        <div class="container p-0">
            <LayoutSiteHeader />
            <div>
                <p class="hero-title mb-3">
                    <span class="visually-hidden">{{ PHRASES[1] }}</span>
                    <span v-for="(phrase, p) in phrases" :key="p" class="hero-phrase" :class="{ 'hero-phrase--draft': p === 0 }"
                        aria-hidden="true">
                        <span v-for="(item, i) in phrase" :key="i" class="hero-char" :style="item.style">{{ item.char }}</span>
                    </span>
                </p>
                <p class="hero-description mb-4 enter" style="--i: 1">
                    Based in Padua, Italy, with a design-first mindset. I focus on building intuitive,
                    responsive interfaces, combining aesthetics with clean and maintainable code.
                </p>
                <div class="hero-links enter" style="--i: 2">
                    <UiLinkButton :href="CV_URL" label="Download CV" />
                    <UiLinkButton v-for="link in socials" :key="link.id" :href="link.url" :label="link.label" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import connections from '~/data/connections.json'

const CV_URL = 'https://drive.google.com/file/d/1biO80QVibGtadjXwhWGQF7Z_Z8Qj4uLy/view?usp=sharing'

const socials = connections.filter((connection) => !connection.url.startsWith('mailto:'))

// A draft is typed, held and deleted, then the headline is typed
const PHRASES = ['Hi, I’m Andrea!', 'I design it. Then I build it.']

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

.hero-title {
    display: inline-grid;
    font-size: 28px;
    font-weight: $font-weight-semibold;
    line-height: 40px;
    color: $light;
}

.hero-phrase {
    grid-area: 1 / 1;
}

.hero-char {
    position: relative;
    white-space: pre-wrap;
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
    font-size: 16px;
    line-height: 24px;
}

.hero-links {
    display: flex;
    flex-wrap: wrap;
    gap: $spacer-2;

    @include down($bp-sm) {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));

        :deep(.btn-link) {
            justify-content: space-between;
            height: 46px;
        }
    }
}

@media (prefers-reduced-motion: reduce) {
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
